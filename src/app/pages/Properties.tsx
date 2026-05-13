import { MapPin, Zap, Droplet, Wifi, Shield, Truck, Factory } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { images } from '../../constants/images';

export function Properties() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>Our Properties</h1>
          <p className="text-xl text-gray-100">Strategic economic zones across SOCCSKSARGEN</p>
        </div>
      </section>

      {/* Interactive Map Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Zone Locations</h2>
            <p className="text-xl text-gray-600">Strategically positioned across South Cotabato and General Santos</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8 shadow-lg">
            <div className="relative h-[500px] bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={images.maps.soccskargenOverview}
                alt="Map of SOCCSKSARGEN region"
                className="h-full w-full object-cover opacity-60"
              />

              {/* Map Pins */}
              <div className="absolute top-1/4 left-1/3 group">
                <div className="relative">
                  <MapPin className="w-12 h-12 text-[#059669] fill-[#84cc16] drop-shadow-lg animate-bounce" />
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm" style={{ fontWeight: 600 }}>SRC Calumpang</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/4 group">
                <div className="relative">
                  <MapPin className="w-12 h-12 text-[#059669] fill-[#84cc16] drop-shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm" style={{ fontWeight: 600 }}>Cannery Site</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-2/3 left-1/2 group">
                <div className="relative">
                  <MapPin className="w-12 h-12 text-[#059669] fill-[#84cc16] drop-shadow-lg animate-bounce" style={{ animationDelay: '0.4s' }} />
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm" style={{ fontWeight: 600 }}>Allah Valley</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/3 right-1/3 group">
                <div className="relative">
                  <MapPin className="w-12 h-12 text-[#059669] fill-[#84cc16] drop-shadow-lg animate-bounce" style={{ animationDelay: '0.6s' }} />
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm" style={{ fontWeight: 600 }}>Upper Klinan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zone Details - SRC Calumpang */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block bg-[#059669] text-white px-4 py-2 rounded-lg mb-4" style={{ fontWeight: 600 }}>
                PEZA-Registered Economic Zone
              </div>
              <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>SRC Calumpang</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Located in General Santos City, SRC Calumpang is our flagship economic zone offering premium industrial and commercial spaces. With direct access to the General Santos International Airport and seaport, this zone provides unparalleled logistics advantages.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Factory className="w-6 h-6 text-[#059669]" />
                  <div>
                    <span className="text-gray-600">Total Land Area:</span>
                    <span className="ml-2" style={{ fontWeight: 600 }}>120 hectares</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#059669]" />
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2" style={{ fontWeight: 600 }}>General Santos City</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#059669]" />
                  <div>
                    <span className="text-gray-600">Focus:</span>
                    <span className="ml-2" style={{ fontWeight: 600 }}>Manufacturing, Logistics, Export Processing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src={images.properties.calumpang.thumbnail}
                alt="SRC Calumpang aerial view"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sarangani Economic Development Zone (Cannery) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="rounded-lg overflow-hidden shadow-xl order-2 lg:order-1">
              <ImageWithFallback
                src={images.properties.cannery.thumbnail}
                alt="Cannery Site"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#059669] text-white px-4 py-2 rounded-lg mb-4" style={{ fontWeight: 600 }}>
                PEZA-Registered Economic Zone
              </div>
              <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Sarangani Economic Development Zone</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our historic Cannery Site in Polomolok represents decades of industrial excellence. This fully-developed zone features complete infrastructure and is home to major food processing and manufacturing companies.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Factory className="w-6 h-6 text-[#059669]" />
                  <div>
                    <span className="text-gray-600">Total Land Area:</span>
                    <span className="ml-2" style={{ fontWeight: 600 }}>180 hectares</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-[#059669]" />
                  <div>
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2" style={{ fontWeight: 600 }}>Polomolok, South Cotabato</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-[#059669]" />
                  <div>
                    <span className="text-gray-600">Focus:</span>
                    <span className="ml-2" style={{ fontWeight: 600 }}>Food Processing, Agro-Industrial, Manufacturing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Allah Valley & Upper Klinan - Side by Side */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Allah Valley */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64">
                <ImageWithFallback
                  src={images.properties.allahValley.thumbnail}
                  alt="Allah Valley"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="inline-block bg-[#84cc16] text-white px-3 py-1 rounded mb-3 text-sm" style={{ fontWeight: 600 }}>
                  Emerging Zone
                </div>
                <h3 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Allah Valley Economic Zone</h3>
                <p className="text-gray-700 mb-4">
                  Focused on agricultural and agro-industrial development with modern facilities for food processing and agricultural exports.
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Area:</span> <span style={{ fontWeight: 600 }}>150 hectares</span></p>
                  <p><span className="text-gray-600">Location:</span> <span style={{ fontWeight: 600 }}>Allah Valley, Cotabato</span></p>
                </div>
              </div>
            </div>

            {/* Upper Klinan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64">
                <ImageWithFallback
                  src={images.properties.upperKlinan.thumbnail}
                  alt="Upper Klinan"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="inline-block bg-[#84cc16] text-white px-3 py-1 rounded mb-3 text-sm" style={{ fontWeight: 600 }}>
                  Modern Industrial Park
                </div>
                <h3 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Upper Klinan Industrial Park</h3>
                <p className="text-gray-700 mb-4">
                  State-of-the-art industrial park with modern infrastructure designed for advanced manufacturing and technology companies.
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Area:</span> <span style={{ fontWeight: 600 }}>95 hectares</span></p>
                  <p><span className="text-gray-600">Location:</span> <span style={{ fontWeight: 600 }}>South Cotabato</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Utilities & Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>World-Class Infrastructure</h2>
            <p className="text-xl text-gray-600">Complete utilities and security for your operations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Zap, label: 'Reliable Power', color: '#059669' },
              { icon: Droplet, label: 'Water Supply', color: '#059669' },
              { icon: Wifi, label: 'Fiber Internet', color: '#059669' },
              { icon: Shield, label: '24/7 Security', color: '#059669' },
              { icon: Truck, label: 'Logistics Access', color: '#84cc16' },
              { icon: Factory, label: 'Industrial Facilities', color: '#84cc16' }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <p className="text-sm" style={{ fontWeight: 600 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Property Gallery</h2>
            <p className="text-xl text-gray-600">Explore our facilities and infrastructure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.gallery.propertyShowcase.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
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
