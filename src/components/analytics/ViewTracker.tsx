"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Один раз отправляет событие, когда секция попадает в viewport. */
export function ViewTracker({
  sectionId,
  event,
}: {
  sectionId: string;
  event: AnalyticsEvent;
}) {
  const sent = useRef(false);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || sent.current) return;
        sent.current = true;
        track(event);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [event, sectionId]);

  return null;
}
