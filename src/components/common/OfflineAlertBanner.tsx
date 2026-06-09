import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";
import { useAccessibleAnimation } from "@/hooks/useAccessibleAnimation";

/**
 * Subtle, fixed corporate banner shown when the browser loses connectivity.
 * Mounted once at the layout root — does not block page interaction.
 */
export function OfflineAlertBanner() {
  const { isOnline, hasDetectedChange } = useNetworkStatusContext();
  const { getMotionProps } = useAccessibleAnimation();

  const isVisible = hasDetectedChange && !isOnline;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          {...getMotionProps({
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.25, ease: "easeOut" },
          })}
          className="fixed top-0 left-0 right-0 z-[200] border-b border-amber-200/80 bg-amber-50/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 sm:px-6">
            <WifiOff
              className="h-4 w-4 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <p className="text-center text-sm font-medium text-amber-900">
              You are currently offline. Some features may be unavailable until
              your connection is restored.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
