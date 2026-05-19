/**
 * SectionSkeleton Component
 *
 * Premium loading skeleton for lazy-loaded sections
 * Features brand colors and elegant pulse animations
 * Used as Suspense fallback for code-split components
 */

import React from "react";

export interface SectionSkeletonProps {
  /** Number of items to display (default: 4 for grid, 1 for full section) */
  itemCount?: number;
  /** Layout variant: 'grid' (4 columns), 'hero' (full width), 'list' (2 columns) */
  variant?: "grid" | "hero" | "list";
  /** Height of skeleton in pixels (default: 400) */
  height?: number;
}

/**
 * Grid skeleton - 4 column layout with card placeholders
 */
function GridSkeleton({ itemCount = 4 }: { itemCount: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {Array.from({ length: itemCount }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
        >
          {/* Image placeholder */}
          <div className="h-48 sm:h-52 lg:h-56 bg-gradient-to-br from-primary/10 to-primary/5 animate-pulse" />

          {/* Content placeholders */}
          <div className="p-5 sm:p-6 space-y-3 lg:space-y-4">
            {/* Title skeleton */}
            <div className="h-5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg animate-pulse w-3/4" />

            {/* Badge skeleton */}
            <div className="inline-block h-7 bg-primary/10 rounded-full w-20 animate-pulse" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse w-5/6" />
            </div>

            {/* CTA link skeleton */}
            <div className="h-4 bg-primary/15 rounded-lg animate-pulse w-24 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Hero skeleton - full width section with large content area
 */
function HeroSkeleton({ height = 400 }: { height: number }) {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header section */}
      <div className="text-center space-y-3 lg:space-y-4">
        {/* Title skeleton */}
        <div className="h-10 sm:h-12 lg:h-14 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl animate-pulse max-w-2xl mx-auto" />

        {/* Subtitle skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded-lg animate-pulse max-w-3xl mx-auto" />
          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg animate-pulse max-w-3xl mx-auto w-4/5 mx-auto" />
        </div>
      </div>

      {/* Large content area */}
      <div
        className="bg-gradient-to-br from-primary/5 to-primary/0 rounded-xl animate-pulse"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}

/**
 * List skeleton - 2 column layout for partner/testimonial type sections
 */
function ListSkeleton({ itemCount = 6 }: { itemCount: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: itemCount }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-center p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-xl border border-gray-200 bg-white h-24 sm:h-28 lg:h-32"
        >
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

/**
 * SectionSkeleton
 *
 * Premium loading skeleton component with brand colors and smooth animations
 *
 * @example
 * // Grid variant (default)
 * <Suspense fallback={<SectionSkeleton />}>
 *   <FeaturedZones />
 * </Suspense>
 *
 * @example
 * // Hero variant with custom height
 * <Suspense fallback={<SectionSkeleton variant="hero" height={500} />}>
 *   <HeroSection />
 * </Suspense>
 */
export function SectionSkeleton({
  itemCount = 4,
  variant = "grid",
  height = 400,
}: SectionSkeletonProps) {
  return (
    <div className="py-20 sm:py-24 lg:py-28 bg-white animate-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {variant === "hero" && <HeroSkeleton height={height} />}
        {variant === "grid" && <GridSkeleton itemCount={itemCount} />}
        {variant === "list" && <ListSkeleton itemCount={itemCount} />}
      </div>
    </div>
  );
}

export default SectionSkeleton;
