"use client";

import type { PropsWithChildren } from "react";
import React from "react";
import { motion } from "framer-motion";

type StaggerItemProps = PropsWithChildren<{
  className?: string;
}>;

/**
 * Optimized StaggerItem component with React.memo
 * Prevents unnecessary re-renders in stagger containers
 * Custom comparison: only re-render if children or className changes
 */
function StaggerItemComponent({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = React.memo(
  StaggerItemComponent,
  (prevProps, nextProps) => {
    // Re-render only if children reference or className changes
    return (
      prevProps.children === nextProps.children &&
      prevProps.className === nextProps.className
    );
  },
);
