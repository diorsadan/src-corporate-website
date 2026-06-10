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
      "For me, SRC represents the structural balance between industrial progress and legal, environmental stewardship in our region. It is my distinct duty as President to steer this administration with absolute integrity, ensuring our operations create an enduring economic legacy that genuinely upgrades the communities we serve.",
  },
  {
    name: "Nicolas M. Ledesma",
    role: "HR Manager / Office Administrator",
    image: "/assets/team/nicolas-m-ledesma.jpg",
    quote:
      "For me, SRC is a low-profile but impactful organization with a 'big heart' that truly prioritizes the welfare of its employees and their families. When I hear the word 'SRC,' I think of a family-oriented corporation that I am deeply grateful to belong to, a place that consistently makes a real and positive difference in the lives of its people. ",
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
      "SRC is a dynamic real estate company specializing in property management, acquisition, sales, and leasing where I focus on building and sustaining long-term, professional partnerships. When I hear 'SRC,' I think of an environment that values professional excellence, driven by the clear communication and proactive problem-solving needed to succeed in the industry.",
  },
  {
    name: "Ronel Alao",
    role: "Messenger / Driver / Utility",
    image: "/assets/team/ronel-alao.jpg",
    quote:
      "To me, SRC means teamwork and growth. My role is to be the reliable backbone of our daily operations by taking care of our transport, messages, and maintenance without any hitches. I like knowing that by keeping our day-to-day work running safely and seamlessly, I give our leaders the peace of mind to focus completely on taking care of our locators.",
  },
  {
    name: "Naomi Castardo",
    role: "Accounting Assistant",
    image: "/assets/team/naomi-castardo.jpg",
    quote:
      "SRC is the professional environment where I serve as an Accounting Clerk, ensuring precision and accuracy in our financial transactions and records. When I hear 'SRC,' I think of a workplace that challenges me to grow, fostering my personal discipline, productivity, and the ability to multitask effectively within a professional team.",
  },
] as const;

export type TeamMemberEntry = (typeof teamMembers)[number];
