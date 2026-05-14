import { useState } from 'react';
import { Building2, Download, FileText, ClipboardList, MapPin, Key, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import {
  leasingCtaSection,
  leasingDownloadSection,
  leasingFilterCategories,
  leasingListings,
  leasingListingsSection,
  leasingPageHero,
  leasingProcessSection,
  leasingProcessSteps,
  type LeasingProcessIcon,
} from '@/data/leasing';

const processIconComponents: Record<LeasingProcessIcon, typeof FileText> = {
  file: FileText,
  map: MapPin,
  clipboard: ClipboardList,
  key: Key,
};

export function Leasing() {
  const [filter, setFilter] = useState<string>('All');

  const filteredListings =
    filter === 'All' ? leasingListings : leasingListings.filter((listing) => listing.type === filter);

  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            {leasingPageHero.title}
          </h1>
          <p className="text-xl text-gray-100">{leasingPageHero.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl mb-6 text-center text-gray-900" style={{ fontWeight: 700 }}>
              {leasingListingsSection.title}
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {leasingFilterCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    filter === category ? 'bg-[#059669] text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StaggerContainer className="contents">
              {filteredListings.map((listing) => (
              <StaggerItem key={listing.id}>
              <div key={listing.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden relative">
                  <ImageWithFallback
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#84cc16] text-white px-3 py-1 rounded-full text-sm" style={{ fontWeight: 600 }}>
                    {listing.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>
                    {listing.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4 text-[#059669]" />
                      <span>{listing.area}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-[#059669]" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Key className="w-4 h-4 text-[#059669]" />
                      <span>{listing.condition}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-[#059669]" style={{ fontWeight: 600 }}>
                      {listing.price}
                    </span>
                    <button type="button" className="text-[#059669] hover:text-[#047857] flex items-center gap-1" style={{ fontWeight: 600 }}>
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
              {leasingProcessSection.title}
            </h2>
            <p className="text-xl text-gray-600">{leasingProcessSection.subtitle}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {leasingProcessSteps.map((process, index) => {
              const Icon = processIconComponents[process.icon];
              return (
              <StaggerItem key={process.step}>
                  <div className="bg-white p-8 rounded-xl shadow-lg text-center h-full">
                    <div className="text-[#84cc16] text-5xl mb-4 opacity-20" style={{ fontWeight: 900 }}>
                      {process.step}
                    </div>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#059669] rounded-full mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>
                      {process.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{process.description}</p>
                  </div>

                  {index < leasingProcessSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-[#84cc16]" />
                    </div>
                  )}
                </div>
              </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <seFadeInon className="py-20 bg-gradient-to-br from-[#059669] to-[#047857]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Download className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>
            {leasingDownloadSection.title}
          </h2>
          <p className="text-xl text-gray-100 mb-8">{leasingDownloadSection.body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#059669] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span style={{ fontWeight: 600 }}>{leasingDownloadSection.brochureLabel}</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 bg-[#84cc16] text-white px-8 py-4 rounded-lg hover:bg-[#65a30d] transition-colors shadow-lg"
            >
              <FileText className="w-5 h-5" />
              <span style={{ fontWeight: 600 }}>{leasingDownloadSection.rateSheetLabel}</span>
            </button>
          </div>
        </FadeIn>
      </section>

      <section className="py-16 bg-white">
        <FadeIn className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
            {leasingCtaSection.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">{leasingCtaSection.body}</p>
          <Link
            to={leasingCtaSection.buttonPath}
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg"
            style={{ fontWeight: 600 }}
          >
            {leasingCtaSection.buttonLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
