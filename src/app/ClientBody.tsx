"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HEARTBEAT_MS = 40_000;

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const visitor = useRef("");
  const activeArea = Boolean(pathname && ["/feed", "/messages", "/live", "/creator/"].some((path) => pathname === path || pathname.startsWith(path.endsWith("/") ? path : `${path}/`)));

  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  useEffect(() => {
    if (!activeArea) return;
    let visitorId: string;
    try {
      visitorId = visitor.current || crypto.randomUUID();
      visitor.current = visitorId;
    } catch {
      return;
    }
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const ping = async () => {
      try {
        const response = await fetch("/api/presence/", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, action: "heartbeat" }),
        });
        if (response.ok && !stopped) {
          const result = await response.json();
          try { sessionStorage.setItem("strictly-woofs:shared-posts", JSON.stringify(result.posts)); } catch { /* The event still updates the open feed. */ }
          window.dispatchEvent(new CustomEvent("woofs:shared-posts", { detail: result.posts }));
        }
      } catch {
        // The rest of the app remains usable when presence is unavailable.
      } finally {
        if (!stopped) timer = setTimeout(ping, HEARTBEAT_MS);
      }
    };
    const leave = () => {
      navigator.sendBeacon?.("/api/presence/", JSON.stringify({ visitorId, action: "leave" }));
    };
    const resume = (event: PageTransitionEvent) => { if (event.persisted) { clearTimeout(timer); void ping(); } };
    void ping();
    window.addEventListener("pagehide", leave);
    window.addEventListener("pageshow", resume);
    return () => {
      stopped = true;
      clearTimeout(timer);
      window.removeEventListener("pagehide", leave);
      window.removeEventListener("pageshow", resume);
      leave();
    };
  }, [activeArea]);

  return <div className="antialiased">{children}</div>;
}
