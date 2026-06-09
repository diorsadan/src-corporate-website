/**
 * Centralized Framer Motion animation configurations
 * All animation timings, easing, and variants are defined here
 * This ensures consistency across the entire application
 */

import type { Variants, TargetAndTransition } from "framer-motion";

/* ===== TRANSITION CONFIGURATIONS ===== */

/** Premium spring transition used for button interactions and micro-interactions */
export const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 350,
  damping: 35,
  mass: 1,
} as const;

/** Smooth ease-out transition for standard animations */
export const EASE_OUT_TRANSITION = {
  type: "tween",
  ease: "easeOut",
  duration: 0.8,
} as const;

/** Fade-in transition (faster, subtle) */
export const FADE_TRANSITION = {
  type: "tween",
  ease: "easeOut",
  duration: 0.6,
} as const;

/** Quick interaction transition */
export const QUICK_TRANSITION = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
} as const;

/** Standard page transition */
export const PAGE_TRANSITION = {
  type: "tween",
  ease: "easeOut",
  duration: 0.9,
} as const;

/* ===== ANIMATION VARIANTS ===== */

/** Fade in with upward motion - used for hero elements and main content */
export const FADE_IN_UP: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: EASE_OUT_TRANSITION,
  },
} as const;

/** Fade in with downward motion - used for header and top sections */
export const FADE_IN_DOWN: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: EASE_OUT_TRANSITION,
  },
} as const;

/** Fade in with left motion - used for left-aligned elements */
export const FADE_IN_LEFT: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: EASE_OUT_TRANSITION,
  },
} as const;

/** Fade in with right motion - used for right-aligned elements */
export const FADE_IN_RIGHT: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: EASE_OUT_TRANSITION,
  },
} as const;

/** Simple fade in - used for subtle appearances */
export const FADE_IN: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: FADE_TRANSITION,
  },
} as const;

/** Stagger container for animating lists of items */
export const STAGGER_CONTAINER: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
} as const;

/** Stagger item for use within stagger container */
export const STAGGER_ITEM: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
} as const;

/** Scale and fade for card/button hover states */
export const SCALE_IN: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: QUICK_TRANSITION,
  },
} as const;

/* ===== WHILEHOVER CONFIGURATIONS ===== */

/** Standard button hover effect */
export const HOVER_SCALE_UP: TargetAndTransition = {
  scale: 1.02,
} as const;

/** Subtle hover lift effect */
export const HOVER_LIFT: TargetAndTransition = {
  y: -2,
} as const;

/** Icon hover effect */
export const HOVER_ICON: TargetAndTransition = {
  scale: 1.1,
} as const;

/* ===== WHILETAP CONFIGURATIONS ===== */

/** Standard button tap/click effect */
export const TAP_SCALE_DOWN: TargetAndTransition = {
  scale: 0.96,
} as const;

/** Strong tap effect for important actions */
export const TAP_SCALE_STRONG: TargetAndTransition = {
  scale: 0.92,
} as const;

/* ===== VIEWPORT CONFIGURATIONS ===== */

/** Standard viewport settings for scroll animations */
export const VIEWPORT_ONCE = {
  once: true,
  margin: "-50px",
} as const;

/** Aggressive viewport (triggers earlier on scroll) */
export const VIEWPORT_EAGER = {
  once: true,
  margin: "-100px",
} as const;

/** Conservative viewport (triggers closer to screen) */
export const VIEWPORT_CONSERVATIVE = {
  once: true,
  margin: "0px",
} as const;

/* ===== DELAY UTILITIES ===== */

/** Standard delay increments for staggered animations */
export const ANIMATION_DELAYS = {
  xs: 0.05,
  sm: 0.1,
  md: 0.15,
  lg: 0.2,
  xl: 0.25,
  "2xl": 0.3,
  "3xl": 0.35,
  "4xl": 0.4,
} as const;

/* ===== UNIFIED MOTION PATTERNS (design system) ===== */

/** Single source of truth for scroll-reveal, stagger, and modal timings */
export const MOTION_PATTERNS = {
  fadeIn: {
    duration: 0.9,
    offsetY: 20,
    viewport: VIEWPORT_ONCE,
  },
  stagger: {
    staggerChildren: ANIMATION_DELAYS.md,
    delayChildren: ANIMATION_DELAYS.xs,
    defaultStaggerDelay: ANIMATION_DELAYS.md,
    viewportAmount: 0.2,
    viewport: VIEWPORT_ONCE,
  },
  staggerItem: {
    duration: 0.8,
    offsetY: 20,
    offsetX: 30,
  },
  modal: {
    duration: 0.3,
    scale: 0.95,
    offsetY: 20,
  },
  page: {
    duration: 0.3,
  },
} as const;

export const getAnimationDelay = (index: number): number => {
  const delays = Object.values(ANIMATION_DELAYS);
  return delays[Math.min(index, delays.length - 1)];
};

export interface BatchAnimationConfig {
  index: number;
  totalItems: number;
  staggerFactor?: number;
}

export const getBatchAnimationDelay = ({
  index,
  staggerFactor = 0.1,
}: BatchAnimationConfig): number => {
  return Math.min(index * staggerFactor, 0.4);
};

/* ===== COMBINED PRESETS ===== */

/** Hero section animation preset */
export const HERO_ANIMATION = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: PAGE_TRANSITION,
  viewport: VIEWPORT_ONCE,
} as const;

/** Card animation preset */
export const CARD_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: EASE_OUT_TRANSITION,
  viewport: VIEWPORT_ONCE,
} as const;

/** Button animation preset */
export const BUTTON_ANIMATION = {
  whileHover: HOVER_SCALE_UP,
  whileTap: TAP_SCALE_DOWN,
  transition: SPRING_TRANSITION,
} as const;

/** Link animation preset */
export const LINK_ANIMATION = {
  whileHover: HOVER_LIFT,
  whileTap: TAP_SCALE_DOWN,
  transition: SPRING_TRANSITION,
} as const;

/* ===== PAGE TRANSITION SEQUENCE ===== */

/** Full page navigation animation (scroll to top + fade) */
export const PAGE_TRANSITION_SEQUENCE = {
  scrollDuration: 350, // ms to scroll to top
  fadeDuration: 200, // ms for fade effect
} as const;
