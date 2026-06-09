import { RouterProvider } from "react-router";
import { router } from "./routes";
import { NetworkStatusProvider } from "@/context/NetworkStatusContext";
import { useVisitorTracker } from "@/hooks/useVisitorTracker";

export default function App() {
  useVisitorTracker();

  return (
    <NetworkStatusProvider>
      <RouterProvider router={router} />
    </NetworkStatusProvider>
  );
}
