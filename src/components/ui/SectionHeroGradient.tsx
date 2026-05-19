/**
 * SectionHeroGradient Component
 * Premium reusable hero section with gradient overlay and animated elements
 *
 * Usage:
 * <SectionHeroGradient
 *   title="Your Title"
 *   subtitle="Your subtitle or description"
 *   backgroundImage="/path/to/image.jpg"
 * >
 *   <button>Your CTA</button>
 * </SectionHeroGradient>
 */

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FADE_IN_DOWN,
  FADE_IN_UP,
  EASE_OUT_TRANSITION,
  VIEWPORT_ONCE,
} from "@/constants/animations";

interface SectionHeroGradientProps {
  /** Main title text */
  title: string;
  /** Subtitle or description text */
  subtitle?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Optional CTA buttons or custom content */
  children?: ReactNode;
  /** Optional CSS class for additional styling */
  className?: string;
  /** Optional text color (default: white) */
  textColor?: string;
  /** Optional overlay darkness (0-100, default: 60) */
  overlayOpacity?: number;
  /** Optional background overlay gradient */
  gradientOverlay?: boolean;
}

const SectionHeroGradient: React.FC<SectionHeroGradientProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
  className = "",
  textColor = "text-white",
  overlayOpacity = 60,
  gradientOverlay = true,
}) => {
  return (
    <motion.section
      className={`relative py-24 sm:py-32 lg:py-40 overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {/* Background Image Layer */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          initial={{ scale: 1.05, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ ...EASE_OUT_TRANSITION, duration: 1.2 }}
          viewport={VIEWPORT_ONCE}
        />
      )}

      {/* Dark Gradient Overlay (Premium Effect) */}
      <div className="absolute inset-0 -z-10">
        {gradientOverlay ? (
          <div
            className="absolute inset-0 bg-gradient-to-b from-black to-black/50"
            style={{ opacity: overlayOpacity / 100 }}
          />
        ) : (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
          />
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight ${textColor}`}
          variants={FADE_IN_DOWN}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className={`text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl opacity-95 ${textColor}`}
            variants={FADE_IN_UP}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Buttons or Custom Content */}
        {children && (
          <motion.div
            className="flex flex-wrap gap-4 mt-10"
            variants={FADE_IN_UP}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Decorative Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-70"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ ...EASE_OUT_TRANSITION, duration: 1 }}
        viewport={VIEWPORT_ONCE}
      />
    </motion.section>
  );
};

export default SectionHeroGradient;
