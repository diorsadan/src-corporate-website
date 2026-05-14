"use client";

import {
  ArrowRight,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { images } from "@/constants/images";
import { featuredEconomicZones } from "@/data/properties";
import {
  homeFeaturedSection,
  homeHero,
  homePartnersSection,
  homeStats,
} from "@/data/statistics";
import { homePartners, partnerLogoPaths } from "@/data/partners";

const statIcons = {
  trending: TrendingUp,
  users: Users,
  calendar: Calendar,
} as const;

const partnerTextClass: Record<
  (typeof homePartners)[number]["display"],
  string
> = {
  "text-dark": "text-lg text-gray-800 font-semibold",
  "text-emerald": "text-lg text-[#059669] font-semibold",
  "text-muted": "text-sm text-gray-600 font-medium",
};

export function Home() {
  return (
    <div className="w-full">
      {/* HERO SECTION - Elevated & Premium */}
      <section className="relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={images.home.hero}
            alt="Sarangani Resources Corporation - Economic Zones"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
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
          <Link
            to={homeHero.ctaPath}
            className="inline-flex items-center gap-3 bg-[#059669] hover:bg-[#047857] text-white px-8 sm:px-10 py-3 lg:py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 border border-emerald-500/30 font-semibold text-base lg:text-lg whitespace-nowrap"
          >
            {homeHero.ctaLabel}
            <ArrowRight className="w-5 h-5 transition-transform" />
          </Link>
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

      {/* FEATURED ZONES - 4-Column Premium Grid */}
      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Elegant Fade-In */}
          <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 lg:space-y-5">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight"
              style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              {homeFeaturedSection.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {homeFeaturedSection.subtitle}
            </p>
          </FadeIn>

          {/* 4-Column Grid - Staggered Card Reveals */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredEconomicZones.map((zone, index) => (
              <StaggerItem
                key={index}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-md hover:-translate-y-1 cursor-pointer"
              >
                {/* Image Container - Premium Hover Effect */}
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content - Clean & Organized */}
                <div className="p-5 sm:p-6 space-y-3 lg:space-y-4">
                  <h3
                    className="text-lg lg:text-xl text-gray-900 tracking-tight leading-tight"
                    style={{ fontWeight: 700 }}
                  >
                    {zone.title}
                  </h3>

                  {/* Area Badge */}
                  <div className="inline-block">
                    <span className="text-xs sm:text-sm font-semibold text-[#059669] bg-[#ecfdf5] px-3 py-1.5 rounded-full">
                      {zone.area}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 font-light">
                    {zone.description}
                  </p>

                  {/* CTA Link - Elegant */}
                  <Link
                    to={homeFeaturedSection.detailsLink}
                    className="inline-flex items-center gap-2 text-[#059669] hover:text-[#047857] transition-colors duration-200 font-semibold text-xs sm:text-sm group/link"
                  >
                    {homeFeaturedSection.detailsLabel}
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* TRUST BANNER - Partner Logos in Grayscale */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Elegant Fade-In */}
          <FadeIn className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 lg:space-y-4">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 tracking-tight"
              style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              {homePartnersSection.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {homePartnersSection.subtitle}
            </p>
          </FadeIn>

          {/* Partner Logos Grid - Staggered Reveals */}
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center">
            {homePartners.map((partner, index) => (
              <StaggerItem
                key={partner.name}
                className="flex items-center justify-center p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-500 group cursor-pointer hover:border-gray-300 hover:shadow-sm h-24 sm:h-28 lg:h-32"
              >
                {/* Logo or Text - Premium Presentation */}
                <div
                  className={`${partnerTextClass[partner.display]} transition-all duration-500 group-hover:scale-105 text-center line-clamp-2`}
                >
                  {partner.name}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section - Drive Engagement */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-[#059669] to-[#047857] text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full -mr-36 sm:-mr-48 -mt-36 sm:-mt-48" />
        <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-white/5 rounded-full -ml-28 sm:-ml-36 -mb-28 sm:-mb-36" />

        <FadeIn
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12 lg:py-0"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl mb-6 lg:mb-8 tracking-tight leading-tight"
            style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Ready to Grow Your Business?
          </h2>
          <p className="text-base sm:text-lg text-emerald-50 mb-10 lg:mb-12 leading-relaxed font-light max-w-3xl mx-auto">
            Discover how our premier economic zones can support your
            enterprise's growth and success.
          </p>
          <Link
            to="/leasing"
            className="inline-flex items-center gap-3 bg-white text-[#059669] hover:bg-gray-50 px-8 sm:px-10 py-3 lg:py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 font-semibold whitespace-nowrap"
          >
            Explore Leasing Options
            <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
