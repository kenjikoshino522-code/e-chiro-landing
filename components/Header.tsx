"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CtaButton from "@/components/CtaButton";
import { LINE_URL } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "/#chiro", label: "About" },
  { href: "/#about", label: "施術者" },
  { href: "/#menu", label: "サービスメニュー" },
  { href: "/#corporate", label: "法人プラン" },
  { href: "/#voice", label: "お客様の声" },
  { href: "/manga", label: "マンガ" },
  { href: "/tshirts", label: "グッズ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "border-b border-black/5 bg-white/95 shadow-lg backdrop-blur-md"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/#top" className="flex min-h-11 items-center gap-2 py-2">
          <Image
            src="/images/logo-square.jpg"
            alt="e-CHIRO"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-lg font-extrabold tracking-tight text-brand-blue">
            e-CHIRO
          </span>
        </Link>

        <nav className="hidden items-center gap-5 whitespace-nowrap text-sm font-medium text-neutral-700 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </nav>

        <CtaButton
          href={LINE_URL}
          variant="blue"
          className="flex min-h-11 items-center rounded-full px-4 py-2.5 text-sm font-bold sm:px-5"
        >
          LINEで相談
        </CtaButton>
      </div>
    </header>
  );
}
