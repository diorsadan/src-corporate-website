import React from "react";
import { motion } from "framer-motion";
import { timelineData } from "@/data/companyData";
import { FADE_IN_UP } from "@/constants/animations";

/**
 * CorporateTimeline Component
 * Vertical timeline with Framer Motion animations for historical milestones
 */
export const CorporateTimeline: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="py-24 bg-gray-50"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={FADE_IN_UP} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Milestone Timeline
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From our founding in 1977 through four PEZA declarations, Sarangani
            Resources Corporation has consistently delivered strategic economic
            development and industrial excellence.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/30 transform md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.5 }}
                className={`flex gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content */}
                <div className="flex-1 md:text-right">
                  <div
                    className={`bg-white border-2 border-primary rounded-lg p-6 md:max-w-xs ${
                      index % 2 === 0
                        ? "md:ml-0 md:mr-auto"
                        : "md:ml-auto md:mr-0"
                    }`}
                  >
                    {/* Date Badge */}
                    <div className="inline-block bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded mb-3">
                      {event.date}
                    </div>

                    {/* Milestone Title */}
                    <h3 className="text-xl font-black text-gray-900 mb-2">
                      {event.milestone}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="w-6 h-6 bg-white border-4 border-primary rounded-full flex-shrink-0 mt-2"
                  />
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CorporateTimeline;
