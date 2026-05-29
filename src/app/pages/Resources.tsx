"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  TrendingUp,
  Ship,
  Award,
  Briefcase,
  DollarSign,
  FileText,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import { PropertyImageCarousel } from "@/components/common/PropertyImageCarousel";
import { PezaIncentivesSection } from "@/components/sections/PezaIncentivesSection";

const carouselImagePaths = [
  "/images/soccsksargen/1.jpg",
  "/images/soccsksargen/2.jpg",
  "/images/soccsksargen/3.jpg",
  "/images/soccsksargen/4.jpg",
  "/images/soccsksargen/5.jpg",
  "/images/soccsksargen/6.jpg",
];

export function Resources() {
  return (
    <div>
      {/* Premium Hero Section with Clean Canvas */}
      <section className="relative py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Area */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-xs md:text-sm font-semibold text-emerald-700 tracking-widest uppercase block mb-6">
              Sarangani Resources Corporation
            </span>

            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Why Choose SOCCSKSARGEN
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto">
                Strategic advantages for your business operations
              </p>
            </FadeIn>
          </div>

          {/* Content Grid: Left benefits, right carousel */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              {/* Benefits - uniform cards */}
              <FadeIn>
                <div className="grid grid-cols-1 gap-6">
                  {/* Card template: white surface, clear border, subtle shadow */}
                  <motion.div
                    className="flex flex-col h-full justify-between gap-4 p-6 bg-white border border-slate-200 shadow-sm rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                        <TrendingUp className="w-6 h-6 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Economic Stability
                        </h3>
                        <p className="text-slate-600 text-sm mt-2">
                          Region XII demonstrates consistent GDP growth driven by
                          agriculture, manufacturing, and services sectors.
                          Political stability and pro-business governance create a
                          favorable investment climate.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col h-full justify-between gap-4 p-6 bg-white border border-slate-200 shadow-sm rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                        <Ship className="w-6 h-6 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Superior Logistics
                        </h3>
                        <p className="text-slate-600 text-sm mt-2">
                          Direct access to General Santos International Seaport and
                          Airport. Strategic location connects to major Philippine
                          and ASEAN markets with efficient transportation networks.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col h-full justify-between gap-4 p-6 bg-white border border-slate-200 shadow-sm rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                        <Briefcase className="w-6 h-6 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Skilled Workforce
                        </h3>
                        <p className="text-slate-600 text-sm mt-2">
                          Access to educated, English-speaking workforce from
                          regional universities and technical schools. Competitive
                          labor costs with high productivity and strong work ethic.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col h-full justify-between gap-4 p-6 bg-white border border-slate-200 shadow-sm rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100">
                        <Award className="w-6 h-6 text-emerald-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Quality of Life
                        </h3>
                        <p className="text-slate-600 text-sm mt-2">
                          Lower cost of living compared to Metro Manila. Safe
                          communities, modern amenities, excellent schools, and
                          proximity to beaches and natural attractions for work-life
                          balance.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>

              {/* Carousel - clear surface with visible border */}
              <motion.div
                className="w-full"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white hover:shadow-md transition-all duration-200">
                  <PropertyImageCarousel
                    images={carouselImagePaths}
                    alt="SOCCSKSARGEN investor showcase"
                    heightClass="h-[500px]"
                    autoPlay
                    autoPlayIntervalMs={4500}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium PEZA Incentives Component (kept intact) */}
      <PezaIncentivesSection />
    </div>
  );
}
