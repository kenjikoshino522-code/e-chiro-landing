"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BuiltForGamers() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const lines: [HTMLElement | null, string, string][] = [
        [line1Ref.current, "top 85%", "top 55%"],
        [line2Ref.current, "top 75%", "top 45%"],
        [line3Ref.current, "top 65%", "top 35%"],
      ];
      lines.forEach(([el, start, end]) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0.1 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start, end, scrub: true },
          }
        );
      });

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { clipPath: "inset(35% 0% 35% 100%)", opacity: 0.5 },
          {
            clipPath: "inset(8% 0% 8% 0%)",
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 30%", scrub: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
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
          className="relative mx-auto mt-6 max-w-5xl font-heading font-black uppercase leading-[0.95] text-white"
          style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
        >
          <span
            ref={line1Ref}
            className="block"
            style={{ opacity: reduced ? 1 : 0.1 }}
          >
            BUILT
          </span>
          <span
            ref={line2Ref}
            className="relative z-20 block"
            style={{ opacity: reduced ? 1 : 0.1 }}
          >
            FOR
          </span>
          <div
            ref={photoRef}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 z-10 h-[60%] w-[42%] max-w-xs -translate-y-1/2 overflow-hidden rounded-2xl sm:w-[36%]"
            style={
              reduced
                ? { clipPath: "inset(8% 0% 8% 0%)", opacity: 1 }
                : { clipPath: "inset(35% 0% 35% 100%)", opacity: 0.5 }
            }
          >
            <Image
              src="/images/menu/menu-01-ultimate.jpg"
              alt=""
              width={800}
              height={800}
              className="h-full w-full object-cover"
              sizes="360px"
            />
          </div>
          <span
            ref={line3Ref}
            className="relative z-20 block"
            style={{ opacity: reduced ? 1 : 0.1 }}
          >
            <span className="bg-gradient-to-r from-[#5B4DFF] to-[#1E00DC] bg-clip-text text-transparent">
              GAMERS
            </span>
            .
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          長時間の座り姿勢、反復動作、集中による緊張。競技シーンの体の負荷を理解した上で設計する、
          eスポーツ専門のコンディショニングです。
        </p>
      </div>
    </section>
  );
}
