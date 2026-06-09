"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { FadeIn } from "@/components/animations";

/**
 * CTASection - Lazy-loaded call-to-action section
 * Premium gradient background with engaging message
 */
export function CTASection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-[#059669] to-[#047857] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full -mr-36 sm:-mr-48 -mt-36 sm:-mt-48" />
      <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-white/5 rounded-full -ml-28 sm:-ml-36 -mb-28 sm:-mb-36" />

      <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-12 lg:py-0">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl mb-6 lg:mb-8 tracking-tight leading-tight"
          style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Ready to Grow Your Business?
        </h2>
        <p className="text-base sm:text-lg text-emerald-50 mb-10 lg:mb-12 leading-relaxed font-light max-w-3xl mx-auto">
          Discover how our premier economic zones can support your enterprise's
          growth and success.
        </p>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 350,
            damping: 35,
          }}
        >
          <Link
            to="/leasing"
            className="inline-flex items-center gap-3 bg-white text-[#059669] hover:bg-gray-50 px-8 sm:px-10 py-3 lg:py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1 font-semibold whitespace-nowrap"
          >
            Explore Leasing Options
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </FadeIn>
    </section>
  );
}
