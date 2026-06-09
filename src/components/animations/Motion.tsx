"use client";

import type { HTMLMotionProps } from "framer-motion";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import React from "react";
import { MOTION_PATTERNS } from "@/constants/animations";
import {
  useAnimationPattern,
  type StaggerDirection,
} from "@/hooks/useAnimationPattern";

/* ------------------------------------------------------------------ */
/*  FadeIn                                                             */
/* ------------------------------------------------------------------ */

type FadeInProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

function FadeInComponent({ children, className, delay = 0 }: FadeInProps) {
  const { prefersReducedMotion, fadeInTransition } = useAnimationPattern();

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: MOTION_PATTERNS.fadeIn.offsetY }
      }
      whileInView={
        prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
      }
      transition={fadeInTransition(delay)}
      viewport={MOTION_PATTERNS.fadeIn.viewport}
    >
      {children}
    </motion.div>
  );
}

export const FadeIn = React.memo(FadeInComponent, (prev, next) =>
  prev.children === next.children &&
  prev.delay === next.delay &&
  prev.className === next.className,
);

/* ------------------------------------------------------------------ */
/*  StaggerContainer                                                   */
/* ------------------------------------------------------------------ */

type StaggerContainerProps = PropsWithChildren<
  HTMLMotionProps<"div"> & {
    staggerDelay?: number;
    viewportAmount?: number;
  }
>;

function StaggerContainerComponent({
  children,
  className,
  staggerDelay,
  viewportAmount = MOTION_PATTERNS.stagger.viewportAmount,
  ...props
}: StaggerContainerProps) {
  const { prefersReducedMotion, staggerContainerVariants } =
    useAnimationPattern();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: viewportAmount, margin: "-50px" }}
      variants={staggerContainerVariants(staggerDelay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const StaggerContainer = React.memo(StaggerContainerComponent);

/* ------------------------------------------------------------------ */
/*  StaggerItem                                                        */
/* ------------------------------------------------------------------ */

type StaggerItemProps = PropsWithChildren<
  HTMLMotionProps<"div"> & {
    direction?: StaggerDirection;
  }
>;

function StaggerItemComponent({
  children,
  className,
  direction = "up",
  ...props
}: StaggerItemProps) {
  const { staggerItemVariants } = useAnimationPattern();

  return (
    <motion.div
      className={className}
      variants={staggerItemVariants(direction)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = React.memo(
  StaggerItemComponent,
  (prev, next) =>
    prev.children === next.children &&
    prev.className === next.className &&
    prev.direction === next.direction,
);

/* ------------------------------------------------------------------ */
/*  MotionPageWrapper                                                  */
/* ------------------------------------------------------------------ */

interface MotionPageWrapperProps extends PropsWithChildren<
  HTMLMotionProps<"main">
> {
  pageTitle?: string;
}

export const MotionPageWrapper = React.forwardRef<
  HTMLDivElement,
  MotionPageWrapperProps
>(({ children, pageTitle }, ref) => {
  const { getMotionProps } = useAnimationPattern();

  return (
    <motion.main
      ref={ref}
      {...getMotionProps<"main">({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: MOTION_PATTERNS.page.duration },
      })}
    >
      {pageTitle && <h1 className="sr-only">{pageTitle}</h1>}
      {children}
    </motion.main>
  );
});

MotionPageWrapper.displayName = "MotionPageWrapper";

/* ------------------------------------------------------------------ */
/*  Utilities (re-exported for batch delay helpers)                    */
/* ------------------------------------------------------------------ */

export { getAnimationDelay, getBatchAnimationDelay } from "@/constants/animations";
export type { BatchAnimationConfig } from "@/constants/animations";
