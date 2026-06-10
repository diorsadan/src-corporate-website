/**
 * Tailwind class helpers for dual-mode hover (desktop) / tap-active (mobile) cards.
 * All variants use full static class strings so JIT can detect them.
 */

export function faceLayerClasses(isActive: boolean): string {
  return `transition-all duration-300 ease-in-out ${
    isActive ? "opacity-0" : "opacity-100 lg:group-hover:opacity-0"
  }`;
}

export function overlayLayerClasses(isActive: boolean): string {
  return `transition-all duration-300 ease-in-out ${
    isActive ? "opacity-100" : "opacity-0 lg:group-hover:opacity-100"
  }`;
}

export function hoverRevealShellClasses(isActive: boolean): string {
  return `transition-all duration-300 ease-in-out ${
    isActive
      ? "bg-emerald-600 shadow-lg"
      : "bg-white shadow-sm lg:hover:bg-emerald-600 lg:hover:shadow-lg"
  }`;
}

export function hoverRevealDetailClasses(isActive: boolean): string {
  return `w-full overflow-hidden transition-all duration-300 ease-in-out ${
    isActive
      ? "opacity-100 max-h-[960px] mb-6"
      : "opacity-0 max-h-0 lg:group-hover:opacity-100 lg:group-hover:max-h-[960px] lg:group-hover:mb-6"
  }`;
}

export function hoverRevealDetailTextClasses(isActive: boolean): string {
  return `text-sm md:text-base leading-relaxed transition-all duration-300 ease-in-out [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-1.5 [&_ul]:text-center [&_p]:text-center ${
    isActive ? "text-white" : "text-slate-600 lg:group-hover:text-white"
  }`;
}

export function hoverRevealIconClasses(isActive: boolean): string {
  return `w-10 h-10 md:w-12 md:h-12 stroke-[1.25] flex-shrink-0 transition-all duration-300 ease-in-out ${
    isActive ? "text-white" : "text-emerald-700 lg:group-hover:text-white"
  }`;
}

export function hoverRevealDividerClasses(isActive: boolean): string {
  return `w-16 h-0.5 mx-auto my-3 transition-all duration-300 ease-in-out ${
    isActive ? "bg-white" : "bg-emerald-500 lg:group-hover:bg-white"
  }`;
}

export function hoverRevealTitleClasses(isActive: boolean): string {
  return `font-bold tracking-tight text-center uppercase text-sm md:text-base transition-all duration-300 ease-in-out ${
    isActive ? "text-white" : "text-slate-900 lg:group-hover:text-white"
  }`;
}

export function cardCarouselEngagedClasses(
  isActive: boolean,
  groupHoverToken: string,
): string {
  return isActive
    ? "opacity-100"
    : `opacity-0 ${groupHoverToken}:opacity-100`;
}

export function cardCarouselOverlayClasses(
  isActive: boolean,
  groupHoverToken: string,
): string {
  return isActive
    ? "opacity-90"
    : `opacity-60 ${groupHoverToken}:opacity-90`;
}
