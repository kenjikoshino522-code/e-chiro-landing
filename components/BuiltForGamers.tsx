"use client";

import { useEffect, useRef, useState } from "react";

export default function BuiltForGamers() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#07070C] px-4 py-24 text-center sm:px-6 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="motion-safe:animate-drift pointer-events-none absolute -left-1/4 top-[-20%] h-[70%] w-[70%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(30,0,220,0.5), transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="motion-safe:animate-drift-slow pointer-events-none absolute -right-1/4 bottom-[-25%] h-[70%] w-[70%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(30,0,220,0.4), transparent 65%)" }}
      />

      <div className="relative z-10">
        <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-yellow">
          <span aria-hidden="true" className="h-px w-5 bg-brand-yellow/60" />
          FOR THOSE WHO PLAY TO WIN
        </p>
        <h2
          className={`mx-auto mt-6 max-w-5xl font-heading font-black uppercase leading-[0.95] text-white transition-opacity duration-[1200ms] ease-premium-slow ${
            revealed ? "opacity-100" : "opacity-[0.15]"
          }`}
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
        >
          BUILT FOR
          <br />
          GAMERS.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          長時間の座り姿勢、反復動作、集中による緊張。競技シーンの体の負荷を理解した上で設計する、
          eスポーツ専門のコンディショニングです。
        </p>
      </div>
    </section>
  );
}
