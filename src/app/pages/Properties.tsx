"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Zap,
  Droplet,
  Wifi,
  Shield,
  Truck,
  Factory,
} from "lucide-react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import { images } from "@/constants/images";
import {
  propertyGallerySection,
  propertyInfrastructureFeatures,
  propertyInfrastructureSection,
  propertyMapPins,
  propertyMapSection,
  propertiesPageHero,
  propertySplitZones,
  type InfrastructureIcon,
  type PropertyStatIcon,
} from "@/data/properties";
import { ZoneLocationsMap } from "@/components/sections/ZoneLocationsMap";
import { PropertyGrid } from "@/components/sections/PropertyGrid";

const statIconMap: Record<PropertyStatIcon, typeof Factory> = {
  factory: Factory,
  map: MapPin,
  truck: Truck,
};

const infrastructureIconMap: Record<InfrastructureIcon, typeof Zap> = {
  zap: Zap,
  droplet: Droplet,
  wifi: Wifi,
  shield: Shield,
  truck: Truck,
  factory: Factory,
};

export function Properties() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            {propertiesPageHero.title}
          </h1>
          <p className="text-xl text-gray-100">{propertiesPageHero.subtitle}</p>
        </div>
      </section>

      {/* Zone Locations Interactive Map - Premium Positioning */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <div className="px-4 py-2 rounded-full bg-[#059669]/10 border border-[#059669]/20">
                <span className="text-sm font-semibold text-[#059669]">
                  Strategic Locations
                </span>
              </div>
            </div>
            <h2
              className="text-5xl mb-6 text-gray-900 leading-tight"
              style={{ fontWeight: 700 }}
            >
              Zone Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strategic industrial zones across SOCCSKSARGEN region, optimally
              positioned for regional commerce and trade
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <ZoneLocationsMap />
          </motion.div>
        </div>
      </section>

      {/* Strategic Property Portfolio with Interactive Filters */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyGrid />
      </div>
    </div>
  );
}
