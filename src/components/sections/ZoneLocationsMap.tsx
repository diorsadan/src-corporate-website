"use client";

import { motion } from "framer-motion";

interface MapPin {
  id: string;
  name: string;
  designation: string;
  topPercent: number;
  leftPercent: number;
}

const mapPins: MapPin[] = [
  {
    id: "cannery",
    name: "SRC Cannery",
    designation: "Polomolok — PEZA Industrial Economic Zone",
    topPercent: 42,
    leftPercent: 28,
  },
  {
    id: "calumpang",
    name: "SRC Calumpang",
    designation: "PEZA Industrial Economic Zone",
    topPercent: 58,
    leftPercent: 35,
  },
  {
    id: "upper-klinan",
    name: "SRC Upper Klinan",
    designation: "PEZA Industrial Economic Zone",
    topPercent: 32,
    leftPercent: 58,
  },
  {
    id: "allah-valley",
    name: "SRC Allah Valley",
    designation: "PEZA Industrial Economic Zone",
    topPercent: 68,
    leftPercent: 72,
  },
];

export function ZoneLocationsMap() {
  return (
    <div className="w-full">
      {/* Map Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 shadow-lg">
        {/* Base Map Image */}
        <img
          src="/images/soccsksargen-map.png"
          alt="SOCCSKSARGEN Zone Locations Map"
          className="w-full h-full object-cover"
          loading="lazy"
        />



        {/* Subtle Gradient Overlay (Optional Enhancement) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl" />
      </div>

      {/* Legend / Information Card (Optional) */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/60"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sarangani Resources Corporation Zones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mapPins.map((pin) => (
            <div key={pin.id} className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-[#059669] mt-1.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900 text-sm">{pin.name}</p>
                <p className="text-gray-600 text-xs">{pin.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
