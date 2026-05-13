import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    contactNumber: '',
    inquiryType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      contactNumber: '',
      inquiryType: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>Contact Us</h1>
          <p className="text-xl text-gray-100">We're here to help you find the perfect space for your business</p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <h2 className="text-3xl mb-6 text-gray-900" style={{ fontWeight: 700 }}>Send Us an Inquiry</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block mb-2 text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="Juan Dela Cruz"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block mb-2 text-gray-700">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="Your Company Inc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="you@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="contactNumber" className="block mb-2 text-gray-700">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                        placeholder="+63 912 345 6789"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiryType" className="block mb-2 text-gray-700">
                      Nature of Inquiry <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent bg-white"
                    >
                      <option value="">Select inquiry type...</option>
                      <option value="leasing">Commercial Leasing Inquiry</option>
                      <option value="investment">Investment Opportunity</option>
                      <option value="peza">PEZA Registration Assistance</option>
                      <option value="site-visit">Site Visit Request</option>
                      <option value="partnership">Partnership Proposal</option>
                      <option value="general">General Information</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-gray-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    <Send className="w-5 h-5" />
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Leasing Department */}
              <div className="bg-gradient-to-br from-[#059669] to-[#047857] text-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Leasing Department</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Direct Line</p>
                      <p className="text-gray-100">+63 83 228 8766</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Email</p>
                      <p className="text-gray-100">leasing@saranganiresources.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Business Hours</p>
                      <p className="text-gray-100">Mon-Fri: 8:00 AM - 5:00 PM</p>
                      <p className="text-gray-100">Sat: 9:00 AM - 12:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PEZA Customs */}
              <div className="bg-white border-2 border-[#059669] rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl mb-6 text-gray-900" style={{ fontWeight: 700 }}>PEZA Customs Office</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0 text-[#059669]" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Direct Line</p>
                      <p>+63 83 552 7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-[#059669]" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Email</p>
                      <p>customs@src-peza.gov.ph</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-[#059669]" />
                    <div>
                      <p style={{ fontWeight: 600 }}>Office Hours</p>
                      <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Our Locations</h2>
            <p className="text-xl text-gray-600">Visit our offices across SOCCSKSARGEN</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Polomolok Headquarters */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-[#059669] mx-auto mb-4" />
                  <p className="text-gray-600">Google Maps Embed</p>
                  <p className="text-sm text-gray-500">Interactive map would appear here</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>Polomolok Headquarters</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <span style={{ fontWeight: 600 }}>Sarangani Resources Corporation</span><br />
                    National Highway, Cannery Site<br />
                    Polomolok, South Cotabato 9504<br />
                    Philippines
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#059669]" />
                      <span>+63 83 228 8766</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#059669]" />
                      <span>info@saranganiresources.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* General Santos Office */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-[#059669] mx-auto mb-4" />
                  <p className="text-gray-600">Google Maps Embed</p>
                  <p className="text-sm text-gray-500">Interactive map would appear here</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>General Santos Office</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <span style={{ fontWeight: 600 }}>SRC Calumpang Economic Zone</span><br />
                    Calumpang, General Santos City<br />
                    South Cotabato 9500<br />
                    Philippines
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#059669]" />
                      <span>+63 83 552 1234</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#059669]" />
                      <span>calumpang@saranganiresources.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
