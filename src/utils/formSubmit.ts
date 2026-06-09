/**
 * Form Submission Utility with Retry Logic
 * Implements exponential backoff for transient network errors
 * Provides enterprise-grade error handling with transparent retry UX
 */

export interface FormSubmissionConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
  controller?: SubmissionRetryController;
  onProgress?: (progress: SubmitProgress) => void;
}

export type SubmitPhase = "submitting" | "backoff";

export interface SubmitProgress {
  attempt: number;
  maxAttempts: number;
  phase: SubmitPhase;
  backoffMs?: number;
}

export interface FormSubmissionResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  retriesUsed: number;
  totalAttempts: number;
  cancelled?: boolean;
}

/**
 * Controls in-flight retry behaviour — cancel entirely or skip backoff wait.
 */
export class SubmissionRetryController {
  private abortController = new AbortController();
  private retryNowCallbacks: Array<() => void> = [];

  readonly signal: AbortSignal;

  constructor() {
    this.signal = this.abortController.signal;
  }

  cancel(): void {
    this.abortController.abort();
  }

  retryNow(): void {
    const callbacks = [...this.retryNowCallbacks];
    this.retryNowCallbacks = [];
    callbacks.forEach((callback) => callback());
  }

  wait(ms: number): Promise<"done" | "cancelled" | "retry_now"> {
    if (this.signal.aborted) {
      return Promise.resolve("cancelled");
    }

    return new Promise((resolve) => {
      const timeoutId = window.setTimeout(() => {
        cleanup();
        resolve("done");
      }, ms);

      const onAbort = () => {
        cleanup();
        resolve("cancelled");
      };

      const onRetryNow = () => {
        cleanup();
        resolve("retry_now");
      };

      const cleanup = () => {
        window.clearTimeout(timeoutId);
        this.signal.removeEventListener("abort", onAbort);
        const index = this.retryNowCallbacks.indexOf(onRetryNow);
        if (index >= 0) {
          this.retryNowCallbacks.splice(index, 1);
        }
      };

      this.retryNowCallbacks.push(onRetryNow);
      this.signal.addEventListener("abort", onAbort, { once: true });
    });
  }
}

export function calculateBackoffDelay(
  retryCount: number,
  initialDelayMs: number = 1000,
  backoffMultiplier: number = 2,
): number {
  const exponentialDelay =
    initialDelayMs * Math.pow(backoffMultiplier, retryCount);
  const jitter = exponentialDelay * 0.1 * (Math.random() - 0.5);
  return Math.min(exponentialDelay + jitter, 10000);
}

export function isTransientError(statusCode?: number, error?: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null && "message" in error
        ? String((error as { message: unknown }).message)
        : "";

  if (
    message.includes("timeout") ||
    message.includes("connection") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("Failed to fetch") ||
    message.includes("NetworkError")
  ) {
    return true;
  }

  if (statusCode && statusCode >= 500 && statusCode < 600) {
    return true;
  }

  if (statusCode === 429 || statusCode === 408) {
    return true;
  }

  return false;
}

function reportProgress(
  config: FormSubmissionConfig,
  progress: SubmitProgress,
): void {
  config.onProgress?.(progress);
}

export async function submitFormWithRetry(
  submitFn: () => Promise<unknown>,
  config: FormSubmissionConfig = {},
): Promise<FormSubmissionResponse> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    backoffMultiplier = 2,
    controller,
  } = config;

  const maxAttempts = maxRetries + 1;
  let lastError: unknown;
  let totalAttempts = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    if (controller?.signal.aborted) {
      return {
        success: false,
        error: "Submission cancelled",
        retriesUsed: attempt,
        totalAttempts,
        cancelled: true,
      };
    }

    totalAttempts++;
    reportProgress(config, {
      attempt: totalAttempts,
      maxAttempts,
      phase: "submitting",
    });

    try {
      console.log(
        `📤 Form submission attempt ${totalAttempts} of ${maxAttempts}`,
      );

      const result = (await submitFn()) as Record<string, unknown>;

      if (result.success === true || result.ok === true) {
        console.log(
          `✅ Form submitted successfully on attempt ${totalAttempts}`,
        );
        return {
          success: true,
          data: result,
          retriesUsed: attempt,
          totalAttempts,
        };
      }

      if (
        result.statusCode === 400 ||
        result.statusCode === 401 ||
        result.statusCode === 403
      ) {
        throw new Error(String(result.message || "Client error"));
      }

      lastError = result;

      if (attempt === maxRetries) {
        break;
      }

      if (!isTransientError(Number(result.statusCode), lastError)) {
        throw new Error(String(result.message || "Form submission failed"));
      }
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      if (!isTransientError(undefined, error)) {
        throw error;
      }

      const delayMs = calculateBackoffDelay(
        attempt,
        initialDelayMs,
        backoffMultiplier,
      );

      console.warn(
        `⚠️ Attempt ${totalAttempts} failed, retrying in ${delayMs}ms...`,
        error,
      );

      reportProgress(config, {
        attempt: totalAttempts + 1,
        maxAttempts,
        phase: "backoff",
        backoffMs: delayMs,
      });

      if (controller) {
        const waitResult = await controller.wait(delayMs);
        if (waitResult === "cancelled") {
          return {
            success: false,
            error: "Submission cancelled",
            retriesUsed: attempt,
            totalAttempts,
            cancelled: true,
          };
        }
        if (waitResult === "retry_now") {
          reportProgress(config, {
            attempt: totalAttempts + 1,
            maxAttempts,
            phase: "submitting",
          });
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  const errorMsg =
    lastError instanceof Error
      ? lastError.message
      : typeof lastError === "string"
        ? lastError
        : "Form submission failed after multiple attempts";

  console.error(
    `❌ Form submission failed after ${totalAttempts} attempts:`,
    errorMsg,
  );

  return {
    success: false,
    error: errorMsg,
    retriesUsed: maxRetries,
    totalAttempts,
  };
}

export function formatSubmissionError(
  error: string | unknown,
  totalAttempts: number = 1,
): string {
  const errorMsg =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : "An error occurred while submitting the form";

  if (totalAttempts > 1) {
    return `${errorMsg} (Failed after ${totalAttempts} attempts. Please check your connection and try again.)`;
  }

  return errorMsg;
}

export function parseWeb3FormsError(response: Record<string, unknown>): string {
  if (response.message) {
    return String(response.message);
  }

  if (response.error) {
    return String(response.error);
  }

  if (!response.success) {
    return "Failed to submit form. Please try again.";
  }

  return "An unknown error occurred.";
}
