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

        {/* Stats Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={STAGGER_ITEM}
              className="border border-gray-200 rounded-lg p-8 bg-gray-50 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              {/* Large Value */}
              <div className="mb-4">
                <p className="text-5xl md:text-6xl font-black text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>

              {/* Description */}
              {stat.description && (
                <p className="text-base text-gray-700 leading-relaxed border-t border-gray-200 pt-6">
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
