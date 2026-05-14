"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * FadeIn - Elegant scroll-triggered fade and slide-up animation
 * Triggers once when element enters viewport, preventing visual fatigue
 * Formal, premium aesthetic suitable for Fortune 500 real estate design
 */
export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay,
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}
