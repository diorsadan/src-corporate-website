import { useCallback, useRef, useState } from "react";
import {
  submitFormWithRetry,
  SubmissionRetryController,
  type FormSubmissionConfig,
  type FormSubmissionResponse,
  type SubmitProgress,
} from "@/utils/formSubmit";

/**
 * Encapsulates retry-controller lifecycle and progress state for forms.
 */
export function useSubmissionRetry(
  defaultConfig?: Partial<FormSubmissionConfig>,
) {
  const controllerRef = useRef<SubmissionRetryController | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState<SubmitProgress | null>(null);

  const cancel = useCallback(() => {
    controllerRef.current?.cancel();
  }, []);

  const retryNow = useCallback(() => {
    controllerRef.current?.retryNow();
  }, []);

  const submit = useCallback(
    async (
      submitFn: () => Promise<unknown>,
      config?: FormSubmissionConfig,
    ): Promise<FormSubmissionResponse> => {
      const controller = new SubmissionRetryController();
      controllerRef.current = controller;
      setIsSubmitting(true);
      setProgress(null);

      try {
        return await submitFormWithRetry(submitFn, {
          maxRetries: 3,
          initialDelayMs: 1000,
          backoffMultiplier: 2,
          ...defaultConfig,
          ...config,
          controller,
          onProgress: setProgress,
        });
      } finally {
        if (controllerRef.current === controller) {
          setIsSubmitting(false);
          setProgress(null);
          controllerRef.current = null;
        }
      }
    },
    [defaultConfig],
  );

  return {
    submit,
    cancel,
    retryNow,
    isSubmitting,
    progress,
  };
}
