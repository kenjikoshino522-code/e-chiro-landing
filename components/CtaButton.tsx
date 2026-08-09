"use client";

import { useEffect, useRef, useState } from "react";

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
  magnetic = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant: Variant;
  external?: boolean;
  magnetic?: boolean;
  className?: string;
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLAnchorElement>(null);
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!magnetic) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function handleMove(e: MouseEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const radius = Math.max(rect.width, rect.height) / 2 + 60;
        const distance = Math.hypot(dx, dy);
        if (distance > radius) {
          setMagnetOffset((prev) => (prev.x === 0 && prev.y === 0 ? prev : { x: 0, y: 0 }));
          return;
        }
        const influence = 1 - distance / radius;
        setMagnetOffset({ x: dx * 0.15 * influence, y: dy * 0.15 * influence });
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [magnetic]);

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

  const magneticStyle = magnetic
    ? {
        transform: `translate(${magnetOffset.x}px, ${magnetOffset.y}px) scale(${isActive ? 0.97 : 1})`,
        transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease-out",
      }
    : undefined;

  return (
    <a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={handleClick}
      onMouseDown={() => magnetic && setIsActive(true)}
      onMouseUp={() => magnetic && setIsActive(false)}
      onMouseLeave={() => magnetic && setIsActive(false)}
      style={magneticStyle}
      className={`group relative overflow-hidden transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
        magnetic ? "" : "hover:scale-[1.04] active:scale-[0.97]"
      } ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[600ms] ease-out group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
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
