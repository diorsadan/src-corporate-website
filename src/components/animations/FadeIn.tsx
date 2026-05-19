"use client";

import type { PropsWithChildren } from "react";
import React from "react";
import { motion } from "framer-motion";

type FadeInProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

/**
 * Optimized FadeIn component with React.memo
 * Prevents unnecessary re-renders when parent updates
 * Custom comparison: only re-render if children reference changes
 */
function FadeInComponent({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

export const FadeIn = React.memo(FadeInComponent, (prevProps, nextProps) => {
  // Re-render only if children reference or delay changes
  return (
    prevProps.children === nextProps.children &&
    prevProps.delay === nextProps.delay &&
    prevProps.className === nextProps.className
  );
});
