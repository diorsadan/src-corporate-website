"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Package,
  Zap,
  Truck,
  Users,
  FileCheck,
  Shield,
  Landmark,
  CheckCircle,
} from "lucide-react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import { pezaIncentivesData } from "@/data/pezaIncentives";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  BarChart3,
  DollarSign,
  Package,
  Zap,
  Truck,
  Users,
  FileCheck,
  Shield,
  Landmark,
};

export function PezaIncentivesSection() {
  const { strategicAdvantage, fiscalIncentives, operationalBenefits } =
    pezaIncentivesData;

  return (
    <div className="w-full">
      {/* Strategic Advantage Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="w-7 h-7 text-emerald-600 flex-shrink-0" />
              <span className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase">
                PEZA Designation
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {strategicAdvantage.title}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
              {strategicAdvantage.description}
            </p>
          </motion.div>

          {/* Objectives Grid - Uniform with Fiscal Incentives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {strategicAdvantage.objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col h-full p-7 md:p-8 bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-lg transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.01 }}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-8 h-8 flex-shrink-0 text-emerald-600 mt-1">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {objective.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-grow">
                  {objective.description}
                </p>
                <div className="mt-5 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fiscal Incentives Section */}
        <section className="relative py-16 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-7 h-7 text-emerald-600 flex-shrink-0" />
              <span className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase">
                Tax Framework
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {fiscalIncentives.title}
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
              {fiscalIncentives.subtitle}
            </p>
          </motion.div>

          {/* Uniform Fiscal Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {fiscalIncentives.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || DollarSign;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col h-full p-7 md:p-8 rounded-xl border border-slate-200/70 bg-white shadow-sm hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  {/* Header: Icon and Title - Fixed Height Container */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 rounded-xl flex items-center justify-center flex-none">
                      <IconComponent className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug pt-1">
                      {benefit.title}
                    </h3>
                  </div>

                  {/* Description: Flex-grow to fill available space */}
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-grow">
                    {benefit.description}
                  </p>

                  {/* Decorative accent line on hover */}
                  <div className="mt-5 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>
        </section>

        {/* Operational Benefits Section */}
        <section className="relative py-16 md:py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                <span className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase">
                  Operational Advantages
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {operationalBenefits.title}
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
                {operationalBenefits.subtitle}
              </p>
            </motion.div>

            {/* Operational Benefits Grid */}
            <StaggerContainer
              staggerChildren={0.08}
              delayChildren={0.2}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
            >
              {operationalBenefits.benefits.map((benefit, index) => {
                const IconComponent =
                  iconMap[benefit.icon] || Shield;
                return (
                  <StaggerItem key={index}>
                    <motion.div
                      className="relative p-7 md:p-8 bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-lg transition-all duration-300 group h-full"
                      whileHover={{ y: -5, scale: 1.01 }}
                    >
                      {/* Decorative left border accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 rounded-l-xl transition-opacity duration-300" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-none">
                            <IconComponent className="w-6 h-6 text-emerald-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                            {benefit.title}
                          </h3>
                          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section - Refined Premium Card Block */}
        <section className="mt-20 md:mt-28 mb-20 md:mb-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto w-full"
          >
            {/* Outer container with premium shadow and border */}
            <div className="relative bg-emerald-700 rounded-2xl overflow-hidden shadow-2xl border border-emerald-600/40 backdrop-blur-sm">
              {/* Premium gradient overlay accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-700 pointer-events-none" />
              
              {/* Decorative top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-lime-300/70 to-emerald-400/0" />

              {/* Content wrapper */}
              <div className="relative z-10 px-6 py-16 md:py-20 md:px-16 flex flex-col items-center">
                {/* Premium top accent */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  className="w-16 h-1 bg-gradient-to-r from-lime-300 via-emerald-200 to-lime-300 rounded-full mb-8"
                />

                {/* Main headline with balanced spacing */}
                <h2 className="text-white font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight max-w-3xl mb-6 text-center">
                  Ready to Unlock Competitive Advantages?
                </h2>

                {/* Decorative divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-lime-300/50 to-transparent mb-8" />

                {/* Premium subtitle */}
                <p className="text-emerald-50/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 font-light tracking-wide">
                  Join leading agro-industrial enterprises within SRC's PEZA-designated zones and maximize your return on investment.
                </p>

                {/* Premium action button */}
                <motion.a
                  href="/PEZA GUIDELINES.pdf"
                  download="PEZA GUIDELINES.pdf"
                  whileHover={{ 
                    scale: 1.06,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative px-8 py-3.5 bg-white text-emerald-700 font-bold text-base rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-white/20 overflow-hidden"
                >
                  <span className="relative z-10">Download PEZA Guidelines</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </motion.a>

                {/* Decorative divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-lime-300/50 to-transparent my-8" />

                {/* Premium trust statement */}
                <p className="text-emerald-100/70 text-xs tracking-[0.2em] font-semibold uppercase">
                  Trusted by leading investors across Southeast Asia
                </p>
              </div>

              {/* Decorative corner accent - top right */}
              <div className="absolute -top-2 -right-2 w-24 h-24 bg-lime-400/8 rounded-full blur-3xl pointer-events-none" />
              
              {/* Decorative corner accent - bottom left */}
              <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-emerald-300/8 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </section>
    </div>
  );
}
