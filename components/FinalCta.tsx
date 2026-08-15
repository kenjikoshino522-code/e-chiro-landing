"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/CtaButton";
import { LINE_URL } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [filled, setFilled] = useState(false);
  const filledRef = useRef(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Desktop: scroll-scrubbed circle expansion; content reveals once it's
  // mostly covered the screen.
  useEffect(() => {
    if (reduced) {
      setFilled(true);
      return;
    }
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (!sectionRef.current || !circleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        circleRef.current,
        { scale: 0.3 },
        {
          scale: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 15%",
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0.7 && !filledRef.current) {
                filledRef.current = true;
                setFilled(true);
              }
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  // Mobile: simple one-shot scale reveal, no scrub.
  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-neutral-950 px-4 py-24 text-center text-white sm:px-6 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-4 overflow-hidden select-none">
        <div
          className="whitespace-nowrap text-center font-heading font-black uppercase leading-none text-transparent opacity-[0.22] [-webkit-text-stroke:2.5px_rgba(255,255,255,0.85)]"
          style={{ fontSize: "clamp(4rem, 16vw, 11rem)" }}
        >
          LEVEL UP
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          ref={circleRef}
          className={`h-[14vmax] w-[14vmax] rounded-full bg-brand-blue transition-transform duration-[900ms] ease-premium lg:transition-none ${
            filled ? "scale-[15]" : "scale-[0.3]"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <p
          className={`flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-yellow transition-all duration-[600ms] ease-premium ${
            filled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <span aria-hidden="true" className="h-px w-5 bg-white/40" />
          READY?
        </p>

        <div className="mt-3 overflow-hidden">
          <h2
            className={`font-heading text-4xl font-black tracking-tight transition-transform duration-[900ms] ease-premium sm:text-5xl ${
              filled ? "translate-y-0" : "translate-y-[110%]"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            LEVEL UP YOUR BODY
          </h2>
        </div>

        <p
          className={`mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 transition-all duration-[600ms] ease-premium ${
            filled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: "220ms" }}
        >
          完全予約制・都内近郊に出張対応。まずはLINEでお気軽にご相談ください。
        </p>

        <div
          className={`mt-10 flex justify-center transition-all duration-[600ms] ease-premium ${
            filled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: "380ms" }}
        >
          <CtaButton
            href={LINE_URL}
            variant="yellow"
            magnetic
            className="w-full max-w-sm rounded-full px-8 py-4 text-center text-base font-extrabold shadow-lg sm:text-lg"
          >
            LINEで予約・相談する
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
