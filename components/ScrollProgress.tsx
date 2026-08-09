"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    function update() {
      raf = 0;
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0);
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-50 hidden h-full w-[2px] bg-neutral-900/5 lg:block"
    >
      <div
        className="w-full bg-brand-blue transition-[height] duration-100 ease-out"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
