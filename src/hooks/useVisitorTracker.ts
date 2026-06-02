import { useEffect } from "react";

// 🔴 PASTE THE NEW URL YOU COPIED FROM STEP 1 HERE:
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzlKMv7eE_YX6h7F4KQ7n1fOX6iPaE6cU8Q2M__xQLZqUFt0JMPDcahWpzccxHbXvRPIQ/exec";

export function useVisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const isLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        // Skip session locking in local development to enable fast-refresh testing
        if (!isLocal) {
          const hasTracked = sessionStorage.getItem("src_visitor_tracked");
          if (hasTracked) {
            console.log(
              "[VisitorTracker] Production session already recorded. Skipping.",
            );
            return;
          }
        }

        let payload;

        if (isLocal) {
          // Dynamic mock array to generate hot-zones on your Looker Map
          const mockLocations = [
            {
              city: "General Santos City",
              region: "SOCCSKSARGEN",
              ip: "112.204.142.85",
            },
            { city: "Davao City", region: "Davao Region", ip: "122.54.45.12" },
            { city: "Polomolok", region: "SOCCSKSARGEN", ip: "122.2.3.4" },
            {
              city: "Koronadal City",
              region: "SOCCSKSARGEN",
              ip: "112.198.74.22",
            },
            {
              city: "Manila",
              region: "National Capital Region",
              ip: "49.145.128.5",
            },
          ];

          // Randomize selection on every refresh to generate realistic analytics data
          const selection =
            mockLocations[Math.floor(Math.random() * mockLocations.length)];
          payload = {
            ip: selection.ip,
            city: selection.city,
            region: selection.region,
            country: "Philippines",
          };
          console.log(
            `[VisitorTracker] Dev Mode active. Dispatching mock tracking payload for: ${selection.city}`,
          );
        } else {
          // Standard production live geo-lookup infrastructure
          const response = await fetch("https://ipapi.co/json/");
          if (!response.ok)
            throw new Error("Geo IP tracking provider unavailable");
          const geo = await response.json();

          payload = {
            ip: geo.ip || "Unknown IP",
            city: geo.city || "Unknown City",
            region: geo.region || "Unknown Region",
            country: geo.country_name || "Unknown Country",
          };
          sessionStorage.setItem("src_visitor_tracked", "true");
        }

        // Deliver payload via a CORS-exempt text/plain formatting structure
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });

        console.log(
          "✅ [VisitorTracker] Analytics packet successfully transmitted.",
        );
      } catch (err) {
        console.error("❌ [VisitorTracker] Transmission failure:", err);
      }
    };

    trackVisitor();
  }, []);
}
