"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ChiroVsSeitai() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const centerMsgRef = useRef<HTMLDivElement>(null);
  const bigTypeRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Desktop: staggered scroll-scrubbed reveal (left -> right -> divider ->
  // center message -> big closing statement).
  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const stops: [HTMLElement | null, string, string][] = [
        [leftRef.current, "top 85%", "top 65%"],
        [rightRef.current, "top 78%", "top 58%"],
        [centerMsgRef.current, "top 55%", "top 35%"],
        [bigTypeRef.current, "top 40%", "top 10%"],
      ];
      stops.forEach(([el, start, end]) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start, end, scrub: true },
          }
        );
      });

      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 50%", scrub: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Mobile: single one-shot staggered reveal, no scrub.
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const mobileReveal = reduced || revealed;

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
          <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
          CHIROPRACTIC vs SEITAI
        </p>
        <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          カイロと整体、何が違う？
        </h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl lg:grid lg:grid-cols-2 lg:gap-0">
        <div
          ref={leftRef}
          className={`transition-all duration-700 ease-premium lg:pr-14 lg:text-right lg:transition-none ${
            mobileReveal ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <p className="font-heading text-xs font-bold tracking-widest text-brand-blue">CHIROPRACTIC</p>
          <h3 className="mt-2 font-heading text-xl font-bold text-neutral-900">カイロプラクティック</h3>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            背骨・関節などの身体機能を評価する考え方や体系があります。教育課程が4年制・4200時間以上
            （うち臨床実習1000時間以上を含む）という例もあります。
          </p>
        </div>

        <div
          ref={dividerRef}
          aria-hidden="true"
          className="mx-auto my-10 h-px w-24 origin-left scale-x-100 bg-brand-blue/40 lg:absolute lg:left-1/2 lg:top-0 lg:my-0 lg:h-full lg:w-px lg:origin-top lg:-translate-x-1/2 lg:scale-y-0 lg:bg-brand-blue"
        />

        <div
          ref={rightRef}
          className={`transition-all duration-700 ease-premium lg:pl-14 lg:transition-none ${
            mobileReveal ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          <p className="font-heading text-xs font-bold tracking-widest text-brand-blue">SEITAI</p>
          <h3 className="mt-2 font-heading text-xl font-bold text-neutral-900">整体</h3>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            日本では非常に広い意味で使われており、流派・店舗・施術者によって内容が大きく異なります。
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl text-center">
        <div className="grid grid-cols-1 gap-4 text-sm text-neutral-600 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4">
            <p className="font-bold text-neutral-900">日本の資格制度</p>
            <p className="mt-1">どちらも名称そのものに国家資格制度はありません。</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4">
            <p className="font-bold text-neutral-900">施術者の教育</p>
            <p className="mt-1">どちらも人によって大きく異なります。</p>
          </div>
        </div>
      </div>

      <div
        ref={centerMsgRef}
        className={`mx-auto mt-14 max-w-xl text-center transition-all duration-700 ease-premium lg:transition-none ${
          mobileReveal ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{ transitionDelay: "240ms" }}
      >
        <p className="font-heading text-lg font-bold leading-relaxed text-neutral-900 sm:text-xl">
          実は、日本ではどちらも名称そのものに国家資格制度はありません。
        </p>
      </div>

      <div
        ref={bigTypeRef}
        className={`mt-16 text-center transition-all duration-700 ease-premium lg:transition-none ${
          mobileReveal ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
        style={{ transitionDelay: "360ms" }}
      >
        <p
          className="font-heading font-black uppercase leading-[0.95] text-brand-blue"
          style={{ fontSize: "clamp(1.75rem, 6vw, 3.5rem)" }}
        >
          SO, WHO YOU CHOOSE MATTERS.
        </p>
        <p className="mt-3 text-base font-bold text-neutral-700 sm:text-lg">
          だから、「誰に受けるか」が大切。
        </p>
      </div>
    </section>
  );
}
