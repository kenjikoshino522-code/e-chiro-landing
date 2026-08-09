"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/CtaButton";
import { LINE_URL, SITE_TAGLINE_EN_LINE1, SITE_TAGLINE_EN_LINE2 } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const portraitParallaxRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Depth parallax: background mark, portrait, and foreground content move at
  // different rates on scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (bgTextRef.current) {
        gsap.to(bgTextRef.current, {
          y: 60,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (portraitParallaxRef.current) {
        gsap.to(portraitParallaxRef.current, {
          y: 30,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (foregroundRef.current) {
        gsap.to(foregroundRef.current, {
          y: 10,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse-follow glow (desktop pointer only), smoothed with lerp so it never
  // snaps directly to the cursor.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const glow = glowRef.current;
    const section = sectionRef.current;
    if (!glow || !section) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;
    const maxOffset = 28;

    function handleMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      const dx = e.clientX - rect.left - rect.width / 2;
      const dy = e.clientY - rect.top - rect.height / 2;
      targetX = Math.max(-maxOffset, Math.min(maxOffset, dx * 0.04));
      targetY = Math.max(-maxOffset, Math.min(maxOffset, dy * 0.04));
    }

    function tick() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (glow) glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative overflow-hidden bg-brand-blue">
      <div
        ref={glowRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-[-30%] h-[140%] w-[140%] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-[1400ms] ease-premium-slow ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "radial-gradient(circle, rgba(51,24,255,0.55), transparent 60%)" }}
      />

      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="font-heading font-black text-white/[0.05]"
          style={{ fontSize: "clamp(10rem, 32vw, 26rem)", lineHeight: 1 }}
        >
          DC
        </span>
      </div>

      <h1 className="sr-only font-heading">
        e-CHIRO | {SITE_TAGLINE_EN_LINE1} {SITE_TAGLINE_EN_LINE2}
      </h1>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-24 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pb-28 lg:pt-20">
        <div ref={foregroundRef} className="text-center lg:text-left">
          <p
            className={`font-heading text-xs font-bold tracking-[0.35em] text-white/70 transition-all duration-[900ms] ease-premium ${
              visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            ESPORTS CHIROPRACTIC
          </p>

          <div aria-hidden="true" className="mt-4">
            <div className="overflow-hidden">
              <div
                className={`transition-transform duration-[900ms] ease-premium ${
                  visible ? "translate-y-0" : "translate-y-[110%]"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <span
                  className="block font-heading font-black uppercase leading-[0.95] text-white"
                  style={{ fontSize: "clamp(2.5rem, 8.5vw, 5.25rem)" }}
                >
                  PLAY LONGER.
                </span>
              </div>
            </div>
            <div className="mt-1 overflow-hidden lg:mt-2">
              <div
                className={`transition-transform duration-[900ms] ease-premium ${
                  visible ? "translate-y-0" : "translate-y-[110%]"
                }`}
                style={{ transitionDelay: "630ms" }}
              >
                <span
                  className="block font-heading font-black uppercase leading-[0.95] text-white"
                  style={{ fontSize: "clamp(2.5rem, 8.5vw, 5.25rem)" }}
                >
                  MOVE BETTER.
                </span>
              </div>
            </div>
          </div>

          <div
            className={`mt-9 flex justify-center transition-all duration-[900ms] ease-premium lg:justify-start ${
              visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
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

        <div ref={portraitParallaxRef} className="flex justify-center lg:justify-end">
          <div
            className="aspect-square w-[190px] overflow-hidden rounded-[2rem] shadow-2xl transition-[clip-path] duration-[900ms] ease-premium sm:w-[230px] lg:w-[clamp(220px,20vw,320px)]"
            style={{
              transitionDelay: "900ms",
              clipPath: visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            }}
          >
            <Image
              src="/images/dr-ken-headshot.jpg"
              alt="Dr.KEN"
              width={640}
              height={640}
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 320px, 230px"
            />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[60] flex items-center justify-center">
        <span
          className="font-heading text-xl font-bold tracking-[0.4em] text-white transition-opacity duration-300 ease-out"
          style={{ transitionDelay: "150ms", opacity: visible ? 0 : 1 }}
        >
          e-CHIRO
        </span>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-50">
        <div
          className="absolute inset-x-0 top-0 h-1/2 bg-brand-blue transition-transform duration-[700ms] ease-premium"
          style={{ transitionDelay: "150ms", transform: visible ? "translateY(-100%)" : "translateY(0)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-blue transition-transform duration-[700ms] ease-premium"
          style={{ transitionDelay: "150ms", transform: visible ? "translateY(100%)" : "translateY(0)" }}
        />
      </div>
    </section>
  );
}
