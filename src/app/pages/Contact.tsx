import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  contactLocationsSection,
  contactOffices,
  contactPageHero,
  contactSidebarCards,
  contactFormSection,
  inquiryTypeOptions,
  type ContactSidebarCard,
} from "@/data/locations";
import { contactInfo, generateMailtoLink } from "@/data/contact";

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

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    contactNumber: "",
    inquiryType: "",
    message: "",
  });

  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Find the label for the selected inquiry type
    const selectedOption = inquiryTypeOptions.find(
      (opt) => opt.value === formData.inquiryType,
    );
    const inquiryTypeLabel = selectedOption?.label || formData.inquiryType;

    // Generate mailto link and open email client
    const mailtoLink = generateMailtoLink(formData, inquiryTypeLabel);
    window.location.href = mailtoLink;

    // Show thank you message
    setShowThankYou(true);

    // Reset form
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      contactNumber: "",
      inquiryType: "",
      message: "",
    });

    // Hide thank you message after 5 seconds
    setTimeout(() => {
      setShowThankYou(false);
    }, 5000);
  };

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
            <FadeIn className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2
                  className="text-3xl mb-6 text-gray-900"
                  style={{ fontWeight: 700 }}
                >
                  {contactFormSection.title}
                </h2>

                {showThankYou && (
                  <div className="mb-6 p-4 bg-[#059669] text-white rounded-lg flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 600 }}>
                        Thank you for your inquiry!
                      </p>
                      <p className="text-sm text-green-100">
                        Your email client will open with the inquiry details.
                        Please send the email to complete your submission.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="Juan Dela Cruz"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block mb-2 text-gray-700"
                      >
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-gray-700"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactNumber"
                        className="block mb-2 text-gray-700"
                      >
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="+63 912 345 6789"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block mb-2 text-gray-700"
                    >
                      Nature of Inquiry <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent bg-white"
                    >
                      {inquiryTypeOptions.map((opt) => (
                        <option key={opt.label} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-gray-700"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <Send className="w-5 h-5" />
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </FadeIn>

            <StaggerContainer className="space-y-6">
              {contactSidebarCards.map((card) => (
                <StaggerItem key={card.title}>
                </StaggerItem>
              StaggerContainerSidebarCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <diFadeIn className="text-center mb-12">
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

          <StaggerContainer
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coStaggerItem key={office.id}  className="bg-white rounded-xl shadow-lg overflow-hidden"
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
                      {office.id === "polomolok" ? (
                        <>{contactInfo.officeAddress}</>
                      ) : (
                        office.addressLines.map((line) => (
                          <span key={line}>
                            {line}
                            <br />
                          </span>
                        ))
                      )}
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-[#059669]" />
                        <span>
                          {office.id === "polomolok"
                            ? contactInfo.officePhone
                            : office.phone}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#059669]" />
                        <span>
                          {office.id === "polomolok"
                            ? contactInfo.primaryEmail
                            : office.email}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>StaggerItem>
            ))}
          </StaggerContainer
  );
}
