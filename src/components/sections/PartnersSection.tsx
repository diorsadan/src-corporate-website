"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/index";
import { homePartners } from "@/data/partners";
import { homePartnersSection } from "@/data/statistics";

type PartnerDisplay = (typeof homePartners)[number]["display"];

const partnerTextClass: Record<PartnerDisplay, string> = {
  "text-dark": "text-lg text-gray-800 font-semibold",
  "text-emerald": "text-lg text-[#059669] font-semibold",
  "text-muted": "text-sm text-gray-600 font-medium",
};

/**
 * PartnersSection - Lazy-loaded section component
 * Displays partner logos and names in elegant grid
 */
export function PartnersSection() {
  return (
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
          {homePartners.map((partner) => (
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
  );
}
