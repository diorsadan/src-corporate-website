import { useCallback, useEffect, useState } from "react";
import type { HTMLMotionProps, Transition, Variants } from "framer-motion";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Zero-duration transition — instant state change, no vestibular risk */
export const INSTANT_TRANSITION: Transition = { duration: 0 };

/** Safe default when motion is allowed */
export const DEFAULT_MOTION_TRANSITION: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.8,
};

function getInitialReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Detects OS-level reduced-motion preference and exposes helpers
 * to degrade Framer Motion configs gracefully.
 */
export function useAccessibleAnimation() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getInitialReducedMotion,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const resolveTransition = useCallback(
    (transition?: Transition): Transition =>
      prefersReducedMotion
        ? INSTANT_TRANSITION
        : (transition ?? DEFAULT_MOTION_TRANSITION),
    [prefersReducedMotion],
  );

  const resolveVariants = useCallback(
    (variants: Variants): Variants => {
      if (!prefersReducedMotion) return variants;

      const instantVisible = {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: INSTANT_TRANSITION,
      };

      return Object.fromEntries(
        Object.entries(variants).map(([key, value]) => {
          if (typeof value !== "object" || value === null) return [key, value];
          if (key === "hidden") return [key, instantVisible];
          return [key, { ...value, transition: INSTANT_TRANSITION }];
        }),
      ) as Variants;
    },
    [prefersReducedMotion],
  );

  const resolveInteraction = useCallback(
    <T,>(interaction: T | undefined): T | undefined =>
      prefersReducedMotion ? undefined : interaction,
    [prefersReducedMotion],
  );

  const getMotionProps = useCallback(
    <T extends keyof HTMLElementTagNameMap = "div">(
      config: Pick<
        HTMLMotionProps<T>,
        | "initial"
        | "animate"
        | "exit"
        | "whileInView"
        | "transition"
        | "whileHover"
        | "whileTap"
      >,
    ) => {
      if (!prefersReducedMotion) return config;

      return {
        initial: false,
        animate: config.animate ?? config.whileInView,
        exit: undefined,
        whileInView: undefined,
        transition: INSTANT_TRANSITION,
        whileHover: undefined,
        whileTap: undefined,
      } as typeof config;
    },
    [prefersReducedMotion],
  );

  return {
    prefersReducedMotion,
    resolveTransition,
    resolveVariants,
    resolveInteraction,
    getMotionProps,
  };
}
