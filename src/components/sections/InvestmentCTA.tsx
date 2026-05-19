import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Download, ArrowRight } from "lucide-react";
import { FADE_IN_UP } from "@/constants/animations";
import { ConsultationForm } from "@/components/sections/ConsultationForm";

/**
 * InvestmentCTA Component
 * Premium investment call-to-action section with dual CTA strategy
 * Features download guide button and schedule consultation modal
 */
export const InvestmentCTA: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
          },
        }}
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              variants={FADE_IN_UP}
              className="space-y-8"
            >
              {/* Icon Badge */}
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>

              {/* Headline */}
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                  Strategic Investment Opportunities in SOCCSKSARGEN
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Sarangani Resources Corporation's four PEZA-registered economic
                  zones offer premium investment platforms for agro-industrial,
                  manufacturing, and logistics operations.
                </p>
              </div>

              {/* Key Points */}
              <div className="space-y-4">
                {[
                  "158.47 hectares of strategically developed PEZA zones",
                  "World-class infrastructure with 24/7 support",
                  "Anchor tenants including Dole Philippines Incorporated",
                  "Tax incentives and streamlined regulatory pathways",
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-gray-700 font-medium">{point}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                variants={FADE_IN_UP}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {/* Download Investment Guide - HTML5 anchor for direct download */}
                <a
                  href="/PEZA GUIDELINES.pdf"
                  download="Investment_Guide_SRC.pdf"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <Download className="w-5 h-5" />
                  Download Investment Guide
                </a>

                {/* Consultation Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Element */}
            <motion.div
              variants={FADE_IN_UP}
              className="relative"
            >
              {/* Gradient Background Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl transform rotate-3" />

                <div className="relative bg-gradient-to-br from-primary/5 to-white border-2 border-primary/20 rounded-2xl p-12 backdrop-blur-sm">
                  {/* Stats Display */}
                  <div className="space-y-8">
                    {[
                      { label: "Total PEZA Zones", value: "4" },
                      { label: "Active Locators", value: "3+" },
                      { label: "Total Land Area", value: "158.47 ha" },
                      { label: "Years Established", value: "49+" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        viewport={{ once: true }}
                        className="border-b border-primary/10 pb-6 last:border-b-0 last:pb-0"
                      >
                        <p className="text-sm uppercase font-bold text-gray-500 tracking-wider mb-2">
                          {stat.label}
                        </p>
                        <p className="text-4xl font-black text-primary">
                          {stat.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-2 border-primary/20 rounded-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary/10 rounded-full" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        source="investment-cta"
      />
    </>
  );
};

export default InvestmentCTA;
