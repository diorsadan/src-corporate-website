"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Leaf, Landmark } from "lucide-react";
import { Link } from "react-router";
import { FadeIn } from "@/components/animations/index";
import { homeHero } from "@/data/statistics";
import { companyProfile } from "@/data/about";

const PROPERTIES_PATH = "/properties" as const;

const trustValues = [
  {
    icon: Landmark,
    label: "SOCCSKSARGEN Stewardship",
    detail: "Rooted in regional partnership and long-term economic uplift.",
  },
  {
    icon: Shield,
    label: "PEZA-Registered Excellence",
    detail: "World-class zone development with accountable governance.",
  },
  {
    icon: Leaf,
    label: "Sustainable Progress",
    detail: "Balancing enterprise growth with community well-being.",
  },
] as const;

/**
 * Home Page — brand introduction only.
 * Property inventory lives exclusively on /properties.
 */
export function Home() {
  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/images/homevideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70 z-10" />
        </div>

        <FadeIn className="relative z-20 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center py-16 lg:py-0">
          <div className="mb-8 lg:mb-10 space-y-3 lg:space-y-4">
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl text-white leading-tight tracking-tight"
              style={{ fontWeight: 800, letterSpacing: "-0.025em" }}
            >
              {homeHero.titleLine1}
            </h1>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl text-[#84cc16] leading-tight tracking-tight"
              style={{ fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {homeHero.titleLine2}
            </h2>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed font-light tracking-wide">
            {homeHero.subtitle}
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 350,
              damping: 35,
            }}
          >
            <Link
              to={PROPERTIES_PATH}
              className="inline-flex items-center gap-3 bg-[#059669] hover:bg-[#047857] text-white px-8 sm:px-10 py-3 lg:py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-emerald-500/30 font-semibold text-base lg:text-lg whitespace-nowrap"
            >
              Explore Our Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </FadeIn>

      </section>

      {/* ABOUT & TRUST — brand only, no property inventory */}
      <section className="py-20 sm:py-28 lg:py-32 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669] mb-4">
              About Sarangani Resources Corporation
            </p>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight mb-6 leading-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Building the Future of Economic Development in SOCCSKSARGEN
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light mb-6">
              {companyProfile.paragraphs[0]}
            </p>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              For detailed property listings, zone specifications, and subdivision
              portfolios, visit our dedicated Properties page.
            </p>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-center">
            {trustValues.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#84cc16]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[16rem]">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
