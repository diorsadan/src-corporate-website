"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  Receipt,
  Package,
  Truck,
  Users,
  FileCheck,
  Shield,
  Landmark,
  Sprout,
  Wheat,
  HandHeart,
  Fuel,
  Percent,
  Workflow,
  MapPin,
  Download,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/animations/index";
import { HoverRevealCard } from "@/components/common/HoverRevealCard";
import { useTapToToggle } from "@/hooks/useTapToToggle";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { pezaIncentivesData } from "@/data/pezaIncentives";

const fiscalIconMap = {
  TrendingUp,
  BarChart3,
  DollarSign: Receipt,
  Package,
} as const;

const operationalIconMap = {
  Truck,
  Users,
  FileCheck,
  Shield,
} as const;

const objectiveIcons = [Sprout, Wheat, HandHeart, Fuel] as const;

const additionalBenefitIcons = [Percent, Workflow, MapPin] as const;

const additionalBenefits = [
  {
    title: "Tax Incentives",
    description:
      "Enjoy income tax holidays and duty-free import privileges for PEZA-registered enterprises.",
  },
  {
    title: "Streamlined Operations",
    description:
      "Efficient customs procedures and expedited import/export processes reduce operational delays.",
  },
  {
    title: "Strategic Location",
    description:
      "Prime positioning near major ports and logistics hubs ensures optimal supply chain efficiency.",
  },
] as const;

export function PezaIncentivesSection() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { handleCardTap, isCardActive } = useTapToToggle();
  const { strategicAdvantage, fiscalIncentives, operationalBenefits } =
    pezaIncentivesData;

  return (
    <div className="w-full">
      {/* Strategic Advantage — PEZA objectives */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Landmark className="w-8 h-8 text-emerald-700 stroke-[1.25] mb-4" />
              <span className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase mb-4">
                PEZA Designation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {strategicAdvantage.title}
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
                {strategicAdvantage.description}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
            {strategicAdvantage.objectives.map((objective, index) => {
              const IconComponent = objectiveIcons[index] ?? Sprout;
              const cardId = `objective-${objective.title}`;
              return (
                <HoverRevealCard
                  key={objective.title}
                  cardId={cardId}
                  isActive={isCardActive(cardId)}
                  onCardTap={handleCardTap}
                  icon={IconComponent}
                  title={objective.title}
                >
                  <p>{objective.description}</p>
                </HoverRevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fiscal Incentives — standardized hover grid */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Receipt className="w-8 h-8 text-emerald-700 stroke-[1.25] mb-4" />
              <span className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase mb-4">
                Tax Framework
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {fiscalIncentives.title}
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
                {fiscalIncentives.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto">
            {fiscalIncentives.benefits.map((benefit) => {
              const iconKey = benefit.icon as keyof typeof fiscalIconMap;
              const IconComponent =
                fiscalIconMap[iconKey] ?? TrendingUp;
              const cardId = `fiscal-${benefit.title}`;
              return (
                <HoverRevealCard
                  key={benefit.title}
                  cardId={cardId}
                  isActive={isCardActive(cardId)}
                  onCardTap={handleCardTap}
                  icon={IconComponent}
                  title={benefit.title}
                >
                  <p>{benefit.description}</p>
                </HoverRevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operational Benefits */}
      <section className="relative py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-12">
              <Shield className="w-8 h-8 text-emerald-700 stroke-[1.25] mb-4" />
              <span className="text-xs md:text-sm font-bold text-emerald-600 tracking-widest uppercase mb-4">
                Operational Advantages
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {operationalBenefits.title}
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
                {operationalBenefits.subtitle}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
            {operationalBenefits.benefits.map((benefit) => {
              const iconKey = benefit.icon as keyof typeof operationalIconMap;
              const IconComponent =
                operationalIconMap[iconKey] ?? Shield;
              const cardId = `operational-${benefit.title}`;
              return (
                <HoverRevealCard
                  key={benefit.title}
                  cardId={cardId}
                  isActive={isCardActive(cardId)}
                  onCardTap={handleCardTap}
                  icon={IconComponent}
                  title={benefit.title}
                >
                  <p>{benefit.description}</p>
                </HoverRevealCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional PEZA Benefits — 3-column hover cards + dedicated CTA */}
      <section className="relative py-16 md:py-24 pb-20 md:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Additional PEZA Benefits
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SRC PEZA zones unlock strategic advantages designed to maximize
                operational efficiency, minimize costs, and accelerate growth for
                international enterprises.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            {additionalBenefits.map((benefit, index) => {
              const IconComponent =
                additionalBenefitIcons[index] ?? Percent;
              const cardId = `additional-${benefit.title}`;
              return (
                <HoverRevealCard
                  key={benefit.title}
                  cardId={cardId}
                  isActive={isCardActive(cardId)}
                  onCardTap={handleCardTap}
                  icon={IconComponent}
                  title={benefit.title}
                >
                  <p>{benefit.description}</p>
                </HoverRevealCard>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-10 md:p-12 text-center text-white shadow-lg"
          >
            <h3 className="text-3xl font-black mb-4">
              Ready to Explore Your Options?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Download our comprehensive PEZA guidelines or schedule a
              consultation with our team to discuss your specific business
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/PEZA_GUIDELINES.pdf"
                download="PEZA_GUIDELINES.pdf"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg w-full sm:w-auto justify-center"
              >
                <Download className="w-5 h-5" />
                Download PEZA Guide
              </motion.a>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center gap-2 border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 ease-in-out w-full sm:w-auto justify-center"
              >
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <ConsultationForm
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        source="additional-benefits-banner"
      />
    </div>
  );
}
