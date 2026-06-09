import React, { createContext, useContext, useMemo } from "react";
import {
  useNetworkStatus,
  OFFLINE_SUBMISSION_MESSAGE,
  type NetworkStatus,
} from "@/hooks/useNetworkStatus";

interface NetworkStatusContextValue extends NetworkStatus {
  /** Returns an error message when offline, otherwise null */
  getOfflineSubmissionError: () => string | null;
}

const NetworkStatusContext = createContext<NetworkStatusContextValue | null>(
  null,
);

export function NetworkStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const networkStatus = useNetworkStatus();

  const value = useMemo<NetworkStatusContextValue>(
    () => ({
      ...networkStatus,
      getOfflineSubmissionError: () =>
        networkStatus.isOnline ? null : OFFLINE_SUBMISSION_MESSAGE,
    }),
    [networkStatus],
  );

  return (
    <NetworkStatusContext.Provider value={value}>
      {children}
    </NetworkStatusContext.Provider>
  );
}

export function useNetworkStatusContext(): NetworkStatusContextValue {
  const context = useContext(NetworkStatusContext);
  if (!context) {
    throw new Error(
      "useNetworkStatusContext must be used within a NetworkStatusProvider",
    );
  }
  return context;
}
