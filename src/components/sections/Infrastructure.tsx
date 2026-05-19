import React from "react";
import { motion } from "framer-motion";
import { facilitiesData } from "@/data/companyData";
import { Zap, Droplet, Wifi, Shield } from "lucide-react";
import {
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  FADE_IN_UP,
} from "@/constants/animations";

/**
 * Icon Mapping for Infrastructure Categories
 */
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "power supply":
      return <Zap className="w-8 h-8" />;
    case "water systems":
      return <Droplet className="w-8 h-8" />;
    case "telecommunications":
      return <Wifi className="w-8 h-8" />;
    case "security protocols":
      return <Shield className="w-8 h-8" />;
    default:
      return null;
  }
};

/**
 * Infrastructure Component
 * Formal section displaying shared infrastructure across all SRC zones
 */
export const Infrastructure: React.FC = () => {
  const infrastructureArray = [
    facilitiesData.power,
    facilitiesData.water,
    facilitiesData.telecom,
    facilitiesData.security,
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={STAGGER_CONTAINER}
      className="py-24 bg-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={FADE_IN_UP} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            World-Class Shared Infrastructure
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every SRC zone is supported by enterprise-grade facilities
            engineered for 24/7 operational reliability, regulatory compliance,
            and seamless supply chain integration.
          </p>
        </motion.div>

        {/* Infrastructure Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {infrastructureArray.map((facility, index) => (
            <motion.div
              key={index}
              variants={STAGGER_ITEM}
              className="border border-gray-700 rounded-xl p-8 bg-gray-800/50 hover:bg-gray-800 hover:border-primary transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                <div className="text-primary">
                  {getCategoryIcon(facility.category)}
                </div>
              </div>

              {/* Category */}
              <h3 className="text-2xl font-black mb-2 text-white">
                {facility.category}
              </h3>

              {/* Provider */}
              <p className="text-sm uppercase text-gray-400 font-bold tracking-wider mb-4">
                Provider: {facility.provider}
              </p>

              {/* Details Description */}
              <p className="text-base text-gray-300 leading-relaxed mb-6">
                {facility.details}
              </p>

              {/* Visual Accent */}
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          variants={FADE_IN_UP}
          className="text-center pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400 text-lg">
            All infrastructure systems are designed to ISO 9001 standards with
            redundancy protocols ensuring continuous operation and minimal
            downtime for all tenant operations.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Infrastructure;
