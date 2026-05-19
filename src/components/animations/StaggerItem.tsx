"use client";

import type { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type StaggerItemProps = PropsWithChildren<{
  className?: string;
}>;

export function StaggerItem({ children, className }: StaggerItemProps) {
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
