"use client";

import { motion } from "framer-motion";
import { propertiesPageHero } from "@/data/properties";
import { ZoneLocationsMap } from "@/components/sections/ZoneLocationsMap";
import { PropertyGrid } from "@/components/sections/PropertyGrid";

export function Properties() {
  return (
    <div>
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[22rem] sm:min-h-[26rem] md:min-h-[28rem] pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        >
          <source src="/videos/properties-bg.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-emerald-950/60 backdrop-brightness-[0.8]"
          aria-hidden
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight"
            style={{ fontWeight: 700 }}
          >
            {propertiesPageHero.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto font-light">
            {propertiesPageHero.subtitle}
          </p>
        </motion.div>
      </section>

      <section className="pb-24 bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <ZoneLocationsMap />
          </motion.div>
        </div>
      </section>

      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyGrid />
      </div>
    </div>
  );
}
