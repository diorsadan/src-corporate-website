import React from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { propertiesData, type Property } from "@/data/companyData";
import {
  MapPin,
  ExternalLink,
  X,
  CheckCircle,
  Ruler,
  Calendar,
} from "lucide-react";
import {
  FADE_IN_UP,
  VIEWPORT_ONCE,
} from "@/constants/animations";
import { PropertyImageCarousel } from "@/components/common/PropertyImageCarousel";

type PropertyFilterId = "all" | "industrial-zone" | "subdivision";

const CARD_HOVER_SPRING = {
  type: "spring" as const,
  stiffness: 250,
  damping: 18,
};
const MODAL_SPRING = { type: "spring" as const, stiffness: 300, damping: 22 };

function getCategoryLabel(category: Property["category"]): string {
  return category === "industrial-zone" ? "Industrial Zone" : "Subdivision";
}

function getPropertyFeatures(property: Property): string[] {
  if (property.features?.length) return property.features;
  if (property.category === "industrial-zone") {
    return [
      "PEZA-Registered Economic Zone",
      "Industrial-Grade Infrastructure",
      "Strategic Logistics & Distribution Access",
    ];
  }
  return [];
}

/**
 * PropertyGrid Component
 * Filterable portfolio grid with premium hover cards and expandable property modal
 */
export const PropertyGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] =
    React.useState<PropertyFilterId>("all");
  const [selectedProperty, setSelectedProperty] =
    React.useState<Property | null>(null);
  const [hoveredCardId, setHoveredCardId] = React.useState<string | null>(
    null,
  );

  const propertyFilters = [
    { id: "all", label: "All Spaces" },
    { id: "industrial-zone", label: "Industrial Zones" },
    { id: "subdivision", label: "Subdivisions" },
  ] as const;

  const filteredProperties =
    activeFilter === "all"
      ? propertiesData
      : propertiesData.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase(),
        );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProperty(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (selectedProperty) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [selectedProperty]);

  const openMapLocation = (
    e: React.MouseEvent,
    lat: number,
    lng: number,
    name: string,
  ) => {
    e.stopPropagation();
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={FADE_IN_UP}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Strategic Property Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Four PEZA-registered economic zones engineered for operational
            excellence, featuring integrated infrastructure, premier locator
            tenants, and strategic geographic positioning across SOCCSKSARGEN.
          </p>
        </motion.div>

        {/* Property Category Filters */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          variants={FADE_IN_UP}
          className="mb-12 flex flex-wrap gap-3"
        >
          {propertyFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                if (activeFilter !== filter.id) {
                  setActiveFilter(filter.id);
                }
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-[#059669] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Properties Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
            filteredProperties.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          }`}
        >
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              layout={false}
              whileHover={{
                y: -12,
                scale: 1.05,
                boxShadow:
                  "0 25px 30px -5px rgb(0 0 0 / 0.15), 0 12px 16px -6px rgb(0 0 0 / 0.15)",
              }}
              whileTap={{ scale: 1.02 }}
              transition={CARD_HOVER_SPRING}
              className="group/card cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full hover:border-primary/25 transition-colors duration-300"
              onHoverStart={() => setHoveredCardId(property.id)}
              onHoverEnd={() => setHoveredCardId(null)}
              onClick={() => {
                setHoveredCardId(null);
                setSelectedProperty(property);
              }}
            >
              <div className="relative overflow-hidden bg-gray-100 shrink-0">
                <PropertyImageCarousel
                  images={property.images}
                  alt={property.name}
                  heightClass="h-64"
                  isolateControls
                  parentGroupName="card"
                  advanceOnHover
                  isHovered={hoveredCardId === property.id}
                  autoPlayIntervalMs={2800}
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 text-sm font-bold z-20 pointer-events-none">
                  {property.areaFormatted}
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="mb-3 inline-block">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {getCategoryLabel(property.category)}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 leading-tight">
                  {property.name}
                </h3>

                <div className="flex items-start gap-2 mb-4 text-gray-600">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {property.location}
                    </p>
                    <p className="text-sm">{property.province}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                  {property.description}
                </p>

                <button
                  type="button"
                  onClick={(e) =>
                    openMapLocation(
                      e,
                      property.coordinates?.lat ?? 6.2238,
                      property.coordinates?.lng ?? 125.0682,
                      property.name,
                    )
                  }
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  View on Map
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded property modal */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            key="property-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedProperty(null)}
            role="presentation"
          >
            <motion.div
              key={selectedProperty.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={MODAL_SPRING}
              className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:h-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="property-modal-title"
            >
              <button
                type="button"
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-lg hover:bg-white hover:text-slate-900 transition-colors"
                aria-label="Close property details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left — visual showcase */}
              <div className="relative w-full h-64 md:h-full min-h-[300px] md:min-h-[500px] bg-slate-900">
                <PropertyImageCarousel
                  images={selectedProperty.images}
                  alt={selectedProperty.name}
                  heightClass="h-full min-h-[300px] md:min-h-[500px]"
                  autoPlay
                  autoPlayIntervalMs={3200}
                />
              </div>

              {/* Right — technical specification panel */}
              <div className="p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[50vh] md:max-h-[85vh]">
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                    {getCategoryLabel(selectedProperty.category)}
                  </span>

                  <h2
                    id="property-modal-title"
                    className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight pr-10"
                  >
                    {selectedProperty.name}
                  </h2>

                  <div className="flex items-start gap-2 mb-6 text-gray-600">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedProperty.location}, {selectedProperty.province}
                      </p>
                      <p className="text-sm text-gray-500">
                        SOCCSKSARGEN Region
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <Ruler className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Land Area
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        {selectedProperty.areaFormatted}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-primary mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          {selectedProperty.category === "industrial-zone"
                            ? "PEZA Declaration"
                            : "Portfolio"}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 leading-snug">
                        {selectedProperty.peazaDeclarationDate}
                      </p>
                    </div>
                  </div>

                  <p className="text-base text-gray-700 leading-relaxed mb-6">
                    {selectedProperty.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
                      Key Highlights
                    </h3>
                    <ul className="space-y-2.5">
                      {getPropertyFeatures(selectedProperty).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 space-y-3 shrink-0">
                  <Link
                    to="/contact"
                    onClick={() => setSelectedProperty(null)}
                    className="block w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-xl text-center transition-colors duration-200 shadow-md"
                  >
                    Inquire About This Property
                  </Link>
                  <button
                    type="button"
                    onClick={(e) =>
                      openMapLocation(
                        e,
                        selectedProperty.coordinates?.lat ?? 6.2238,
                        selectedProperty.coordinates?.lng ?? 125.0682,
                        selectedProperty.name,
                      )
                    }
                    className="w-full border border-slate-200 hover:border-primary text-gray-800 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                    View on Map
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PropertyGrid;
