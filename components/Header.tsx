import Image from "next/image";
import Link from "next/link";
import { LINE_URL } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "サービスメニュー" },
  { href: "#corporate", label: "法人プラン" },
  { href: "#voice", label: "お客様の声" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="#top" className="flex min-h-11 items-center gap-2 py-2">
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

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-blue">
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center rounded-full bg-brand-blue px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 sm:px-5"
        >
          LINEで相談
        </a>
      </div>
    </header>
  );
}
