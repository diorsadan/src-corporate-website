import { Target, Eye } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { images } from '@/constants/images';
import {
  aboutPageHero,
  companyProfile,
  leadershipSection,
  milestones,
  milestonesSection,
  visionMission,
} from '@/data/about';
import { teamMembers } from '@/data/team';

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl mb-6 text-gray-900" style={{ fontWeight: 700 }}>
                {companyProfile.title}
              </h2>
              {companyProfile.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-gray-700 mb-4 last:mb-0 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src={images.about.company}
                alt="Corporate office building"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#059669]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#059669] rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>
                  {visionMission.vision.title}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">{visionMission.vision.body}</p>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#84cc16]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#84cc16] rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>
                  {visionMission.mission.title}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">{visionMission.mission.body}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
              {leadershipSection.title}
            </h2>
            <p className="text-xl text-gray-600">{leadershipSection.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl mb-1 text-gray-900" style={{ fontWeight: 600 }}>
                  {member.name}
                </h3>
                <p className="text-[#059669]" style={{ fontWeight: 500 }}>
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900" style={{ fontWeight: 700 }}>
              {milestonesSection.title}
            </h2>
            <p className="text-xl text-gray-600">{milestonesSection.subtitle}</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#059669]" />

            {milestones.map((milestone, index) => (
              <div
                key={milestone.year + milestone.title}
                className={`relative mb-12 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="inline-block bg-[#059669] text-white px-4 py-1 rounded-full mb-3" style={{ fontWeight: 600 }}>
                      {milestone.year}
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900" style={{ fontWeight: 600 }}>
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#84cc16] border-4 border-white rounded-full shadow" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
