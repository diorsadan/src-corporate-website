import { useMemo } from "react";
import type { Transition, Variants } from "framer-motion";
import {
  MOTION_PATTERNS,
  EASE_OUT_TRANSITION,
  FADE_IN_UP,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  VIEWPORT_ONCE,
} from "@/constants/animations";
import { useAccessibleAnimation } from "@/hooks/useAccessibleAnimation";

export type StaggerDirection = "up" | "down" | "left" | "right";

/**
 * Unified animation pattern hook — single entry point for timing,
 * variants, viewport config, and reduced-motion degradation.
 */
export function useAnimationPattern() {
  const {
    prefersReducedMotion,
    resolveTransition,
    resolveVariants,
    getMotionProps,
  } = useAccessibleAnimation();

  return useMemo(
    () => ({
      prefersReducedMotion,
      resolveTransition,
      resolveVariants,
      getMotionProps,
      patterns: MOTION_PATTERNS,
      viewport: VIEWPORT_ONCE,

      fadeInTransition: (delay = 0): Transition =>
        resolveTransition({
          duration: MOTION_PATTERNS.fadeIn.duration,
          delay,
        }),

      staggerContainerVariants: (staggerDelay?: number): Variants => {
        const delay = staggerDelay ?? MOTION_PATTERNS.stagger.defaultStaggerDelay;
        if (prefersReducedMotion) {
          return {
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
          };
        }
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: resolveTransition({
              staggerChildren: delay,
              delayChildren: MOTION_PATTERNS.stagger.delayChildren,
            }),
          },
        };
      },

      staggerItemVariants: (direction: StaggerDirection = "up"): Variants => {
        if (prefersReducedMotion) {
          return {
            hidden: { opacity: 1, x: 0, y: 0 },
            visible: { opacity: 1, x: 0, y: 0 },
          };
        }

        const { offsetY, offsetX, duration } = MOTION_PATTERNS.staggerItem;
        const transition = resolveTransition({ duration });

        switch (direction) {
          case "down":
            return {
              hidden: { opacity: 0, y: -offsetY },
              visible: { opacity: 1, y: 0, transition },
            };
          case "left":
            return {
              hidden: { opacity: 0, x: -offsetX },
              visible: { opacity: 1, x: 0, transition },
            };
          case "right":
            return {
              hidden: { opacity: 0, x: offsetX },
              visible: { opacity: 1, x: 0, transition },
            };
          default:
            return {
              hidden: { opacity: 0, y: offsetY },
              visible: { opacity: 1, y: 0, transition },
            };
        }
      },

      /** Preset variant maps from constants/animations.ts */
      presets: {
        fadeInUp: FADE_IN_UP,
        staggerContainer: STAGGER_CONTAINER,
        staggerItem: STAGGER_ITEM,
        easeOut: EASE_OUT_TRANSITION,
      },
    }),
    [
      prefersReducedMotion,
      resolveTransition,
      resolveVariants,
      getMotionProps,
    ],
  );
}
