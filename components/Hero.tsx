"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CtaButton from "@/components/CtaButton";
import { LINE_URL, SITE_TAGLINE_EN_LINE1, SITE_TAGLINE_EN_LINE2 } from "@/lib/constants";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-brand-blue">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-[-30%] h-[140%] w-[140%] -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-[1400ms] ease-premium-slow ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "radial-gradient(circle, rgba(51,24,255,0.55), transparent 60%)" }}
      />

      <h1 className="sr-only font-heading">
        e-CHIRO | {SITE_TAGLINE_EN_LINE1} {SITE_TAGLINE_EN_LINE2}
      </h1>

      <p
        className={`relative z-10 pt-6 text-center font-heading text-xs font-bold tracking-[0.35em] text-white/70 transition-all duration-[900ms] ease-premium ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        ESPORTS CHIROPRACTIC
      </p>

      <div className="relative z-10 mx-auto mt-4 max-w-6xl">
        <div
          className="transition-[clip-path] duration-[900ms] ease-premium"
          style={{
            transitionDelay: "400ms",
            clipPath: visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          }}
        >
          <Image
            src="/images/header-logo.jpg"
            alt={`e-CHIRO. ${SITE_TAGLINE_EN_LINE1} ${SITE_TAGLINE_EN_LINE2}`}
            width={3000}
            height={1000}
            priority
            className="h-[220px] w-full object-cover object-center sm:h-auto sm:object-contain"
            sizes="100vw"
          />
        </div>
      </div>

      <div
        className={`relative z-10 flex justify-center px-4 pb-10 pt-4 transition-all duration-[900ms] ease-premium sm:pb-14 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
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
    </section>
  );
}
