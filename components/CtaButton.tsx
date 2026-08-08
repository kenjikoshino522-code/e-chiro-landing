"use client";

import { useState } from "react";

type Variant = "blue" | "yellow" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  blue: "bg-brand-blue text-white hover:shadow-[0_0_24px_rgba(30,0,220,0.45)]",
  yellow: "bg-brand-yellow text-brand-blue hover:shadow-[0_0_24px_rgba(255,230,0,0.55)]",
  outline: "border border-neutral-300 text-neutral-900 hover:shadow-[0_0_16px_rgba(0,0,0,0.1)]",
};

const RIPPLE_COLOR: Record<Variant, string> = {
  blue: "bg-white/40",
  yellow: "bg-brand-blue/20",
  outline: "bg-neutral-900/10",
};

type Ripple = { id: number; x: number; y: number; size: number };

export default function CtaButton({
  href,
  children,
  variant,
  external = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant: Variant;
  external?: boolean;
  className?: string;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.6;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={handleClick}
      className={`relative overflow-hidden transition duration-300 ease-out hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-full ${RIPPLE_COLOR[variant]} animate-ripple`}
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </a>
  );
}
