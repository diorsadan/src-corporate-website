import React, { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { MOTION_PATTERNS } from "@/constants/animations";
import { FormField } from "@/components/forms/FormField";
import { ConsultationFormErrorBanner } from "@/components/forms/ConsultationFormErrorBanner";
import { ConsultationFormSuccessView } from "@/components/forms/ConsultationFormSuccessView";
import { SubmissionProgressPanel } from "@/components/common/SubmissionProgressPanel";
import { useConsultationFormValidation } from "@/hooks/forms/useConsultationFormValidation";
import { useConsultationFormSubmit } from "@/hooks/forms/useConsultationFormSubmit";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

/**
 * Consultation modal — visual orchestrator only.
 * Validation → useConsultationFormValidation
 * Networking  → useConsultationFormSubmit
 * Fields      → FormField
 */
export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  isOpen,
  onClose,
  source = "consultation-cta",
}) => {
  const { formData, getFieldError, handleChange, validate, reset } =
    useConsultationFormValidation();

  const {
    submitConsultation,
    cancel,
    retryNow,
    isSubmitting,
    progress,
    showSuccess,
    showError,
    errorMessage,
    showRetryButton,
    clearError,
    dismissSuccess,
    resetSubmissionState,
    setShowError,
    setErrorMessage,
  } = useConsultationFormSubmit(source);

  const [submittedEmail, setSubmittedEmail] = useState("");

  useEffect(() => {
    if (!isOpen) {
      reset();
      resetSubmissionState();
      setSubmittedEmail("");
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, reset, resetSubmissionState]);

  const processSubmit = useCallback(async () => {
    const errors = validate();
    if (errors.length > 0) {
      setErrorMessage(errors.map((err) => err.message).join(", "));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    const result = await submitConsultation(formData);

    if (result.cancelled) return;

    if (result.success) {
      setSubmittedEmail(formData.email);
      setTimeout(() => {
        dismissSuccess();
        onClose();
      }, 8000);
    }
  }, [
    validate,
    submitConsultation,
    formData,
    setErrorMessage,
    setShowError,
    dismissSuccess,
    onClose,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await processSubmit();
  };

  const handleRetry = async () => {
    clearError();
    await processSubmit();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-dialog-title"
            initial={{
              opacity: 0,
              scale: MOTION_PATTERNS.modal.scale,
              y: MOTION_PATTERNS.modal.offsetY,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: MOTION_PATTERNS.modal.scale,
              y: MOTION_PATTERNS.modal.offsetY,
            }}
            transition={{ duration: MOTION_PATTERNS.modal.duration }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2
                id="consultation-dialog-title"
                className="text-2xl font-black text-gray-900"
              >
                Schedule a Consultation
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <FormField
                      id="consultation-name"
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={getFieldError("name")}
                      required
                      placeholder="Your name"
                    />

                    <FormField
                      id="consultation-email"
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={getFieldError("email")}
                      required
                      placeholder="you@company.com"
                      autoComplete="email"
                    />

                    <FormField
                      id="consultation-message"
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={getFieldError("message")}
                      required
                      placeholder="Tell us about your consultation needs..."
                      multiline
                      rows={4}
                    />

                    {showError && (
                      <ConsultationFormErrorBanner
                        message={errorMessage}
                        showRetryButton={showRetryButton}
                        onRetry={handleRetry}
                      />
                    )}

                    {isSubmitting && (
                      <SubmissionProgressPanel
                        progress={progress}
                        onCancel={cancel}
                        onRetryNow={retryNow}
                        submittingLabel="Sending consultation request"
                      />
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                    >
                      <Send className="w-5 h-5" />
                      Send Request
                    </button>
                  </motion.form>
                ) : (
                  <ConsultationFormSuccessView email={submittedEmail} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationForm;
