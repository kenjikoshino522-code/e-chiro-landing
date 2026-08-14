"use client";

import { useEffect, useRef, useState } from "react";
import FadeIn from "@/components/FadeIn";

const CARD_VARIANTS = ["slide-left", "slide-up", "slide-right"] as const;

const PILLARS = [
  {
    number: "01",
    title: "RED FLAGを見逃さない専門性",
    body: "DC（Doctor of Chiropractic）資格に基づき、危険な症状（レッドフラッグ）を見極めた上で施術。必要な場合は整形外科への受診も遠慮なく提案します。",
  },
  {
    number: "02",
    title: "科学的根拠に基づく施術",
    body: "感覚や経験則だけに頼らず、Human Biology（人体生物学）の学術的背景から、なぜその施術が必要かを言語化してお伝えします。",
  },
  {
    number: "03",
    title: "試合後もパフォーマンスを維持するセルフケア",
    body: "施術だけで終わらせません。日常でできるセルフケア（ストレッチ、水分補給、姿勢改善など）を必ず持ち帰ってもらい、「その場限りの回復」で終わらせない設計です。",
  },
];

export default function WhyUs() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <FadeIn variant="scale" className="text-center lg:text-left">
            <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue lg:justify-start">
              <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
              WHY UPGRADE WITH US
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              なぜ
              <br className="hidden lg:block" />
              e-CHIROが
              <br className="hidden lg:block" />
              選ばれるのか
            </h2>
          </FadeIn>
        </div>

        <div className="mt-14 space-y-6 lg:mt-0 lg:space-y-0">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="lg:flex lg:min-h-[42vh] lg:flex-col lg:justify-center"
            >
              <FadeIn variant={CARD_VARIANTS[i]} delay={i * 120}>
                <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none lg:hover:translate-y-0">
                  <span
                    className={`font-heading text-3xl font-black transition-colors duration-500 ease-out lg:text-6xl ${
                      active === i ? "text-brand-blue" : "text-neutral-300"
                    }`}
                  >
                    {pillar.number}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-neutral-900 lg:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 lg:text-base">{pillar.body}</p>
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
