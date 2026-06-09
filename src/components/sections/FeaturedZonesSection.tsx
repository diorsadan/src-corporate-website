"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/animations";
import { featuredEconomicZones } from "@/data/properties";
import { homeFeaturedSection } from "@/data/statistics";

/**
 * FeaturedZonesSection - Lazy-loaded section component
 * Heavy with images and animations, deferred until needed
 */
export function FeaturedZonesSection() {
  return (
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
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={homeFeaturedSection.detailsLink}
                    className="inline-flex items-center gap-2 text-[#059669] hover:text-[#047857] transition-colors duration-300 font-semibold text-xs sm:text-sm group/link relative"
                  >
                    <span className="relative">
                      {homeFeaturedSection.detailsLabel}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#059669] transition-all duration-300 group-hover/link:w-full"
                        whileHover={{ scaleX: 1 }}
                        initial={{ scaleX: 0 }}
                      />
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
