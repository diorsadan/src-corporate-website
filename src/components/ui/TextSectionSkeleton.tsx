import { ShimmerBlock } from "@/components/ui/skeleton";

export interface TextSectionSkeletonProps {
  /** Include a section heading block */
  showHeading?: boolean;
  /** Number of paragraph lines below the heading */
  paragraphLines?: number;
  /** Optional full-width content block below text (e.g. map, chart) */
  contentBlockHeight?: number;
  className?: string;
}

/**
 * Shimmer placeholder for hero / section headers and body copy.
 * Dimensions match typical section typography to prevent CLS.
 */
export function TextSectionSkeleton({
  showHeading = true,
  paragraphLines = 3,
  contentBlockHeight,
  className = "",
}: TextSectionSkeletonProps) {
  return (
    <div className={className} aria-busy="true" aria-label="Loading section">
      {showHeading && (
        <div className="mb-4 space-y-3">
          <ShimmerBlock className="h-10 w-full max-w-xl md:h-12" />
          <ShimmerBlock className="h-10 w-full max-w-lg md:h-12" />
        </div>
      )}

      <div className="mb-8 max-w-3xl space-y-2.5">
        {Array.from({ length: paragraphLines }).map((_, index) => (
          <ShimmerBlock
            key={index}
            className={`h-5 ${index === paragraphLines - 1 ? "w-4/5" : "w-full"}`}
          />
        ))}
      </div>

      {contentBlockHeight != null && (
        <ShimmerBlock
          className="w-full rounded-xl"
          style={{ height: contentBlockHeight }}
        />
      )}
    </div>
  );
}

export default TextSectionSkeleton;
