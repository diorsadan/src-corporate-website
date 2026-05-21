"use client";

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Calendar } from "lucide-react";
import { Link } from "react-router";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import { homeHero, homeStats } from "@/data/statistics";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

/**
 * Lazy-loaded sections - code-split for better initial page load
 * These heavy sections are loaded only when needed (below fold)
 */
const FeaturedZonesSection = lazy(() =>
  import("@/components/sections/FeaturedZonesSection").then((m) => ({
    default: m.FeaturedZonesSection,
  })),
);

const PartnersSection = lazy(() =>
  import("@/components/sections/PartnersSection").then((m) => ({
    default: m.PartnersSection,
  })),
);

const CTASection = lazy(() =>
  import("@/components/sections/CTASection").then((m) => ({
    default: m.CTASection,
  })),
);

/**
 * Corporate data sections - displaying finalized SRC data
 */
const StatsBanner = lazy(() =>
  import("@/components/sections/StatsBanner").then((m) => ({
    default: m.StatsBanner,
  })),
);

const PropertyGrid = lazy(() =>
  import("@/components/sections/PropertyGrid").then((m) => ({
    default: m.PropertyGrid,
  })),
);

const Infrastructure = lazy(() =>
  import("@/components/sections/Infrastructure").then((m) => ({
    default: m.Infrastructure,
  })),
);

const statIcons = {
  trending: TrendingUp,
  users: Users,
  calendar: Calendar,
} as const;

/**
 * Home Page - Performance optimized with lazy loading
 *
 * Optimization techniques:
 * 1. Above-fold sections (hero, stats) load immediately
 * 2. Below-fold sections (featured zones, partners, CTA) lazy-loaded
 * 3. React.Suspense with SectionSkeleton provides smooth UX
 * 4. Hero uses hardware-accelerated video background with gradient overlay
 */
export function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION - Elevated & Premium */}
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

        {/* Hero Content - Elegant Fade-In Animation */}
        <FadeIn className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center py-16 lg:py-0">
          {/* Headline - Premium Typography */}
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

          {/* Subtitle - Elegant Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-3xl mx-auto mb-10 lg:mb-12 leading-relaxed font-light tracking-wide">
            {homeHero.subtitle}
          </p>

          {/* CTA Button - Sleek & Premium */}
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
              to={homeHero.ctaPath}
              className="inline-flex items-center gap-3 bg-[#059669] hover:bg-[#047857] text-white px-8 sm:px-10 py-3 lg:py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-emerald-500/30 font-semibold text-base lg:text-lg whitespace-nowrap"
            >
              {homeHero.ctaLabel}
              <ArrowRight className="w-5 h-5 transition-transform" />
            </Link>
          </motion.div>
        </FadeIn>

        {/* Scroll Indicator - Gentle Animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm font-medium">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM STATS BANNER - Minimalist & Elegant */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-[#f9fafb] to-[#f3f4f6] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {homeStats.map((stat) => {
              const Icon = statIcons[stat.icon];
              return (
                <StaggerItem
                  key={stat.label}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group text-center sm:text-left"
                >
                  {/* Icon Badge - Subtle & Premium */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full ${stat.iconBgClass} flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm`}
                  >
                    <Icon
                      className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Stat Content */}
                  <div className="flex-1">
                    <div
                      className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-1 lg:mb-2"
                      style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
                    >
                      {stat.value}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 font-medium tracking-tight">
                      {stat.label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* COMPANY STATS BANNER - Lazy-loaded with Suspense */}
      <Suspense fallback={<SectionSkeleton variant="grid" itemCount={3} />}>
        <StatsBanner />
      </Suspense>

      {/* PROPERTY GRID - Lazy-loaded with Suspense */}
      <Suspense fallback={<SectionSkeleton variant="grid" itemCount={4} />}>
        <PropertyGrid />
      </Suspense>

      {/* INFRASTRUCTURE - Lazy-loaded with Suspense */}
      <Suspense fallback={<SectionSkeleton variant="grid" itemCount={4} />}>
        <Infrastructure />
      </Suspense>

      {/* FEATURED ZONES - Lazy-loaded with Suspense */}
      <Suspense fallback={<SectionSkeleton variant="grid" itemCount={4} />}>
        <FeaturedZonesSection />
      </Suspense>

      {/* TRUST BANNER - Lazy-loaded with Suspense */}
      <Suspense fallback={<SectionSkeleton variant="list" itemCount={4} />}>
        <PartnersSection />
      </Suspense>

      {/* CTA SECTION - Lazy-loaded with Suspense */}
      <Suspense fallback={<SectionSkeleton variant="hero" height={250} />}>
        <CTASection />
      </Suspense>
    </div>
  );
}
