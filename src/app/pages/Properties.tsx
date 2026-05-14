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
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { images } from "@/constants/images";
import {
  propertyCompactZones,
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              {propertyMapSection.title}
            </h2>
            <p className="text-xl text-gray-600">
              {propertyMapSection.subtitle}
            </p>
          </FadeIn>

          <div className="bg-gray-100 rounded-xl p-8 shadow-lg">
            <div className="relative h-[500px] bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={images.maps.soccskargenOverview}
                alt="Map of SOCCSKSARGEN region"
                className="h-full w-full object-cover opacity-60"
              />

              {propertyMapPins.map((pin) => (
                <div key={pin.label} className={pin.containerClass}>
                  <div className="relative">
                    <MapPin
                      className="w-12 h-12 text-[#059669] fill-[#84cc16] drop-shadow-lg animate-bounce"
                      style={
                        pin.animationDelay
                          ? { animationDelay: pin.animationDelay }
                          : undefined
                      }
                    />
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm" style={{ fontWeight: 600 }}>
                        {pin.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {propertySplitZones.map((zone) => (
        <section key={zone.id} className={`py-16 ${zone.sectionClass}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {zone.imageFirstOnLarge ? (
                <>
                  <div className="rounded-lg overflow-hidden shadow-xl order-2 lg:order-1">
                    <ImageWithFallback
                      src={zone.image}
                      alt={zone.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <div
                      className="inline-block bg-[#059669] text-white px-4 py-2 rounded-lg mb-4"
                      style={{ fontWeight: 600 }}
                    >
                      {zone.badgeText}
                    </div>
                    <h2
                      className="text-4xl mb-4 text-gray-900"
                      style={{ fontWeight: 700 }}
                    >
                      {zone.title}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {zone.description}
                    </p>
                    <div className="space-y-4">
                      {zone.stats.map((row) => {
                        const Icon = statIconMap[row.icon];
                        return (
                          <div
                            key={row.label}
                            className="flex items-center gap-3"
                          >
                            <Icon className="w-6 h-6 text-[#059669]" />
                            <div>
                              <span className="text-gray-600">{row.label}</span>
                              <span
                                className="ml-2"
                                style={{ fontWeight: 600 }}
                              >
                                {row.value}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div
                      className="inline-block bg-[#059669] text-white px-4 py-2 rounded-lg mb-4"
                      style={{ fontWeight: 600 }}
                    >
                      {zone.badgeText}
                    </div>
                    <h2
                      className="text-4xl mb-4 text-gray-900"
                      style={{ fontWeight: 700 }}
                    >
                      {zone.title}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {zone.description}
                    </p>
                    <div className="space-y-4">
                      {zone.stats.map((row) => {
                        const Icon = statIconMap[row.icon];
                        return (
                          <div
                            key={row.label}
                            className="flex items-center gap-3"
                          >
                            <Icon className="w-6 h-6 text-[#059669]" />
                            <div>
                              <span className="text-gray-600">{row.label}</span>
                              <span
                                className="ml-2"
                                style={{ fontWeight: 600 }}
                              >
                                {row.value}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={zone.image}
                      alt={zone.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {propertyCompactZones.map((zone) => (
              <StaggerItem key={zone.id}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-64">
                    <ImageWithFallback
                      src={zone.image}
                      alt={zone.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div
                      className="inline-block bg-[#84cc16] text-white px-3 py-1 rounded mb-3 text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      {zone.badgeText}
                    </div>
                    <h3
                      className="text-3xl mb-4 text-gray-900"
                      style={{ fontWeight: 700 }}
                    >
                      {zone.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{zone.description}</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-gray-600">Area:</span>{" "}
                        <span style={{ fontWeight: 600 }}>{zone.areaLine}</span>
                      </p>
                      <p>
                        <span className="text-gray-600">Location:</span>{" "}
                        <span style={{ fontWeight: 600 }}>
                          {zone.locationLine}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              {propertyInfrastructureSection.title}
            </h2>
            <p className="text-xl text-gray-600">
              {propertyInfrastructureSection.subtitle}
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyInfrastructureFeatures.map((item) => {
              const Icon = infrastructureIconMap[item.icon];
              return (
                <div
                  key={item.label}
                  className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: item.color }} />
                  </div>
                  <p className="text-sm" style={{ fontWeight: 600 }}>
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              {propertyGallerySection.title}
            </h2>
            <p className="text-xl text-gray-600">
              {propertyGallerySection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.gallery.propertyShowcase.map((image, index) => (
              <div
                key={image}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Property image ${index + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
