import { CheckCircle, TrendingUp, Ship, Award, Briefcase, DollarSign, FileText, Building } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Resources() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>Investor & Locator Resources</h1>
          <p className="text-xl text-gray-100">Everything you need to succeed in SOCCSKSARGEN</p>
        </div>
      </section>

      {/* Why Choose SOCCSKSARGEN */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Why Choose SOCCSKSARGEN</h2>
            <p className="text-xl text-gray-600">Strategic advantages for your business operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>Economic Stability</h3>
                    <p className="text-gray-600">Region XII demonstrates consistent GDP growth driven by agriculture, manufacturing, and services sectors. Political stability and pro-business governance create a favorable investment climate.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <Ship className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>Superior Logistics</h3>
                    <p className="text-gray-600">Direct access to General Santos International Seaport and Airport. Strategic location connects to major Philippine and ASEAN markets with efficient transportation networks.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>Skilled Workforce</h3>
                    <p className="text-gray-600">Access to educated, English-speaking workforce from regional universities and technical schools. Competitive labor costs with high productivity and strong work ethic.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>Quality of Life</h3>
                    <p className="text-gray-600">Lower cost of living compared to Metro Manila. Safe communities, modern amenities, excellent schools, and proximity to beaches and natural attractions for work-life balance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=800&fit=crop"
                alt="Business growth"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PEZA Incentives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#059669] text-white px-6 py-2 rounded-full mb-4" style={{ fontWeight: 600 }}>
              PEZA-Registered Zones
            </div>
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>PEZA Incentives & Benefits</h2>
            <p className="text-xl text-gray-600">Maximize your investment returns with government-backed incentives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>Income Tax Holiday (ITH)</h3>
                  <p className="text-gray-600 mb-4">
                    Enjoy 4-7 years of income tax exemption depending on your pioneer or non-pioneer status. This substantial benefit allows you to reinvest profits and accelerate business growth during critical early years.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>6 years for pioneer enterprises</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>4 years for non-pioneer enterprises</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>5% Special Tax Rate</h3>
                  <p className="text-gray-600 mb-4">
                    After the ITH period, pay only 5% tax on gross income earned in lieu of all national and local taxes. This preferential rate is significantly lower than standard corporate income tax.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>Replaces 25% regular corporate income tax</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>Exemption from local business taxes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>VAT Zero-Rating</h3>
                  <p className="text-gray-600 mb-4">
                    Zero-rated VAT on local purchases of goods, services, and leases. This improves cash flow and reduces administrative burden for export-oriented businesses.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>Zero VAT on purchases for export production</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>Streamlined VAT refund processing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>Duty-Free Import</h3>
                  <p className="text-gray-600 mb-4">
                    Import raw materials, capital equipment, and supplies duty-free when used for production of export goods. Significant cost savings on international procurement.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>Exemption from customs duties</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                      <span>Tax-free importation of machinery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#059669] to-[#047857] p-8 rounded-xl text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>Additional Benefits</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Simplified import/export procedures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Employment of foreign nationals (up to 5%)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Tax and duty-free purchases from customs bonded warehouses</span>
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <button className="bg-white text-[#059669] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg" style={{ fontWeight: 600 }}>
                  Download PEZA Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEZA Customs Office */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#059669] rounded-xl p-10 shadow-xl">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-[#059669] rounded-lg flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Joint PEZA Customs Office</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our economic zones feature an on-site Joint PEZA Customs Office, providing seamless customs clearance and trade facilitation services. This dedicated facility ensures faster processing of imports and exports, reducing delays and administrative burdens for our locators.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg mb-3 text-gray-900" style={{ fontWeight: 600 }}>Services Offered:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" />
                        <span>Import/Export documentation processing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" />
                        <span>Customs clearance and inspection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" />
                        <span>Bonded warehouse supervision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#059669] mt-0.5 flex-shrink-0" />
                        <span>Trade compliance advisory</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg mb-3 text-gray-900" style={{ fontWeight: 600 }}>Office Hours:</h4>
                    <p className="text-gray-700 mb-4">Monday - Friday: 8:00 AM - 5:00 PM</p>

                    <h4 className="text-lg mb-3 text-gray-900" style={{ fontWeight: 600 }}>Contact:</h4>
                    <p className="text-gray-700">
                      Phone: +63 83 552 7890<br />
                      Email: customs@src-peza.gov.ph
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Ready to Invest in SOCCSKSARGEN?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our team is here to guide you through PEZA registration and help you maximize available incentives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg"
              style={{ fontWeight: 600 }}
            >
              Schedule a Consultation
            </a>
            <button className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#059669] text-[#059669] hover:bg-gray-50 px-8 py-4 rounded-lg transition-colors">
              <FileText className="w-5 h-5" />
              <span style={{ fontWeight: 600 }}>Download Investment Guide</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
