import { motion } from "framer-motion";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ConsultationFormErrorBannerProps {
  message: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export function ConsultationFormErrorBanner({
  message,
  showRetryButton = false,
  onRetry,
}: ConsultationFormErrorBannerProps) {
  return (
    <motion.div
      id="consultation-form-alert"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3"
    >
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-red-900 mb-1">
          Submission Failed
        </p>
        <p className="text-sm text-red-700">{message}</p>
        {showRetryButton && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}
