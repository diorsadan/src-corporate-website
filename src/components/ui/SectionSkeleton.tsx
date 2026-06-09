/**
 * SectionSkeleton Component
 *
 * Premium shimmer loading skeletons for lazy-loaded sections.
 * Layout dimensions mirror live components to prevent CLS.
 */

import React from "react";
import { PropertyCardSkeleton } from "@/components/ui/PropertyCardSkeleton";
import { TextSectionSkeleton } from "@/components/ui/TextSectionSkeleton";
import { ShimmerBlock } from "@/components/ui/skeleton";

export interface SectionSkeletonProps {
  itemCount?: number;
  variant?: "grid" | "hero" | "list" | "property-grid";
  height?: number;
}

function ListSkeleton({ itemCount = 6 }: { itemCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
      {Array.from({ length: itemCount }).map((_, i) => (
        <div
          key={i}
          className="flex h-24 items-center justify-center rounded-lg border border-gray-200 bg-white sm:h-28 lg:h-32 lg:rounded-xl"
        >
          <ShimmerBlock className="h-6 w-3/4" />
        </div>
      ))}
    </div>
  );
}

export function SectionSkeleton({
  itemCount = 4,
  variant = "grid",
  height = 400,
}: SectionSkeletonProps) {
  return (
    <div className="animate-in bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {variant === "hero" && (
          <TextSectionSkeleton
            showHeading
            paragraphLines={2}
            contentBlockHeight={height}
          />
        )}
        {variant === "grid" && (
          <PropertyCardSkeleton
            count={itemCount}
            columnsClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8"
          />
        )}
        {variant === "property-grid" && (
          <PropertyCardSkeleton count={itemCount} />
        )}
        {variant === "list" && <ListSkeleton itemCount={itemCount} />}
      </div>
    </div>
  );
}

export default SectionSkeleton;
