import React from "react";
import { motion } from "framer-motion";
import { companyStats } from "@/data/companyData";
import {
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  FADE_IN_UP,
} from "@/constants/animations";

/**
 * StatsBanner Component
 * Premium 3-column grid displaying Quick Stats with Fortune 500 minimalist design
 */
export const StatsBanner: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={STAGGER_CONTAINER}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.h2
            variants={FADE_IN_UP}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Strategic Assets & Proven Track Record
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            className="text-lg text-gray-600 max-w-2xl"
          >
            Sarangani Resources Corporation operates four PEZA-registered
            economic zones with world-class infrastructure, enterprise-grade
            facilities, and a portfolio of premium locators.
          </motion.p>
        </div>

        {/* Stats Grid - Premium 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={STAGGER_ITEM}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Upper Label */}
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
                {stat.label}
              </p>

              {/* Large Number */}
              <p className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                {stat.value}
              </p>

              {/* Lower Description */}
              {stat.description && (
                <p className="text-sm text-slate-500 leading-relaxed mt-auto">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsBanner;
