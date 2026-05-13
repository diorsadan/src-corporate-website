import { ArrowRight, TrendingUp, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { images } from '@/constants/images';
import { featuredEconomicZones } from '@/data/properties';
import { homeFeaturedSection, homeHero, homePartnersSection, homeStats } from '@/data/statistics';
import { homePartners } from '@/data/partners';

const statIcons = {
  trending: TrendingUp,
  users: Users,
  calendar: Calendar,
} as const;

const partnerTextClass: Record<(typeof homePartners)[number]['display'], string> = {
  'text-dark': 'text-2xl text-gray-800',
  'text-emerald': 'text-2xl text-[#059669]',
  'text-muted': 'text-xl text-gray-700',
};

export function Home() {
  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0">
          <ImageWithFallback
            src={images.home.hero}
            alt="Aerial view of industrial zone"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            {homeHero.titleLine1}
            <br />
            {homeHero.titleLine2}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">{homeHero.subtitle}</p>
          <Link
            to={homeHero.ctaPath}
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg"
            style={{ fontWeight: 600 }}
          >
            {homeHero.ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeStats.map((stat) => {
              const Icon = statIcons[stat.icon];
              return (
                <div
                  key={stat.label}
                  className="text-center p-8 bg-gradient-to-br from-[#ecfdf5] to-white rounded-xl shadow-sm border border-gray-100"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${stat.iconBgClass} rounded-full mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl mb-2 text-[#059669]" style={{ fontWeight: 700 }}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
              {homeFeaturedSection.title}
            </h2>
            <p className="text-xl text-gray-600">{homeFeaturedSection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEconomicZones.map((zone, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>
                    {zone.title}
                  </h3>
                  <p className="text-sm text-[#059669] mb-3" style={{ fontWeight: 500 }}>
                    {zone.area}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{zone.description}</p>
                  <Link
                    to={homeFeaturedSection.detailsLink}
                    className="inline-flex items-center gap-2 text-[#059669] hover:text-[#047857] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    {homeFeaturedSection.detailsLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
              {homePartnersSection.title}
            </h2>
            <p className="text-lg text-gray-600">{homePartnersSection.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12">
            {homePartners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center h-24 px-8 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className={partnerTextClass[partner.display]} style={{ fontWeight: partner.display === 'text-muted' ? 600 : 700 }}>
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
