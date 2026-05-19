/**
 * Form Submission Utility with Retry Logic
 * Implements exponential backoff for transient network errors
 * Provides enterprise-grade error handling
 */

export interface FormSubmissionConfig {
  maxRetries?: number; // Default: 3
  initialDelayMs?: number; // Default: 1000ms
  backoffMultiplier?: number; // Default: 2
}

export interface FormSubmissionResponse {
  success: boolean;
  data?: any;
  error?: string;
  retriesUsed: number;
  totalAttempts: number;
}

/**
 * Calculates exponential backoff delay
 * @param retryCount - Current retry attempt number
 * @param initialDelayMs - Initial delay in milliseconds
 * @param backoffMultiplier - Multiplier for exponential growth
 * @returns Delay in milliseconds
 */
export function calculateBackoffDelay(
  retryCount: number,
  initialDelayMs: number = 1000,
  backoffMultiplier: number = 2,
): number {
  // Formula: initialDelay * (multiplier ^ retryCount) + random jitter
  const exponentialDelay =
    initialDelayMs * Math.pow(backoffMultiplier, retryCount);
  // Add random jitter (±10%) to prevent thundering herd
  const jitter = exponentialDelay * 0.1 * (Math.random() - 0.5);
  return Math.min(exponentialDelay + jitter, 10000); // Cap at 10 seconds
}

/**
 * Check if error is transient (retryable)
 * @param statusCode - HTTP status code
 * @param error - Error message or error object
 * @returns True if error is transient
 */
export function isTransientError(statusCode?: number, error?: any): boolean {
  // Network timeout or connection errors
  if (
    error?.message?.includes("timeout") ||
    error?.message?.includes("connection") ||
    error?.message?.includes("ECONNREFUSED") ||
    error?.message?.includes("ENOTFOUND")
  ) {
    return true;
  }

  // HTTP 5xx server errors (transient)
  if (statusCode && statusCode >= 500 && statusCode < 600) {
    return true;
  }

  // HTTP 429 (Too Many Requests)
  if (statusCode === 429) {
    return true;
  }

  // HTTP 408 (Request Timeout)
  if (statusCode === 408) {
    return true;
  }

  return false;
}

/**
 * Submit form with retry logic and exponential backoff
 * @param submitFn - Async function that performs the actual submission
 * @param config - Configuration for retry behavior
 * @returns Promise with submission result
 */
export async function submitFormWithRetry(
  submitFn: () => Promise<any>,
  config: FormSubmissionConfig = {},
): Promise<FormSubmissionResponse> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    backoffMultiplier = 2,
  } = config;

  let lastError: any;
  let totalAttempts = 0;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    totalAttempts++;

    try {
      console.log(
        `📤 Form submission attempt ${totalAttempts} of ${maxRetries + 1}`,
      );

      const result = await submitFn();

      // Check if submission was successful
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

      // If response indicates permanent error, don't retry
      if (
        result.statusCode === 400 ||
        result.statusCode === 401 ||
        result.statusCode === 403
      ) {
        throw new Error(result.message || "Client error");
      }

      lastError = result;

      // If this is the last attempt, return error
      if (attempt === maxRetries) {
        break;
      }

      // Check if error is transient (retryable)
      if (!isTransientError(result.statusCode, lastError)) {
        // Permanent error, don't retry
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      lastError = error;

      // If this is the last attempt, return error
      if (attempt === maxRetries) {
        break;
      }

      // Check if error is transient (retryable)
      if (!isTransientError(undefined, error)) {
        // Permanent error, don't retry
        throw error;
      }

      // Calculate backoff delay
      const delayMs = calculateBackoffDelay(
        attempt,
        initialDelayMs,
        backoffMultiplier,
      );

      console.warn(
        `⚠️ Attempt ${totalAttempts} failed, retrying in ${delayMs}ms...`,
        error,
      );

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  // All retries exhausted
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

/**
 * Format form submission error message for user display
 * @param error - Error message or object
 * @param totalAttempts - Number of attempts made
 * @returns User-friendly error message
 */
export function formatSubmissionError(
  error: string | any,
  totalAttempts: number = 1,
): string {
  const errorMsg =
    typeof error === "string"
      ? error
      : error?.message || "An error occurred while submitting the form";

  if (totalAttempts > 1) {
    return `${errorMsg} (Failed after ${totalAttempts} attempts. Please check your connection and try again.)`;
  }

  return errorMsg;
}

/**
 * Web3Forms specific error parser
 * @param response - Response from Web3Forms API
 * @returns Formatted error message
 */
export function parseWeb3FormsError(response: any): string {
  if (response.message) {
    return response.message;
  }

  if (response.error) {
    return response.error;
  }

  if (!response.success) {
    return "Failed to submit form. Please try again.";
  }

  return "An unknown error occurred.";
}
