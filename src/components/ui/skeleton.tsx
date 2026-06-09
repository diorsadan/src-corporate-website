import { cn } from "./utils";

interface ShimmerBlockProps extends React.ComponentProps<"div"> {
  /** When true, shimmer animation is disabled (static placeholder) */
  static?: boolean;
}

/**
 * Base shimmer placeholder — use as the building block for all skeleton layouts.
 */
function ShimmerBlock({ className, static: isStatic, ...props }: ShimmerBlockProps) {
  return (
    <div
      data-slot="shimmer-block"
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-100",
        !isStatic &&
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/75 before:to-transparent motion-reduce:before:animate-none",
        className,
      )}
      {...props}
    />
  );
}

/** @deprecated Use ShimmerBlock — kept for backward compatibility */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <ShimmerBlock className={className} {...props} />;
}

export { Skeleton, ShimmerBlock };
