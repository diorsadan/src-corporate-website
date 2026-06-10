/**
 * Official Sarangani Resources Corporation leadership & operations roster.
 * Image assets live in public/assets/team/ (kebab-case filenames).
 */

/** Side-by-side company profile image (About page) */
export const TEAM_PROFILE_PHOTO = "/assets/team/team1.jpg" as const;

/** Widescreen group portrait banner beneath Vision & Mission (About page) */
export const TEAM_GROUP_PHOTO = "/assets/team/team2.jpg" as const;

/** Development-safe fallback when team photos are not yet uploaded */
export const TEAM_PHOTO_FALLBACK =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" as const;

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Atty. Rene Ruel B. Almero",
    role: "President",
    image: "/assets/team/atty-rene-ruel-b-almero.jpg",
    quote:
      "I am dedicated to ensuring SRC remains a pillar of economic growth and sustainable development in SOCCSKSARGEN.",
  },
  {
    name: "Nicolas M. Ledesma",
    role: "HR Manager / Office Administrator",
    image: "/assets/team/nicolas-m-ledesma.jpg",
    quote:
      "Our people are SRC's greatest asset—building a culture of excellence, integrity, and service across every department.",
  },
  {
    name: "Eunice B. Capulso",
    role: "Accountant",
    image: "/assets/team/eunice-c-jaranilla.jpg",
    quote:
      "Transparent, disciplined financial stewardship is how we earn the trust of investors, partners, and the communities we serve.",
  },
  {
    name: "Mary Grace B. Disca",
    role: "Liaison Officer II",
    image: "/assets/team/mary-grace-b-disca.jpg",
    quote:
      "Strong relationships with government and local stakeholders keep SRC's economic zones connected to the region's aspirations.",
  },
  {
    name: "Ronel Alao",
    role: "Messenger / Driver / Utility",
    image: "/assets/team/ronel-alao.jpg",
    quote:
      "Reliable day-to-day operations behind the scenes let our leadership focus on delivering world-class facilities for locators.",
  },
  {
    name: "Naomi Castardo",
    role: "Accounting Assistant",
    image: "/assets/team/naomi-castardo.jpg",
    quote:
      "Precision in every figure supports SRC's mission to grow responsibly and accountably as South Cotabato's premier developer.",
  },
] as const;

export type TeamMemberEntry = (typeof teamMembers)[number];
