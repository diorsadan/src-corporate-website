"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { teamMembers, type TeamMember } from "@/data/team";
import { leadershipSection } from "@/data/about";
import { FadeIn } from "@/components/animations/FadeIn";

const CARD_VIEWPORT = { once: true, amount: 0.1 } as const;

const CARD_HOVER = { y: -6, boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.05)" } as const;

const CARD_SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

const HONORIFIC_PREFIX = /^(Atty\.|Dr\.|Mr\.|Ms\.|Mrs\.)\s+/i;

/** First + last significant name initials (e.g. "Atty. Rene Ruel B. Almero" → "RA"). */
function getMemberInitials(name: string): string {
  const cleaned = name.replace(HONORIFIC_PREFIX, "").trim();
  const parts = cleaned
    .split(/\s+/)
    .filter((part) => part.length > 0 && !/^[A-Z]\.?$/i.test(part));

  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return `${first}${last}`.toUpperCase();
}

interface TeamMemberAvatarProps {
  member: TeamMember;
}

function TeamMemberAvatar({ member }: TeamMemberAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getMemberInitials(member.name);

  useEffect(() => {
    setImageFailed(false);
  }, [member.image]);

  return (
    <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm bg-white">
      {imageFailed ? (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#059669] via-[#047857] to-[#065f46]"
          role="img"
          aria-label={`${member.name} profile placeholder`}
        >
          <span
            className="text-2xl font-black tracking-tight text-white select-none"
            aria-hidden
          >
            {initials}
          </span>
        </div>
      ) : (
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}

/**
 * TeamSection — Individual leadership & operations roster (group portrait lives on About page).
 */
export function TeamSection() {
  return (
    <section
      className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-slate-50/80 to-white"
      aria-labelledby="team-section-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#059669] mb-4">
            Leadership &amp; Operations
          </p>
          <h2
            id="team-section-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            {leadershipSection.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            {leadershipSection.subtitle}
          </p>
        </FadeIn>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0 mt-12">
          {teamMembers.map((member, index) => (
            <li key={member.name}>
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={CARD_VIEWPORT}
                whileHover={CARD_HOVER}
                transition={{
                  ...CARD_SPRING,
                  opacity: { duration: 0.45, ease: "easeOut" },
                  y: { duration: 0.45, ease: "easeOut", delay: index * 0.08 },
                }}
                className="h-full bg-white border border-slate-200/80 p-8 rounded-2xl text-center shadow-sm"
              >
                <TeamMemberAvatar member={member} />
                <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-emerald-600 tracking-wide mt-1">
                  {member.role}
                </p>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TeamSection;
