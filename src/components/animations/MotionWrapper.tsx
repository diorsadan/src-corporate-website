/**
 * Framer Motion Consistency Utility Wrapper
 * Ensures all stagger containers have consistent viewport behavior
 * Prevents repetitive, dizzying animations on scroll
 */

import type { Variants, HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import React from "react";
import {
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  VIEWPORT_ONCE,
  ANIMATION_DELAYS,
} from "@/constants/animations";

/**
 * Extended Stagger Container Variants
 * All containers automatically include viewport={{ once: true, amount: 0.2 }}
 */
export const STAGGER_CONTAINER_WITH_VIEWPORT: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: ANIMATION_DELAYS.md,
      delayChildren: ANIMATION_DELAYS.xs,
    },
  },
} as const;

/**
 * StaggerContainer Component
 * Wrapper for consistent stagger animations with built-in viewport prevention
 * Prevents animation re-triggering on scroll
 */
interface StaggerContainerProps extends PropsWithChildren<
  HTMLMotionProps<"div">
> {
  /** Custom stagger delay between children (default: 0.15) */
  staggerDelay?: number;
  /** Viewport trigger amount (default: 0.2 = 20% visible) */
  viewportAmount?: number;
  /** Additional className */
  className?: string;
}

export const StaggerContainerMotion = React.forwardRef<
  HTMLDivElement,
  StaggerContainerProps
>(
  (
    {
      children,
      staggerDelay = ANIMATION_DELAYS.md,
      viewportAmount = 0.2,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: viewportAmount }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: ANIMATION_DELAYS.xs,
            },
          },
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

StaggerContainerMotion.displayName = "StaggerContainerMotion";

/**
 * StaggerItem Component
 * Wrapper for consistent child item animations
 * Always used inside StaggerContainerMotion
 */
interface StaggerItemProps extends PropsWithChildren<HTMLMotionProps<"div">> {
  /** Custom className */
  className?: string;
  /** Animation direction: 'up', 'down', 'left', 'right' (default: 'up') */
  direction?: "up" | "down" | "left" | "right";
}

export const StaggerItemMotion = React.forwardRef<
  HTMLDivElement,
  StaggerItemProps
>(({ children, className = "", direction = "up", ...props }, ref) => {
  const getDirectionValues = () => {
    switch (direction) {
      case "down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      default: // 'up'
        return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getDirectionValues()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
});

StaggerItemMotion.displayName = "StaggerItemMotion";

/**
 * Example Usage:
 *
 * <StaggerContainerMotion className="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   {items.map((item) => (
 *     <StaggerItemMotion key={item.id} direction="up">
 *       <Card>{item.content}</Card>
 *     </StaggerItemMotion>
 *   ))}
 * </StaggerContainerMotion>
 */

/**
 * Animation Delay Pattern Manager
 * Provides consistent delays for cascading animations
 */
export const getAnimationDelay = (index: number): number => {
  const delays = Object.values(ANIMATION_DELAYS);
  return delays[Math.min(index, delays.length - 1)];
};

/**
 * Batch Animation Config
 * Use for animating multiple elements with delay
 */
export interface BatchAnimationConfig {
  index: number;
  totalItems: number;
  staggerFactor?: number; // default: 0.1
}

export const getBatchAnimationDelay = ({
  index,
  totalItems,
  staggerFactor = 0.1,
}: BatchAnimationConfig): number => {
  return Math.min(index * staggerFactor, 0.4); // Cap at 400ms
};

/**
 * MotionPageWrapper Component
 * Ensures consistent page-level animations with viewport prevention
 */
interface MotionPageWrapperProps extends PropsWithChildren<
  HTMLMotionProps<"main">
> {
  /** Optional page title for accessibility */
  pageTitle?: string;
}

export const MotionPageWrapper = React.forwardRef<
  HTMLDivElement,
  MotionPageWrapperProps
>(({ children, pageTitle }, ref) => {
  return (
    <motion.main
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {pageTitle && <h1 className="sr-only">{pageTitle}</h1>}
      {children}
    </motion.main>
  );
});

MotionPageWrapper.displayName = "MotionPageWrapper";

/**
 * BEST PRACTICES:
 *
 * ✓ Always use viewport={{ once: true }} for scroll-triggered animations
 * ✓ Set viewport.amount based on content height (0.2 = 20% visible)
 * ✓ Never use infinite animations that loop (use once: true)
 * ✓ Batch animations with consistent stagger delays
 * ✓ Use direction prop for multi-directional entry effects
 * ✓ Keep animation durations between 0.6s - 1.2s for premium feel
 */
