import { Loader2, X, RotateCcw } from "lucide-react";
import type { SubmitProgress } from "@/utils/formSubmit";

interface SubmissionProgressPanelProps {
  progress: SubmitProgress | null;
  onCancel: () => void;
  onRetryNow: () => void;
  /** Label shown during the initial submit attempt */
  submittingLabel?: string;
}

/**
 * Transparent retry UX — surfaces attempt count and manual controls
 * instead of an opaque infinite spinner.
 */
export function SubmissionProgressPanel({
  progress,
  onCancel,
  onRetryNow,
  submittingLabel = "Sending request",
}: SubmissionProgressPanelProps) {
  if (!progress) return null;

  const isBackoff = progress.phase === "backoff";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <Loader2
          className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-emerald-600"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">
            {isBackoff
              ? `Retrying attempt ${progress.attempt} of ${progress.maxAttempts}…`
              : `${submittingLabel} (attempt ${progress.attempt} of ${progress.maxAttempts})…`}
          </p>
          {isBackoff && progress.backoffMs != null && (
            <p className="mt-0.5 text-xs text-slate-600">
              Waiting {Math.ceil(progress.backoffMs / 1000)}s before the next
              attempt due to a connection issue.
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {isBackoff && (
              <button
                type="button"
                onClick={onRetryNow}
                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Try Again Now
              </button>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
