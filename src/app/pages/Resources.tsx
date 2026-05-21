"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  TrendingUp,
  Ship,
  Award,
  Briefcase,
  DollarSign,
  FileText,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import { PropertyImageCarousel } from "@/components/common/PropertyImageCarousel";
import { images } from "@/constants/images";

const carouselImagePaths = [
  "/images/soccsksargen/1.jpg",
  "/images/soccsksargen/2.jpg",
  "/images/soccsksargen/3.jpg",
  "/images/soccsksargen/4.jpg",
  "/images/soccsksargen/5.jpg",
  "/images/soccsksargen/6.jpg",
];

export function Resources() {
  return (
    <div>
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            Investor & Locator Resources
          </h1>
          <p className="text-xl text-gray-100">
            Everything you need to succeed in SOCCSKSARGEN
          </p>
        </div>
      </section>

      {/* Why Choose SOCCSKSARGEN */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              Why Choose SOCCSKSARGEN
            </h2>
            <p className="text-xl text-gray-600">
              Strategic advantages for your business operations
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 text-gray-900"
                      style={{ fontWeight: 600 }}
                    >
                      Economic Stability
                    </h3>
                    <p className="text-gray-600">
                      Region XII demonstrates consistent GDP growth driven by
                      agriculture, manufacturing, and services sectors.
                      Political stability and pro-business governance create a
                      favorable investment climate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <Ship className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 text-gray-900"
                      style={{ fontWeight: 600 }}
                    >
                      Superior Logistics
                    </h3>
                    <p className="text-gray-600">
                      Direct access to General Santos International Seaport and
                      Airport. Strategic location connects to major Philippine
                      and ASEAN markets with efficient transportation networks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 text-gray-900"
                      style={{ fontWeight: 600 }}
                    >
                      Skilled Workforce
                    </h3>
                    <p className="text-gray-600">
                      Access to educated, English-speaking workforce from
                      regional universities and technical schools. Competitive
                      labor costs with high productivity and strong work ethic.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#059669] rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl mb-2 text-gray-900"
                      style={{ fontWeight: 600 }}
                    >
                      Quality of Life
                    </h3>
                    <p className="text-gray-600">
                      Lower cost of living compared to Metro Manila. Safe
                      communities, modern amenities, excellent schools, and
                      proximity to beaches and natural attractions for work-life
                      balance.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <div className="w-full rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <PropertyImageCarousel
                images={carouselImagePaths}
                alt="SOCCSKSARGEN investor showcase"
                heightClass="h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PEZA Incentives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <div
              className="inline-block bg-[#059669] text-white px-6 py-2 rounded-full mb-4"
              style={{ fontWeight: 600 }}
            >
              PEZA-Registered Zones
            </div>
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              PEZA Incentives & Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Maximize your investment returns with government-backed incentives
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-2xl mb-2 text-gray-900"
                    style={{ fontWeight: 600 }}
                  >
                    Income Tax Holiday (ITH)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enjoy 4-7 years of income tax exemption depending on your
                    pioneer or non-pioneer status. This substantial benefit
                    allows you to reinvest profits and accelerate business
                    growth during critical early years.
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
            </StaggerItem>

            <StaggerItem className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-2xl mb-2 text-gray-900"
                    style={{ fontWeight: 600 }}
                  >
                    5% Special Tax Rate
                  </h3>
                  <p className="text-gray-600 mb-4">
                    After the ITH period, pay only 5% tax on gross income earned
                    in lieu of all national and local taxes. This preferential
                    rate is significantly lower than standard corporate income
                    tax.
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
            </StaggerItem>

            <StaggerItem className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-2xl mb-2 text-gray-900"
                    style={{ fontWeight: 600 }}
                  >
                    VAT Zero-Rating
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Zero-rated VAT on local purchases of goods, services, and
                    leases. This improves cash flow and reduces administrative
                    burden for export-oriented businesses.
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
            </StaggerItem>

            <StaggerItem className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className="text-2xl mb-2 text-gray-900"
                    style={{ fontWeight: 600 }}
                  >
                    Duty-Free Import
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Import raw materials, capital equipment, and supplies
                    duty-free when used for production of export goods.
                    Significant cost savings on international procurement.
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
            </StaggerItem>
          </StaggerContainer>

          <FadeIn
            delay={0.15}
            className="mt-12 bg-gradient-to-br from-[#059669] to-[#047857] p-8 rounded-xl text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
                  Additional Benefits
                </h3>
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
                    <span>
                      Tax and duty-free purchases from customs bonded warehouses
                    </span>
                  </li>
                </ul>
              </div>
              <div className="text-center md:text-right">
                <motion.a
                  href="/PEZA GUIDELINES.pdf"
                  download="PEZA GUIDELINES.pdf"
                  className="inline-flex items-center justify-center bg-white text-[#059669] px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                  style={{ fontWeight: 600 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 350,
                    damping: 35,
                  }}
                >
                  Download PEZA Guide
                </motion.a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
