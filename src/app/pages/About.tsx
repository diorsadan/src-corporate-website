"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/index";
import {
  aboutPageHero,
  companyProfile,
  milestones,
  milestonesSection,
  visionMission,
} from "@/data/about";
import {
  TEAM_PROFILE_PHOTO,
  TEAM_GROUP_PHOTO,
  TEAM_PHOTO_FALLBACK,
} from "@/data/team";
import { TeamSection } from "@/components/sections/TeamSection";

function CompanyProfilePhoto() {
  const [src, setSrc] = useState(TEAM_PROFILE_PHOTO);

  useEffect(() => {
    setSrc(TEAM_PROFILE_PHOTO);
  }, []);

  return (
    <img
      src={src}
      alt="Sarangani Resources Corporation leadership and staff"
      className="w-full h-full object-cover rounded-2xl shadow-sm min-h-[280px] lg:min-h-[360px]"
      loading="lazy"
      decoding="async"
      onError={() => {
        if (src !== TEAM_PHOTO_FALLBACK) {
          setSrc(TEAM_PHOTO_FALLBACK);
        }
      }}
    />
  );
}

function TeamGroupPortraitBanner() {
  const [src, setSrc] = useState(TEAM_GROUP_PHOTO);

  useEffect(() => {
    setSrc(TEAM_GROUP_PHOTO);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-100 my-12"
    >
      <img
        src={src}
        alt="Sarangani Resources Corporation Group Portfolio"
        className="w-full h-full object-cover object-center"
        loading="lazy"
        decoding="async"
        onError={() => {
          if (src !== TEAM_PHOTO_FALLBACK) {
            setSrc(TEAM_PHOTO_FALLBACK);
          }
        }}
      />
      <div className="absolute bottom-4 left-6 z-20 text-white font-medium text-sm drop-shadow-sm">
        Sarangani Resources Corporation — Our Team
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none"
        aria-hidden
      />
    </motion.div>
  );
}

export function About() {
  return (
    <div>
      <section className="py-20 bg-gradient-to-br from-[#059669] to-[#047857] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            {aboutPageHero.title}
          </h1>
          <p className="text-xl text-gray-100">{aboutPageHero.subtitle}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <FadeIn className="space-y-4">
              <h2
                className="text-3xl mb-6 text-gray-900"
                style={{ fontWeight: 700 }}
              >
                {companyProfile.title}
              </h2>
              {companyProfile.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-700 mb-4 last:mb-0 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </FadeIn>
            <FadeIn delay={0.15} className="h-full">
              <div className="h-full w-full overflow-hidden">
                <CompanyProfilePhoto />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#059669]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#059669] rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2
                    className="text-3xl text-gray-900"
                    style={{ fontWeight: 700 }}
                  >
                    {visionMission.vision.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  {visionMission.vision.body}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#84cc16]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#84cc16] rounded-full flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2
                    className="text-3xl text-gray-900"
                    style={{ fontWeight: 700 }}
                  >
                    {visionMission.mission.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed italic">
                  {visionMission.mission.body}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <TeamGroupPortraitBanner />
        </div>
      </section>

      <TeamSection />

      <section className="py-20 bg-gray-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2
              className="text-4xl mb-4 text-gray-900"
              style={{ fontWeight: 700 }}
            >
              {milestonesSection.title}
            </h2>
            <p className="text-xl text-gray-600">
              {milestonesSection.subtitle}
            </p>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#059669]" />

            <StaggerContainer>
              {milestones.map((milestone, index) => (
                <StaggerItem
                  key={milestone.year + milestone.title}
                  className={`relative mb-12 flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div
                        className="inline-block bg-[#059669] text-white px-4 py-1 rounded-full mb-3"
                        style={{ fontWeight: 600 }}
                      >
                        {milestone.year}
                      </div>
                      <h3
                        className="text-xl mb-2 text-gray-900"
                        style={{ fontWeight: 600 }}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84cc16] border-4 border-white rounded-full shadow" />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
