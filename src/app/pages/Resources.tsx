"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Globe2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { FadeIn } from "@/components/animations/index";
import { HoverRevealCard } from "@/components/common/HoverRevealCard";
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

const soccskargenAdvantages = [
  {
    icon: LineChart,
    title: "Economic Stability",
    description: (
      <p>
        Region XII demonstrates consistent GDP growth driven by agriculture,
        manufacturing, and services sectors. Political stability and
        pro-business governance create a favorable investment climate.
      </p>
    ),
  },
  {
    icon: Globe2,
    title: "Superior Logistics",
    description: (
      <p>
        Direct access to General Santos International Seaport and Airport.
        Strategic location connects to major Philippine and ASEAN markets with
        efficient transportation networks.
      </p>
    ),
  },
  {
    icon: GraduationCap,
    title: "Skilled Workforce",
    description: (
      <p>
        Access to educated, English-speaking workforce from regional
        universities and technical schools. Competitive labor costs with high
        productivity and strong work ethic.
      </p>
    ),
  },
  {
    icon: HeartHandshake,
    title: "Quality of Life",
    description: (
      <p>
        Lower cost of living compared to Metro Manila. Safe communities, modern
        amenities, excellent schools, and proximity to beaches and natural
        attractions for work-life balance.
      </p>
    ),
  },
] as const;

export function Resources() {
  return (
    <div>
      <section className="relative py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
              {soccskargenAdvantages.map((item) => (
                <HoverRevealCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                >
                  {item.description}
                </HoverRevealCard>
              ))}
            </div>
          </FadeIn>

          <motion.div
            className="w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white hover:shadow-md transition-all duration-300 ease-in-out">
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
      </section>

      <PezaIncentivesSection />
    </div>
  );
}
