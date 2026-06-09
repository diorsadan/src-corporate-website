import { useEffect, useState } from "react";

export interface NetworkStatus {
  isOnline: boolean;
  /** True once the browser has reported at least one online/offline event */
  hasDetectedChange: boolean;
  /** ISO timestamp of the last connectivity transition */
  lastChangedAt: string | null;
}

function readNetworkStatus(): Pick<NetworkStatus, "isOnline"> {
  if (typeof navigator === "undefined") {
    return { isOnline: true };
  }
  return { isOnline: navigator.onLine };
}

/**
 * Tracks browser connectivity via `online` / `offline` window events.
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>(() => ({
    ...readNetworkStatus(),
    hasDetectedChange: false,
    lastChangedAt: null,
  }));

  useEffect(() => {
    const updateStatus = (isOnline: boolean) => {
      setStatus({
        isOnline,
        hasDetectedChange: true,
        lastChangedAt: new Date().toISOString(),
      });
    };

    const handleOnline = () => updateStatus(true);
    const handleOffline = () => updateStatus(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return status;
}

/** User-facing copy when a form is submitted while offline */
export const OFFLINE_SUBMISSION_MESSAGE =
  "You appear to be offline. Please check your internet connection and try again when you are back online.";
