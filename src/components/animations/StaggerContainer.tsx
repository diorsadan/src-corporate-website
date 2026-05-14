"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * StaggerContainer - Parent wrapper that orchestrates sequential animations
 * Works with StaggerItem children to create elegant cascade reveals
 * Use for grids: Featured Zones, Leadership Team, Property Listings, etc.
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.12,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: 0.08,
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}
