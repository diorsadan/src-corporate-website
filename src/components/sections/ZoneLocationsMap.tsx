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
          src="/images/soccsksargen-map.jpeg"
          alt="SOCCSKSARGEN Zone Locations Map"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Interactive Map Pins */}
        {mapPins.map((pin) => (
          <motion.div
            key={pin.id}
            className="absolute"
            style={{
              top: `${pin.topPercent}%`,
              left: `${pin.leftPercent}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Pin Container with Tooltip */}
            <div className="group relative flex items-center justify-center">
              {/* Pulse Animation Ring */}
              <motion.div
                className="absolute w-12 h-12 rounded-full border-2 border-[#059669]/30 bg-[#059669]/5"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(5, 150, 105, 0.4)",
                    "0 0 0 12px rgba(5, 150, 105, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Main Pin Indicator */}
              <motion.div
                className="relative w-6 h-6 rounded-full bg-[#059669] border-4 border-white shadow-lg cursor-pointer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 35,
                }}
              >
                {/* Pin Center Dot */}
                <div className="absolute inset-2 rounded-full bg-white/20" />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                className="absolute bottom-full left-1/2 mb-3 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50"
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {/* Tooltip Backdrop */}
                <div className="relative bg-gray-900/95 backdrop-blur-md px-4 py-3 rounded-lg shadow-2xl whitespace-nowrap border border-gray-700/50">
                  {/* Tooltip Content */}
                  <div className="text-center">
                    <h4 className="font-semibold text-white text-sm leading-tight">
                      {pin.name}
                    </h4>
                    <p className="text-gray-300 text-xs mt-1 leading-tight">
                      {pin.designation}
                    </p>
                  </div>

                  {/* Tooltip Arrow Pointer */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-900/95" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

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
