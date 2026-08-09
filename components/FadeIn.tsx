"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fade" | "scale" | "slide-up" | "slide-left" | "slide-right" | "mask";

const VARIANT_CLASSES: Record<Exclude<Variant, "mask">, { hidden: string; visible: string }> = {
  fade: { hidden: "translate-y-5 opacity-0", visible: "translate-y-0 opacity-100" },
  scale: { hidden: "-translate-y-2 scale-95 opacity-0", visible: "translate-y-0 scale-100 opacity-100" },
  "slide-up": { hidden: "translate-y-10 opacity-0", visible: "translate-y-0 opacity-100" },
  "slide-left": { hidden: "-translate-x-10 opacity-0", visible: "translate-x-0 opacity-100" },
  "slide-right": { hidden: "translate-x-10 opacity-0", visible: "translate-x-0 opacity-100" },
};

export default function FadeIn({
  children,
  delay = 0,
  variant = "fade",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === "mask") {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <div
          className={`transition-transform duration-[900ms] ease-premium ${
            visible ? "translate-y-0" : "translate-y-[110%]"
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {children}
        </div>
      </div>
    );
  }

  const classes = VARIANT_CLASSES[variant];

  return (
    <div
      ref={ref}
      className={`transition-all duration-[600ms] ease-out ${
        visible ? classes.visible : classes.hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
