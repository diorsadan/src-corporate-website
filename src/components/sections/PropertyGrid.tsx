import React from "react";
import { motion } from "framer-motion";
import { propertiesData } from "@/data/companyData";
import { MapPin, ExternalLink } from "lucide-react";
import {
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  FADE_IN_UP,
} from "@/constants/animations";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

/**
 * PropertyGrid Component
 * High-end corporate card grid displaying all 4 SRC property zones with location mapping
 */
export const PropertyGrid: React.FC = () => {
  const openMapLocation = (lat: number, lng: number, name: string) => {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={STAGGER_CONTAINER}
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={FADE_IN_UP} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Strategic Property Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Four PEZA-registered economic zones engineered for operational
            excellence, featuring integrated infrastructure, premier locator
            tenants, and strategic geographic positioning across SOCCSKSARGEN.
          </p>
        </motion.div>

        {/* Properties Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {propertiesData.map((property, index) => (
            <motion.div
              key={property.id}
              variants={STAGGER_ITEM}
              className="group border border-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={
                    property.image ||
                    "/assets/placeholders/property-placeholder.jpg"
                  }
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay Badge */}
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 text-sm font-bold">
                  {property.areaFormatted}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-3 inline-block">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {property.category.replace("-", " ")}
                  </span>
                </div>

                {/* Property Name */}
                <h3 className="text-2xl font-black text-gray-900 mb-3 leading-tight">
                  {property.name}
                </h3>

                {/* Location */}
                <div className="flex items-start gap-2 mb-4 text-gray-600">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {property.location}
                    </p>
                    <p className="text-sm">{property.province}</p>
                  </div>
                </div>

                {/* PEZA Date */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs uppercase text-gray-500 font-bold tracking-wider">
                    PEZA Declaration
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {property.peazaDeclarationDate}
                  </p>
                </div>

                {/* Description */}
                <p className="text-base text-gray-700 leading-relaxed mb-6">
                  {property.description}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() =>
                    openMapLocation(
                      property.coordinates?.lat || 6.2238,
                      property.coordinates?.lng || 125.0682,
                      property.name,
                    )
                  }
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <MapPin className="w-5 h-5" />
                  View on Map
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PropertyGrid;
