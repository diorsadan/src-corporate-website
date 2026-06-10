"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  hoverRevealDetailClasses,
  hoverRevealDetailTextClasses,
  hoverRevealDividerClasses,
  hoverRevealIconClasses,
  hoverRevealShellClasses,
  hoverRevealTitleClasses,
} from "@/utils/interactiveCardClasses";

export type HoverRevealCardProps = {
  cardId: string;
  isActive: boolean;
  onCardTap: (cardId: string) => void;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Center-aligned card: icon, divider, title visible by default;
 * detail content reveals on desktop hover or mobile tap-to-toggle.
 */
export function HoverRevealCard({
  cardId,
  isActive,
  onCardTap,
  icon: Icon,
  title,
  children,
  className = "",
}: HoverRevealCardProps) {
  return (
    <article
      data-tap-card-id={cardId}
      onClick={() => onCardTap(cardId)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onCardTap(cardId);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      className={`group flex flex-col items-center justify-center text-center p-8 md:p-10 min-h-[220px] cursor-pointer touch-manipulation ${hoverRevealShellClasses(isActive)} ${className}`}
    >
      <div className={hoverRevealDetailClasses(isActive)}>
        <div className={hoverRevealDetailTextClasses(isActive)}>
          {children}
        </div>
      </div>

      <Icon className={hoverRevealIconClasses(isActive)} aria-hidden />

      <div className={hoverRevealDividerClasses(isActive)} />

      <h3 className={hoverRevealTitleClasses(isActive)}>{title}</h3>
    </article>
  );
}
