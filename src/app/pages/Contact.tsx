"use client";

import { useState } from "react";
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
  contactPageHero,
  contactSidebarCards,
  contactFormSection,
  inquiryTypeOptions,
  type ContactSidebarCard,
} from "@/data/locations";

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

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    contactNumber: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.companyName ||
      !formData.email ||
      !formData.contactNumber ||
      !formData.inquiryType ||
      !formData.message
    ) {
      setErrorMessage("Please fill in all required fields");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    try {
      // Find the label for the selected inquiry type
      const selectedOption = inquiryTypeOptions.find(
        (opt) => opt.value === formData.inquiryType,
      );
      const inquiryTypeLabel = selectedOption?.label || formData.inquiryType;

      // Build comprehensive message combining all inquiry details
      const comprehensiveMessage = `Company: ${formData.companyName}\nPhone: ${formData.contactNumber}\nInquiry Type: ${inquiryTypeLabel}\n\nMessage:\n${formData.message}`;

      // BULLETPROOF Web3Forms Payload Structure
      const payload = {
        access_key: "3b03da7a-b129-438a-a1a4-1326b4aa6cd2",
        subject: "New SRC Website Inquiry",
        from_name: "SRC Corporate Website",
        name: formData.fullName,
        email: formData.email,
        cc: "diorsadan@addu.edu.ph",
        message: comprehensiveMessage,
        company: formData.companyName,
        phone: formData.contactNumber,
        inquiry_type: inquiryTypeLabel,
        redirect: false,
      };

      console.log("📤 Sending Web3Forms payload:", payload);

      // Submit to Web3Forms API with STRICT headers
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Parse response
      const result = await response.json();
      console.log("✅ Web3Forms Response:", result);

      // Check for success response
      if (result.success === true || result.ok === true) {
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
        }, 800);

        // Hide success message after 6 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 6000);
      } else {
        // Web3Forms returned an error response
        const errorMsg =
          result.message || "Failed to submit form. Please try again later.";
        console.error("❌ Web3Forms Error:", errorMsg);
        setErrorMessage(errorMsg);
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
      }
    } catch (error) {
      console.error("🚨 Network/Parse Error:", error);
      const errorMsg =
        error instanceof Error
          ? error.message
          : "An error occurred while submitting the form.";
      setErrorMessage(errorMsg || "Please try again later.");
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            {contactPageHero.title}
          </h1>
          <p className="text-xl text-gray-100">{contactPageHero.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <FadeIn className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
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
                            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3"
                          >
                            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div>
                              <p style={{ fontWeight: 600 }}>Error</p>
                              <p className="text-sm">{errorMessage}</p>
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
                              Company Name{" "}
                              <span className="text-red-500">*</span>
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
                              Email Address{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <motion.input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                              placeholder="you@company.com"
                              whileHover={{ borderColor: "#059669" }}
                              transition={{ duration: 0.2 }}
                            />
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
                              Contact Number{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <motion.input
                              type="tel"
                              id="contactNumber"
                              name="contactNumber"
                              value={formData.contactNumber}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                              placeholder="+63 912 345 6789"
                              whileHover={{ borderColor: "#059669" }}
                              transition={{ duration: 0.2 }}
                            />
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
                            Nature of Inquiry{" "}
                            <span className="text-red-500">*</span>
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
                      transition={{ duration: 0.4 }}
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
                            className="w-20 h-20 bg-[#059669] rounded-full flex items-center justify-center"
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
                        className="text-3xl mb-4 text-gray-900"
                        style={{ fontWeight: 700 }}
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

            <div className="space-y-6">
              <StaggerContainer className="space-y-6">
                {contactSidebarCards.map((card) => (
                  <StaggerItem key={card.title}>
                    <SidebarCard card={card} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
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
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                  <ImageWithFallback
                    src={office.mapImage}
                    alt={office.mapAlt}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                  <div className="relative z-10 flex h-full items-center justify-center p-8 text-center">
                    <div>
                      <MapPin className="mx-auto mb-4 h-16 w-16 text-[#059669]" />
                      <p className="text-gray-600">
                        {contactLocationsSection.mapOverlayTitle}
                      </p>
                      <p className="text-sm text-gray-500">
                        {contactLocationsSection.mapOverlayHint}
                      </p>
                    </div>
                  </div>
                </div>
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
