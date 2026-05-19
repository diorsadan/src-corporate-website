"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type StaggerContainerProps = PropsWithChildren<{
  className?: string;
  staggerDelay?: number;
}>;

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.08,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}
