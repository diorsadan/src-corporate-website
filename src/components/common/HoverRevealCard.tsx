"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type HoverRevealCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Center-aligned card: icon, divider, title visible by default;
 * detail content reveals on hover with emerald background inversion.
 */
export function HoverRevealCard({
  icon: Icon,
  title,
  children,
  className = "",
}: HoverRevealCardProps) {
  return (
    <article
      className={`group flex flex-col items-center justify-center text-center p-8 md:p-10 bg-white shadow-sm min-h-[220px] transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:shadow-lg ${className}`}
    >
      <div className="w-full opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:max-h-[960px] group-hover:mb-6">
        <div className="text-sm md:text-base leading-relaxed text-slate-600 transition-all duration-300 ease-in-out group-hover:text-white [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5 [&_ul]:text-center [&_p]:text-center">
          {children}
        </div>
      </div>

      <Icon
        className="w-10 h-10 md:w-12 md:h-12 text-emerald-700 stroke-[1.25] transition-all duration-300 ease-in-out group-hover:text-white flex-shrink-0"
        aria-hidden
      />

      <div className="w-16 h-0.5 bg-emerald-500 mx-auto my-3 transition-all duration-300 ease-in-out group-hover:bg-white" />

      <h3 className="text-slate-900 font-bold tracking-tight text-center uppercase text-sm md:text-base transition-all duration-300 ease-in-out group-hover:text-white">
        {title}
      </h3>
    </article>
  );
}
