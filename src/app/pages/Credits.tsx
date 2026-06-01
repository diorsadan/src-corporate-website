"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  FileText,
  GraduationCap,
  Tags,
  X,
} from "lucide-react";

type Engineer = {
  id: string;
  name: string;
  role: string;
  institution: string;
  pdfUrl: string;
  tags: string[];
  description: string;
};

export default function TeamCredits() {
  const [activeResume, setActiveResume] = useState<string | null>(null);

  const engineers = useMemo<Engineer[]>(
    () => [
      {
        id: "dion",
        name: "Dion Ren S. Adan",
        role: "Co-Founder & Full-Stack Engineer",
        institution: "Ateneo de Davao University",
        pdfUrl: "/dion-adan-resume.pdf",
        tags: [
          "Next.js",
          "React.js",
          "TypeScript",
          "Flutter",
          "Supabase",
          "Prisma",
          "Tailwind CSS",
          "Figma",
        ],
        description:
          "Full-stack software engineer adept at translating high-fidelity prototypes into responsive mobile and web ecosystems. Competent in engineering robust backend APIs, relational database schemas, and performance-focused frontend layout structures.",
      },
      {
        id: "vince",
        name: "Vince Nikolai B. Ledesma",
        role: "Co-Founder & Full-Stack Engineer",
        institution: "Ateneo de Davao University",
        pdfUrl: "/vince-ledesma-resume.pdf",
        tags: [
          "Next.js",
          "React.js",
          "TypeScript",
          "Flutter",
          "Supabase",
          "Prisma",
          "Tailwind CSS",
          "Figma",
        ],
        description:
          "Full-stack software engineer specializing in cross-platform application lifecycle design, database management pipelines, and bridging the gap between intricate UI/UX design and scalable enterprise engineering.",
      },
    ],
    [],
  );

  const selectedEngineer = engineers.find((e) => e.pdfUrl === activeResume) ?? null;

  useEffect(() => {
    if (!activeResume) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveResume(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeResume]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Premium Header Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <span className="text-[10px] md:text-[11px] font-bold text-emerald-600 tracking-[0.25em] pl-[0.25em] uppercase block mb-3 animate-fade-in">
          Sarangani Resources Corporation
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          The Engineering Architecture Team
        </h1>
        <div className="w-12 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        <p className="mt-4 text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          The technical minds responsible for designing, structuring, and optimizing this
          principal enterprise asset portal.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {engineers.map((eng, idx) => (
            <motion.div
              key={eng.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.06 }}
              className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ease-in-out hover:shadow-xl hover:border-emerald-200"
            >
              <div>
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div className="min-w-0">
                    <p className="text-[10px] md:text-[11px] font-bold text-slate-500 tracking-[0.22em] uppercase mb-2">
                      Engineering Lead
                    </p>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                      {eng.name}
                    </h2>
                    <p className="mt-2 text-sm md:text-base font-semibold text-emerald-700">
                      {eng.role}
                    </p>
                  </div>

                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600">
                    <Building2 className="h-6 w-6 stroke-[1.75]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:border-emerald-600">
                    <div className="flex items-center justify-center gap-2 text-slate-500 transition-all duration-300 ease-in-out group-hover:text-white/80">
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                        Institution
                      </span>
                    </div>
                    <p className="mt-2 text-center text-sm font-semibold text-slate-900 transition-all duration-300 ease-in-out group-hover:text-white">
                      {eng.institution}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4 transition-all duration-300 ease-in-out group-hover:bg-emerald-600 group-hover:border-emerald-600">
                    <div className="flex items-center justify-center gap-2 text-slate-500 transition-all duration-300 ease-in-out group-hover:text-white/80">
                      <Tags className="h-4 w-4" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em]">
                        Focus Areas
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {eng.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 transition-all duration-300 ease-in-out group-hover:bg-white/15 group-hover:text-white group-hover:border-white/25"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm md:text-base text-slate-600 leading-relaxed transition-all duration-300 ease-in-out group-hover:text-white/90">
                  {eng.description}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveResume(eng.pdfUrl)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                >
                  <FileText className="h-5 w-5" />
                  View Resume
                </button>

                <div className="text-center text-[11px] text-slate-500">
                  {eng.pdfUrl}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle footer hint (kept minimal) */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-slate-200/70 px-5 py-2.5 shadow-sm text-slate-600 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Portfolio dashboard view with interactive resume previews
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      <AnimatePresence>
        {activeResume && (
          <motion.div
            key="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[110] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            role="presentation"
            onClick={() => setActiveResume(null)}
          >
            <motion.div
              key="resume-modal"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
              role="dialog"
              aria-modal="true"
              aria-label="Resume preview"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-white">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 tracking-[0.22em] uppercase">
                    Resume Preview
                  </p>
                  <p className="mt-1 text-base md:text-lg font-black text-slate-900 truncate">
                    {selectedEngineer?.name ?? "Resume"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeResume}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold px-4 py-2.5 hover:bg-slate-50 transition-all duration-300 ease-in-out"
                  >
                    Open in New Tab
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveResume(null)}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 p-2.5 transition-all duration-300 ease-in-out"
                    aria-label="Close resume preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative bg-slate-50">
                <iframe
                  title="Resume PDF"
                  src={activeResume}
                  className="w-full h-[70vh] md:h-[75vh]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

