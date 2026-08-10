"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let triggered = false;

    function runCountUp() {
      if (triggered) return;
      triggered = true;

      const duration = 800;
      const start = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCountUp();
          observer.unobserve(el);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);

    // Safety net: this is a price display, so it must never sit stuck at 0.
    // Set the final value directly (not via the rAF-driven animation) so this
    // still works even if requestAnimationFrame never fires, e.g. a
    // backgrounded or non-visible tab.
    const fallback = setTimeout(() => {
      if (triggered) return;
      triggered = true;
      setDisplay(value);
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("ja-JP")}
      {suffix}
    </span>
  );
}
