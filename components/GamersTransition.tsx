"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GamersTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Desktop: pin the wrapper and scrub the card from a small rounded tile to
  // a fullscreen panel as the user scrolls.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (!wrapperRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.22, borderRadius: "40px" },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Mobile / reduced-motion: a single lightweight one-shot reveal, no pin.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!mobile && !reduced) return;
    if (reduced) {
      setRevealed(true);
      return;
    }

    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[50vh] overflow-hidden bg-white lg:h-[70vh]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={cardRef}
          className={`flex aspect-[4/3] w-64 items-center justify-center overflow-hidden bg-[#07070C] shadow-2xl transition-all duration-[900ms] ease-premium lg:w-72 lg:transition-none ${
            revealed ? "scale-100 rounded-none" : "scale-[0.22] rounded-[40px]"
          }`}
        >
          <p className="px-6 text-center font-heading text-lg font-black uppercase leading-tight text-white/40 sm:text-2xl">
            BUILT FOR
            <br />
            GAMERS.
          </p>
        </div>
      </div>
    </div>
  );
}
