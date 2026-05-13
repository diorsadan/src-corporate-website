import { useState } from 'react';
import { Building2, Download, FileText, ClipboardList, MapPin, Key, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { images } from '../../constants/images';

export function Leasing() {
  const [filter, setFilter] = useState('All');

  const listings = [
    {
      id: 1,
      type: 'Retail',
      title: 'Prime Retail Space - Calumpang',
      area: '250 sqm',
      location: 'SRC Calumpang, General Santos City',
      condition: 'Bare Shell',
      image: images.leasing.listingCalumpangRetail,
      price: 'Contact for Pricing'
    },
    {
      id: 2,
      type: 'Corporate',
      title: 'Corporate Office Building',
      area: '1,200 sqm',
      location: 'Cannery Site, Polomolok',
      condition: 'Semi-Fitted',
      image: images.leasing.listingCanneryCorporate,
      price: 'Contact for Pricing'
    },
    {
      id: 3,
      type: 'Warehouse',
      title: 'Industrial Warehouse',
      area: '3,500 sqm',
      location: 'SRC Calumpang, General Santos City',
      condition: 'Bare Shell',
      image: images.leasing.listingCalumpangWarehouse,
      price: 'Contact for Pricing'
    },
    {
      id: 4,
      type: 'Dining',
      title: 'Restaurant Space',
      area: '180 sqm',
      location: 'SRC Calumpang, General Santos City',
      condition: 'Semi-Fitted',
      image: images.leasing.listingCalumpangDining,
      price: 'Contact for Pricing'
    },
    {
      id: 5,
      type: 'Warehouse',
      title: 'Cold Storage Facility',
      area: '2,800 sqm',
      location: 'Cannery Site, Polomolok',
      condition: 'Fully Fitted',
      image: images.leasing.listingCanneryColdStorage,
      price: 'Contact for Pricing'
    },
    {
      id: 6,
      type: 'Corporate',
      title: 'Modern Office Complex',
      area: '850 sqm',
      location: 'Upper Klinan Industrial Park',
      condition: 'Fully Fitted',
      image: images.leasing.listingUpperKlinanOffice,
      price: 'Contact for Pricing'
    }
  ];

  const filteredListings = filter === 'All' ? listings : listings.filter(listing => listing.type === filter);

  return (
    <div>
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>Commercial Leasing</h1>
          <p className="text-xl text-gray-100">Discover your ideal business space in our economic zones</p>
        </div>
      </section>

      {/* Available Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl mb-6 text-center text-gray-900" style={{ fontWeight: 700 }}>Available Spaces</h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {['All', 'Retail', 'Dining', 'Corporate', 'Warehouse'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    filter === category
                      ? 'bg-[#059669] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => (
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
                  <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>{listing.title}</h3>

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
                    <span className="text-[#059669]" style={{ fontWeight: 600 }}>{listing.price}</span>
                    <button className="text-[#059669] hover:text-[#047857] flex items-center gap-1" style={{ fontWeight: 600 }}>
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

      {/* Leasing Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Our Leasing Process</h2>
            <p className="text-xl text-gray-600">Simple and transparent steps to secure your space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: FileText,
                title: 'Letter of Intent',
                description: 'Submit your LOI with company details and space requirements'
              },
              {
                step: '02',
                icon: MapPin,
                title: 'Site Tripping',
                description: 'Schedule a site visit to view available properties and facilities'
              },
              {
                step: '03',
                icon: ClipboardList,
                title: 'Contract Signing',
                description: 'Review and sign the lease agreement with agreed terms'
              },
              {
                step: '04',
                icon: Key,
                title: 'Move-In',
                description: 'Receive keys and begin operations in your new space'
              }
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center h-full">
                  <div className="text-[#84cc16] text-5xl mb-4 opacity-20" style={{ fontWeight: 900 }}>
                    {process.step}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#059669] rounded-full mb-4">
                    <process.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-3 text-gray-900" style={{ fontWeight: 600 }}>{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                </div>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-[#84cc16]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
            <Download className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>Download Our Leasing Kit</h2>
          <p className="text-xl text-gray-100 mb-8">
            Get detailed information about our properties, rates, and terms in our comprehensive corporate brochure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-3 bg-white text-[#059669] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              <Download className="w-5 h-5" />
              <span style={{ fontWeight: 600 }}>Download Corporate Brochure</span>
            </button>
            <button className="inline-flex items-center justify-center gap-3 bg-[#84cc16] text-white px-8 py-4 rounded-lg hover:bg-[#65a30d] transition-colors shadow-lg">
              <FileText className="w-5 h-5" />
              <span style={{ fontWeight: 600 }}>Download Rate Sheet</span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Ready to Lease Your Space?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our leasing team is ready to assist you in finding the perfect location for your business
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg"
            style={{ fontWeight: 600 }}
          >
            Contact Leasing Department
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
