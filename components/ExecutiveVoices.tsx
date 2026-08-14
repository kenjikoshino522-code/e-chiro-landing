"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type ExecutiveVoice = {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  companyLogo?: string;
};

// No verified executive/partner testimonials with a real photo exist yet.
// Add entries here once real name + role + company + photo + quote are
// available — the section renders nothing while this stays empty.
const EXECUTIVE_VOICES: ExecutiveVoice[] = [];

function ExecutiveCard({ voice }: { voice: ExecutiveVoice }) {
  return (
    <div
      className="relative w-[300px] flex-none snap-start overflow-hidden rounded-2xl border bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 sm:w-[420px] lg:w-[460px]"
      style={{ borderColor: "rgba(0,0,0,0.08)" }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 -top-6 select-none font-heading text-[7rem] font-black leading-none text-brand-blue opacity-[0.06]"
      >
        “
      </span>

      <div className="relative flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 flex-none overflow-hidden rounded-[22px] bg-neutral-100">
            <Image
              src={voice.image}
              alt={voice.name}
              width={128}
              height={128}
              className="h-full w-full object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <p className="font-heading text-base font-bold text-neutral-900">{voice.name}</p>
            <p className="text-xs font-medium text-neutral-500">
              {voice.role}｜{voice.company}
            </p>
          </div>
          {voice.companyLogo && (
            <Image
              src={voice.companyLogo}
              alt={voice.company}
              width={80}
              height={32}
              className="ml-auto h-6 w-auto flex-none object-contain"
            />
          )}
        </div>

        <p className="relative mt-5 text-sm leading-relaxed text-neutral-700">{voice.quote}</p>
      </div>
    </div>
  );
}

export default function ExecutiveVoices() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = sectionRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            track,
            { x: 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.9, ease: "power2.out" }
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onScroll() {
      if (!track) return;
      const cardWidth = track.firstElementChild
        ? (track.firstElementChild as HTMLElement).offsetWidth + 24
        : 1;
      setActiveIndex(Math.round(track.scrollLeft / cardWidth));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  if (EXECUTIVE_VOICES.length === 0) return null;

  return (
    <section ref={sectionRef} className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
          <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
          EXECUTIVE VOICES
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
          導入企業・パートナーの声
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-[92vw] sm:max-w-[720px] lg:max-w-[840px]">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pl-4 sm:pl-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXECUTIVE_VOICES.map((voice) => (
            <ExecutiveCard key={voice.name} voice={voice} />
          ))}
          <div aria-hidden="true" className="w-px flex-none" />
        </div>
      </div>

      {EXECUTIVE_VOICES.length > 1 && (
        <div className="mt-6 flex justify-center gap-1.5 sm:hidden" aria-hidden="true">
          {EXECUTIVE_VOICES.map((voice, i) => (
            <span
              key={voice.name}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-5 bg-brand-blue" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
