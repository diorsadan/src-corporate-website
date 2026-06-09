import { useCallback, useState } from "react";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import { useSubmissionRetry } from "@/hooks/useSubmissionRetry";
import { formatSubmissionError } from "@/utils/formSubmit";
import type { ConsultationFormData } from "@/utils/formValidation";

const WEB3FORMS_ACCESS_KEY = "3b03da7a-b129-438a-a1a4-1326b4aa6cd2";

interface ConsultationSubmitResult {
  success: boolean;
  cancelled?: boolean;
}

/**
 * Networking layer for consultation form — Web3Forms payload, retry, offline guard.
 */
export function useConsultationFormSubmit(source: string) {
  const { getOfflineSubmissionError } = useNetworkStatusContext();
  const { submit, cancel, retryNow, isSubmitting, progress } =
    useSubmissionRetry();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const clearError = useCallback(() => {
    setShowError(false);
    setShowRetryButton(false);
    setErrorMessage("");
  }, []);

  const submitConsultation = useCallback(
    async (formData: ConsultationFormData): Promise<ConsultationSubmitResult> => {
      const offlineError = getOfflineSubmissionError();
      if (offlineError) {
        setErrorMessage(offlineError);
        setShowError(true);
        return { success: false };
      }

      clearError();

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New SRC Consultation Request",
        from_name: "SRC Consultation Form",
        name: formData.name,
        email: formData.email,
        cc: "diorsadan@addu.edu.ph",
        message: formData.message,
        source,
        redirect: false,
      };

      try {
        const result = await submit(() =>
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }).then((res) => res.json()),
        );

        if (result.cancelled) {
          return { success: false, cancelled: true };
        }

        setTotalAttempts(result.totalAttempts);

        if (result.success) {
          setShowSuccess(true);
          return { success: true };
        }

        setErrorMessage(
          formatSubmissionError(
            result.error || "Failed to submit consultation request",
            result.totalAttempts,
          ),
        );
        setShowError(true);
        setShowRetryButton(true);
        return { success: false };
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        setErrorMessage(errorMsg || "Please try again later.");
        setShowError(true);
        setShowRetryButton(true);
        return { success: false };
      }
    },
    [clearError, getOfflineSubmissionError, source, submit],
  );

  const dismissSuccess = useCallback(() => {
    setShowSuccess(false);
  }, []);

  const resetSubmissionState = useCallback(() => {
    setShowSuccess(false);
    setShowError(false);
    setShowRetryButton(false);
    setErrorMessage("");
    setTotalAttempts(0);
  }, []);

  return {
    submitConsultation,
    cancel,
    retryNow,
    isSubmitting,
    progress,
    showSuccess,
    showError,
    errorMessage,
    showRetryButton,
    totalAttempts,
    clearError,
    dismissSuccess,
    resetSubmissionState,
    setShowError,
    setErrorMessage,
  };
}
