import { Target, Eye, Award, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>About Sarangani Resources Corporation</h1>
          <p className="text-xl text-gray-100">Building the future of economic development in SOCCSKSARGEN</p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6 text-gray-900" style={{ fontWeight: 700 }}>Our Company Profile</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Sarangani Resources Corporation (SRC) was established to spearhead economic development in the SOCCSKSARGEN region through the development and management of world-class economic zones and industrial estates. With over two decades of experience, we have become the region's premier real estate developer for export-oriented businesses.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our portfolio includes strategically located properties totaling over 500 hectares across South Cotabato and General Santos City. As a registered PEZA developer and operator, we provide comprehensive infrastructure, utilities, and support services to enable businesses to thrive in a competitive global market.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Corporate office building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#059669]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#059669] rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "To be the leading economic zone developer in Mindanao, recognized for creating sustainable industrial communities that drive regional prosperity and global competitiveness."
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#84cc16]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "To develop and manage premier economic zones that provide world-class infrastructure, attract quality investments, generate employment opportunities, and contribute to the sustainable economic development of SOCCSKSARGEN."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals driving our vision forward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Antonio D. Cruz', position: 'President & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
              { name: 'Maria L. Santos', position: 'VP - Operations & Development', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
              { name: 'Roberto P. Mendoza', position: 'VP - Commercial Leasing', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
              { name: 'Elena R. Garcia', position: 'Corporate Secretary', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
              { name: 'Carlos M. Reyes', position: 'Chief Financial Officer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
              { name: 'Patricia S. Aquino', position: 'Head - Business Development', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop' }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl mb-1 text-gray-900" style={{ fontWeight: 600 }}>{member.name}</h3>
                <p className="text-[#059669]" style={{ fontWeight: 500 }}>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Milestones Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Corporate Milestones</h2>
            <p className="text-xl text-gray-600">Our journey of growth and development</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#059669]"></div>

            {[
              { year: '1995', title: 'SRC Establishment', description: 'Sarangani Resources Corporation was founded to develop industrial real estate in SOCCSKSARGEN' },
              { year: '1998', title: 'First PEZA Declaration', description: 'SRC Cannery Site in Polomolok officially declared as a Special Economic Zone by PEZA' },
              { year: '2003', title: 'Calumpang Expansion', description: 'Launch of SRC Calumpang Economic Zone in General Santos City' },
              { year: '2010', title: 'Major Infrastructure Upgrade', description: 'Completed modernization of utilities and security systems across all zones' },
              { year: '2015', title: 'Allah Valley Development', description: 'Began development of Allah Valley Economic Zone focusing on agro-industrial businesses' },
              { year: '2020', title: 'Upper Klinan Launch', description: 'Opened Upper Klinan Industrial Park with state-of-the-art facilities' },
              { year: '2025', title: 'Sustainability Initiative', description: 'Launched green energy and sustainable development programs across all properties' }
            ].map((milestone, index) => (
              <div key={index} className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="inline-block bg-[#059669] text-white px-4 py-1 rounded-full mb-3" style={{ fontWeight: 600 }}>
                      {milestone.year}
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84cc16] border-4 border-white rounded-full shadow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
