"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  AlertCircle,
  Loader,
  RotateCcw,
} from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import {
  contactLocationsSection,
  contactOffices,
  contactSidebarCards,
  contactFormSection,
  inquiryTypeOptions,
  type ContactSidebarCard,
} from "@/data/locations";
import { useDebounce } from "@/hooks/useDebounce";
import {
  validateEmail,
  validatePhone,
  validateFormData,
  hasFieldError,
  getFieldError,
  type ValidationError,
} from "@/utils/formValidation";
import {
  submitFormWithRetry,
  formatSubmissionError,
  parseWeb3FormsError,
} from "@/utils/formSubmit";

function SidebarCard({ card }: { card: ContactSidebarCard }) {
  const isGradient = card.variant === "gradient";

  return (
    <div
      className={
        isGradient
          ? "bg-gradient-to-br from-[#059669] to-[#047857] text-white rounded-xl p-8 shadow-lg"
          : "bg-white border-2 border-[#059669] rounded-xl p-8 shadow-lg"
      }
    >
      <h3
        className={`text-2xl mb-6 ${isGradient ? "" : "text-gray-900"}`}
        style={{ fontWeight: 700 }}
      >
        {card.title}
      </h3>
      <div className={`space-y-4 ${isGradient ? "" : "text-gray-700"}`}>
        {card.blocks.map((block) => (
          <div key={block.headline} className="flex items-start gap-3">
            {block.type === "phone" && (
              <Phone
                className={`w-5 h-5 mt-1 flex-shrink-0 ${isGradient ? "" : "text-[#059669]"}`}
              />
            )}
            {block.type === "email" && (
              <Mail
                className={`w-5 h-5 mt-1 flex-shrink-0 ${isGradient ? "" : "text-[#059669]"}`}
              />
            )}
            {block.type === "hours" && (
              <Clock
                className={`w-5 h-5 mt-1 flex-shrink-0 ${isGradient ? "" : "text-[#059669]"}`}
              />
            )}
            <div>
              <p style={{ fontWeight: 600 }}>{block.headline}</p>
              {block.type === "hours" ? (
                block.lines.map((line) => (
                  <p key={line} className={isGradient ? "text-gray-100" : ""}>
                    {line}
                  </p>
                ))
              ) : (
                <p className={isGradient ? "text-gray-100" : ""}>
                  {block.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Rotating loader spinner component
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader className="w-5 h-5" />
    </motion.div>
  );
}

function LocationMapEmbed() {
  return (
    <div className="w-full h-[400px] overflow-hidden rounded-t-xl bg-slate-100">
      <iframe
        title="Sarangani Resources Corporation Headquarters Location"
        src="https://maps.google.com/maps?q=Sarangani%20Resources%20Corporation,%20Cannery%20Housing%20Subdivision,%20Cannery%20Site,%20Polomolok,%20South%20Cotabato&t=&z=16&ie=UTF8&iwloc=&output=embed"
        className="w-full h-full border-0 filter contrast-[0.95]"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    contactNumber: "",
    inquiryType: "",
    message: "",
  });

  // Debounced values for real-time validation
  const debouncedEmail = useDebounce(formData.email, 500);
  const debouncedPhone = useDebounce(formData.contactNumber, 500);

  // Validation state
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);

  // Handle field-level debounced validation
  useEffect(() => {
    if (!formData.email) return;

    const emailError = validateEmail(formData.email);
    setValidationErrors((prev) => {
      // Remove existing email error if any
      const filtered = prev.filter((e) => e.field !== "email");
      // Add new error if invalid
      if (!emailError.isValid) {
        return [...filtered, emailError];
      }
      return filtered;
    });
  }, [debouncedEmail]);

  useEffect(() => {
    if (!formData.contactNumber) return;

    const phoneError = validatePhone(formData.contactNumber);
    setValidationErrors((prev) => {
      // Remove existing phone error if any
      const filtered = prev.filter((e) => e.field !== "phone");
      // Add new error if invalid
      if (!phoneError.isValid) {
        return [...filtered, phoneError];
      }
      return filtered;
    });
  }, [debouncedPhone]);

  // Clear validation errors when field is focused/changed
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    setValidationErrors((prev) => prev.filter((e) => e.field !== name));
  };

  // Retry submission
  const handleRetry = async () => {
    setShowError(false);
    setShowRetryButton(false);
    await handleSubmit(new Event("submit") as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields first
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
      // Find the label for the selected inquiry type
      const selectedOption = inquiryTypeOptions.find(
        (opt) => opt.value === formData.inquiryType,
      );
      const inquiryTypeLabel = selectedOption?.label || formData.inquiryType;

      // Build comprehensive message combining all inquiry details
      const comprehensiveMessage = `Company: ${formData.companyName}\nPhone: ${formData.contactNumber}\nInquiry Type: ${inquiryTypeLabel}\n\nMessage:\n${formData.message}`;

      // Web3Forms Payload
      const payload = {
        access_key: "3b03da7a-b129-438a-a1a4-1326b4aa6cd2",
        subject: "New SRC Website Inquiry",
        from_name: "SRC Corporate Website",
        name: formData.fullName,
        email: formData.email,
        cc: "nico_led@yahoo.com",
        message: comprehensiveMessage,
        company: formData.companyName,
        phone: formData.contactNumber,
        inquiry_type: inquiryTypeLabel,
        redirect: false,
      };

      console.log("📤 Initiating form submission with retry logic...");

      // Submit with retry logic (max 3 attempts with exponential backoff)
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
        console.log("✨ Form submitted successfully!");
        setShowSuccess(true);

        // Reset form after brief delay
        setTimeout(() => {
          setFormData({
            fullName: "",
            companyName: "",
            email: "",
            contactNumber: "",
            inquiryType: "",
            message: "",
          });
          setValidationErrors([]);
        }, 500);

        // Hide success message after EXACTLY 8 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 8000);
      } else {
        // All retries exhausted
        const errorMsg = formatSubmissionError(
          result.error || "Failed to submit form",
          result.totalAttempts,
        );
        console.error("❌ Form submission failed:", errorMsg);
        setErrorMessage(errorMsg);
        setShowError(true);
        setShowRetryButton(true);
      }
    } catch (error) {
      console.error("🚨 Unexpected error:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while submitting the form.";
      setErrorMessage(errorMsg || "Please try again later.");
      setShowError(true);
      setShowRetryButton(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] md:text-[11px] font-bold text-emerald-600 tracking-[0.2em] pl-[0.2em] uppercase block mb-6 leading-none">
            Sarangani Resources Corporation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Column: Inquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <FadeIn>
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2
                      className="text-3xl mb-6 text-gray-900"
                      style={{ fontWeight: 700 }}
                    >
                      {contactFormSection.title}
                    </h2>

                    {/* Error Alert Banner */}
                    <AnimatePresence>
                      {showError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p style={{ fontWeight: 600 }}>
                                {totalAttempts > 1
                                  ? "Submission Failed"
                                  : "Error"}
                              </p>
                              <p className="text-sm mt-1">{errorMessage}</p>
                              {showRetryButton && (
                                <motion.button
                                  onClick={handleRetry}
                                  disabled={isSubmitting}
                                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                  whileHover={
                                    !isSubmitting ? { scale: 1.05 } : {}
                                  }
                                  whileTap={
                                    !isSubmitting ? { scale: 0.95 } : {}
                                  }
                                >
                                  {isSubmitting ? (
                                    <>
                                      <Loader className="w-4 h-4 animate-spin" />
                                      Retrying...
                                    </>
                                  ) : (
                                    <>
                                      <RotateCcw className="w-4 h-4" />
                                      Try Again
                                    </>
                                  )}
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label
                            htmlFor="fullName"
                            className="block mb-2 text-gray-700"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <motion.input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Juan Dela Cruz"
                            whileHover={{ borderColor: "#059669" }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          <label
                            htmlFor="companyName"
                            className="block mb-2 text-gray-700"
                          >
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <motion.input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            placeholder="Your Company Inc."
                            whileHover={{ borderColor: "#059669" }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <label
                            htmlFor="email"
                            className="block mb-2 text-gray-700"
                          >
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <motion.input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              required
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                hasFieldError(validationErrors, "email")
                                  ? "border-red-500/50 bg-red-50/30"
                                  : "border-gray-300"
                              }`}
                                placeholder="nico_led@yahoo.com"
                              whileHover={
                                !hasFieldError(validationErrors, "email")
                                  ? { borderColor: "#059669" }
                                  : {}
                              }
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                          {hasFieldError(validationErrors, "email") && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 text-sm text-red-600"
                            >
                              {getFieldError(validationErrors, "email")}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          <label
                            htmlFor="contactNumber"
                            className="block mb-2 text-gray-700"
                          >
                            Contact Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <motion.input
                              type="tel"
                              id="contactNumber"
                              name="contactNumber"
                              value={formData.contactNumber}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              required
                              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                hasFieldError(validationErrors, "phone")
                                  ? "border-red-500/50 bg-red-50/30"
                                  : "border-gray-300"
                              }`}
                              placeholder="+63 912 345 6789"
                              whileHover={
                                !hasFieldError(validationErrors, "phone")
                                  ? { borderColor: "#059669" }
                                  : {}
                              }
                              transition={{ duration: 0.2 }}
                            />
                          </div>
                          {hasFieldError(validationErrors, "phone") && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 text-sm text-red-600"
                            >
                              {getFieldError(validationErrors, "phone")}
                            </motion.p>
                          )}
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label
                          htmlFor="inquiryType"
                          className="block mb-2 text-gray-700"
                        >
                          Nature of Inquiry <span className="text-red-500">*</span>
                        </label>
                        <motion.select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent bg-white transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          whileHover={{ borderColor: "#059669" }}
                          transition={{ duration: 0.2 }}
                        >
                          {inquiryTypeOptions.map((opt) => (
                            <option key={opt.label} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </motion.select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <label
                          htmlFor="message"
                          className="block mb-2 text-gray-700"
                        >
                          Message <span className="text-red-500">*</span>
                        </label>
                        <motion.textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent resize-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                          placeholder="Please provide details about your inquiry..."
                          whileHover={{ borderColor: "#059669" }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                        style={{ fontWeight: 600 }}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.96 } : {}}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.4,
                          duration: 0.2,
                          type: "spring",
                          stiffness: 350,
                          damping: 35,
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Submit Inquiry
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="mb-6 inline-flex"
                    >
                      <div className="relative">
                        <motion.div
                          className="w-20 h-20 bg-primary rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            delay: 0.4,
                            duration: 0.6,
                            repeat: 1,
                          }}
                        >
                          <Check className="w-10 h-10 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.h3
                      className="text-3xl mb-4 text-gray-900 font-bold"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Thank You!
                    </motion.h3>

                    <motion.p
                      className="text-lg text-gray-600 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Your inquiry has been successfully submitted.
                    </motion.p>

                    <motion.p
                      className="text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      The SRC team will carefully review your inquiry and get
                      back to you as soon as possible.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>

          {/* Right Column: Restored Sidebar Office Card */}
          <div className="bg-[#2D7A5E] text-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Polomolok Main Office</h3>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-200 mb-1 font-semibold">
                  Direct Line
                </p>
                <p className="text-lg font-medium">+63 83 228 8766</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-200 mb-1 font-semibold">
                  Email
                </p>
                <a
                  href="mailto:nico_led@yahoo.com"
                  className="text-lg font-medium hover:underline block break-all"
                >
                  nico_led@yahoo.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-200 mb-1 font-semibold">
                  Business Hours
                </p>
                <p className="text-lg font-medium">Mon-Fri: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              {contactLocationsSection.title}
            </h2>
            <p className="text-xl text-gray-600">
              {contactLocationsSection.subtitle}
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {contactOffices.map((office) => (
              <StaggerItem
                key={office.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {office.id === "polomolok" ? (
                  <>
                    <LocationMapEmbed />
                    <div className="p-8">
                      <h3
                        className="text-2xl mb-4 text-gray-900"
                        style={{ fontWeight: 700 }}
                      >
                        {office.title}
                      </h3>
                      <div className="space-y-3 text-gray-700">
                        <p>
                          <span style={{ fontWeight: 600 }}>{office.orgLine}</span>
                          <br />
                          {office.addressLines.map((line) => (
                            <span key={line}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                        <div className="pt-4 border-t border-gray-200">
                          <p className="flex items-center gap-2 mb-2">
                            <Phone className="w-4 h-4 text-[#059669]" />
                            <span>{office.phone}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#059669]" />
                            <span>{office.email}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full h-[400px] overflow-hidden rounded-t-xl bg-slate-100">
                      <iframe
                        title="Sarangani Resources Corporation General Santos Office Location"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3967.3601556942183!2d125.127263!3d6.079213!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f3074b1e5aa9b7%3A0x6fb837c729ab9971!2sCalumpang%20Ave%2C%20General%20Santos%20City%2C%20South%20Cotabato!5e0!3m2!1sen!2sph!4v1716118945000!5m2!1sen!2sph"
                        className="w-full h-full border-0 filter contrast-[0.95]"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        General Santos Office
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed mb-1">
                        Sarangani Resources Corporation
                      </p>
                      <p className="text-slate-500 leading-relaxed">
                        35M3+RF6, Purok Sta. Cruz,
                        <br />
                        Calumpang Ave, General Santos City (Dadiangas),
                        <br />
                        9500 South Cotabato, Philippines
                      </p>
                    </div>
                  </>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
