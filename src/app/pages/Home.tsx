import { ArrowRight, TrendingUp, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop"
            alt="Aerial view of industrial zone"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontWeight: 700, lineHeight: 1.2 }}>
            Empowering Economic Growth<br />in SOCCSKSARGEN
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Premier economic zones and industrial real estate solutions
          </p>
          <Link
            to="/leasing"
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg"
            style={{ fontWeight: 600 }}
          >
            Explore Leasing Opportunities
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Quick Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-[#ecfdf5] to-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#059669] rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl mb-2 text-[#059669]" style={{ fontWeight: 700 }}>500+</div>
              <div className="text-gray-600">Total Hectares</div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-[#ecfdf5] to-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#84cc16] rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl mb-2 text-[#059669]" style={{ fontWeight: 700 }}>150+</div>
              <div className="text-gray-600">Active Locators</div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-[#ecfdf5] to-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#059669] rounded-full mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl mb-2 text-[#059669]" style={{ fontWeight: 700 }}>25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Economic Zones */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Featured Economic Zones</h2>
            <p className="text-xl text-gray-600">Strategic locations for your business growth</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'SRC Calumpang',
                description: 'Prime location in General Santos City with excellent logistics access',
                image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
                area: '120 hectares'
              },
              {
                title: 'Cannery Site',
                description: 'Established zone in Polomolok with complete infrastructure',
                image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=600&fit=crop',
                area: '180 hectares'
              },
              {
                title: 'Allah Valley',
                description: 'Emerging economic zone with agricultural focus',
                image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
                area: '150 hectares'
              },
              {
                title: 'Upper Klinan',
                description: 'Strategic industrial park with modern facilities',
                image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&h=600&fit=crop',
                area: '95 hectares'
              }
            ].map((zone, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden">
                  <ImageWithFallback
                    src={zone.image}
                    alt={zone.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>{zone.title}</h3>
                  <p className="text-sm text-[#059669] mb-3" style={{ fontWeight: 500 }}>{zone.area}</p>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{zone.description}</p>
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 text-[#059669] hover:text-[#047857] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners & Locators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Trusted Partners & Locators</h2>
            <p className="text-lg text-gray-600">Industry leaders who trust our economic zones</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="flex items-center justify-center h-24 px-8 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl text-gray-800" style={{ fontWeight: 700 }}>DOLE Philippines</span>
            </div>
            <div className="flex items-center justify-center h-24 px-8 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl text-[#059669]" style={{ fontWeight: 700 }}>PEZA</span>
            </div>
            <div className="flex items-center justify-center h-24 px-8 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xl text-gray-700" style={{ fontWeight: 600 }}>General Milling Corporation</span>
            </div>
            <div className="flex items-center justify-center h-24 px-8 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-xl text-gray-700" style={{ fontWeight: 600 }}>Century Pacific Food Inc.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
