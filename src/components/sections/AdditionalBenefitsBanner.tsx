import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { FADE_IN_UP, STAGGER_CONTAINER, STAGGER_ITEM } from "@/constants/animations";
import { ConsultationForm } from "@/components/sections/ConsultationForm";

/**
 * AdditionalBenefitsBanner Component
 * Premium banner showcasing PEZA benefits with functional download and CTA buttons
 * Features download button for PDF and consultation CTA
 */
export const AdditionalBenefitsBanner: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const benefits = [
    {
      title: "Tax Incentives",
      description:
        "Enjoy income tax holidays and duty-free import privileges for PEZA-registered enterprises.",
    },
    {
      title: "Streamlined Operations",
      description:
        "Efficient customs procedures and expedited import/export processes reduce operational delays.",
    },
    {
      title: "Strategic Location",
      description:
        "Prime positioning near major ports and logistics hubs ensures optimal supply chain efficiency.",
    },
  ];

  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={STAGGER_CONTAINER}
        className="py-24 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            variants={FADE_IN_UP}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Additional PEZA Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SRC PEZA zones unlock strategic advantages designed to maximize
              operational efficiency, minimize costs, and accelerate growth for
              international enterprises.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={STAGGER_ITEM}
                className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary rounded" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={FADE_IN_UP}
            className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 text-white text-center"
          >
            <h3 className="text-3xl font-black mb-4">
              Ready to Explore Your Options?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Download our comprehensive PEZA guidelines or schedule a
              consultation with our team to discuss your specific business needs.
            </p>

            {/* Button Group */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Download Button - Motion-enhanced with micro-interactions */}
              <motion.a
                href="/PEZA_GUIDELINES.pdf"
                download="PEZA_GUIDELINES.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download PEZA Guide
              </motion.a>

              {/* Consultation CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        source="additional-benefits-banner"
      />
    </>
  );
};

export default AdditionalBenefitsBanner;
