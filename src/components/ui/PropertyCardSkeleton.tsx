import { ShimmerBlock } from "@/components/ui/skeleton";

export interface PropertyCardSkeletonProps {
  /** Matches PropertyGrid / ForSale card density */
  count?: number;
  className?: string;
  columnsClassName?: string;
}

/**
 * Shimmer skeleton grid that mirrors the property card layout exactly —
 * prevents layout shift while async listings load.
 */
export function PropertyCardSkeleton({
  count = 6,
  className = "",
  columnsClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
}: PropertyCardSkeletonProps) {
  return (
    <div
      className={columnsClassName}
      aria-busy="true"
      aria-label="Loading properties"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ${className}`}
        >
          {/* Image — h-64 matches PropertyGrid carousel height */}
          <ShimmerBlock className="h-64 w-full shrink-0 rounded-none" />

          <div className="flex flex-1 flex-col p-6 md:p-8">
            {/* Category badge */}
            <ShimmerBlock className="mb-3 h-6 w-28 rounded-full" />

            {/* Title — two lines */}
            <ShimmerBlock className="mb-2 h-7 w-4/5" />
            <ShimmerBlock className="mb-4 h-7 w-3/5" />

            {/* Location row */}
            <div className="mb-4 flex items-start gap-2">
              <ShimmerBlock className="h-5 w-5 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <ShimmerBlock className="h-4 w-2/3" />
                <ShimmerBlock className="h-3.5 w-1/2" />
              </div>
            </div>

            {/* Description lines */}
            <div className="mb-4 flex-1 space-y-2">
              <ShimmerBlock className="h-3.5 w-full" />
              <ShimmerBlock className="h-3.5 w-full" />
              <ShimmerBlock className="h-3.5 w-4/5" />
            </div>

            {/* CTA button */}
            <ShimmerBlock className="h-10 w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyCardSkeleton;
