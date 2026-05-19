import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Loader,
  Check,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  validateEmail,
  validateFormData,
  type ValidationError,
} from "@/utils/formValidation";
import {
  submitFormWithRetry,
  formatSubmissionError,
} from "@/utils/formSubmit";
import { FADE_IN_UP } from "@/constants/animations";

interface ConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string; // Track which page the form was triggered from
}

/**
 * ConsultationForm Component
 * Fully functional contact form with Web3Forms integration
 * Supports modal or inline usage with state management
 */
export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  isOpen,
  onClose,
  source = "consultation-cta",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const debouncedEmail = useDebounce(formData.email, 500);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for this field on change
    setValidationErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleRetry = async () => {
    setShowError(false);
    setShowRetryButton(false);
    await handleSubmit(new Event("submit") as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const batchErrors = validateFormData(formData);
    if (batchErrors.length > 0) {
      setValidationErrors(batchErrors);
      const errorMsg = batchErrors.map((e) => e.message).join(", ");
      setErrorMessage(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    setShowRetryButton(false);

    try {
      // Web3Forms Payload
      const payload = {
        access_key: "3b03da7a-b129-438a-a1a4-1326b4aa6cd2",
        subject: "New SRC Consultation Request",
        from_name: "SRC Consultation Form",
        name: formData.name,
        email: formData.email,
        cc: "diorsadan@addu.edu.ph",
        message: formData.message,
        source: source,
        redirect: false,
      };

      console.log("📤 Submitting consultation request with retry logic...");

      // Submit with retry logic (3 attempts with exponential backoff)
      const result = await submitFormWithRetry(
        () =>
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          }).then((res) => res.json()),
        {
          maxRetries: 3,
          initialDelayMs: 1000,
          backoffMultiplier: 2,
        },
      );

      setTotalAttempts(result.totalAttempts);

      if (result.success) {
        console.log("✨ Consultation request submitted successfully!");
        setShowSuccess(true);

        // Reset form
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            message: "",
          });
          setValidationErrors([]);
        }, 500);

        // Hide success and close modal after 8 seconds
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 8000);
      } else {
        const errorMsg = formatSubmissionError(
          result.error || "Failed to submit consultation request",
          result.totalAttempts,
        );
        console.error("❌ Submission failed:", errorMsg);
        setErrorMessage(errorMsg);
        setShowError(true);
        setShowRetryButton(true);
      }
    } catch (error) {
      console.error("🚨 Unexpected error:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      setErrorMessage(errorMsg || "Please try again later.");
      setShowError(true);
      setShowRetryButton(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal overlay
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-black text-gray-900">
                Schedule a Consultation
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            {/* Content */}
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
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                          validationErrors.some((e) => e.field === "name")
                            ? "border-red-500/50 focus:ring-red-500"
                            : "border-gray-200 focus:ring-primary"
                        }`}
                      />
                      {validationErrors.some((e) => e.field === "name") && (
                        <p className="text-sm text-red-600 mt-1">
                          {
                            validationErrors.find((e) => e.field === "name")
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${
                          validationErrors.some((e) => e.field === "email")
                            ? "border-red-500/50 focus:ring-red-500"
                            : "border-gray-200 focus:ring-primary"
                        }`}
                      />
                      {validationErrors.some((e) => e.field === "email") && (
                        <p className="text-sm text-red-600 mt-1">
                          {
                            validationErrors.find((e) => e.field === "email")
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your consultation needs..."
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none ${
                          validationErrors.some((e) => e.field === "message")
                            ? "border-red-500/50 focus:ring-red-500"
                            : "border-gray-200 focus:ring-primary"
                        }`}
                      />
                      {validationErrors.some((e) => e.field === "message") && (
                        <p className="text-sm text-red-600 mt-1">
                          {
                            validationErrors.find((e) => e.field === "message")
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    {/* Error Message */}
                    {showError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-red-900 mb-1">
                            Submission Failed
                          </p>
                          <p className="text-sm text-red-700">{errorMessage}</p>
                          {showRetryButton && (
                            <button
                              type="button"
                              onClick={handleRetry}
                              className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-2"
                            >
                              <RotateCcw className="w-4 h-4" />
                              Try Again
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Loader className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Request
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">
                      Request Sent!
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Thank you for your interest in scheduling a consultation.
                    </p>
                    <p className="text-sm text-gray-500">
                      Our team will get back to you shortly at {formData.email}
                    </p>
                  </motion.div>
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
