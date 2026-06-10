"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { calNamespace } from "@/lib/cal";

export default function CalProvider() {
  useEffect(() => {
    void (async () => {
      try {
        const cal = await getCalApi({ namespace: calNamespace });

        cal("ui", {
          theme: "auto",
          layout: "month_view",
          styles: {
            branding: {
              brandColor: "#171717",
            },
          },
          hideEventTypeDetails: false,
        });

      } catch (error) {
        console.error("Failed to initialize Cal.com embed:", error);
      }
    })();
  }, []);

  return null;
}
