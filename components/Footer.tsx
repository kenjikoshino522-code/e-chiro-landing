import Image from "next/image";
import Link from "next/link";
import { LINE_URL, X_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 px-4 py-12 text-white/70 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[-8%] overflow-hidden select-none">
        <div
          className="whitespace-nowrap text-center font-heading font-black uppercase leading-none text-transparent opacity-[0.08] [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]"
          style={{ fontSize: "clamp(4rem, 19vw, 13rem)" }}
        >
          e-CHIRO
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Image
          src="/images/logo-square.jpg"
          alt="e-CHIRO"
          width={40}
          height={40}
          className="rounded-md"
        />

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center px-2 hover:text-white"
          >
            公式LINE
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center px-2 hover:text-white"
          >
            X (@echiro_dc)
          </a>
          <Link href="/manga" className="flex min-h-11 items-center px-2 hover:text-white">
            漫画アーカイブ
          </Link>
          <Link href="/tshirts" className="flex min-h-11 items-center px-2 hover:text-white">
            オリジナルグッズ
          </Link>
          <Link href="/tokushoho" className="flex min-h-11 items-center px-2 hover:text-white">
            特定商取引法に基づく表記
          </Link>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-white/40">
          サービスエリア: 都内近郊（自宅出張も可）・完全予約制・キャッシュレス決済対応（現金相談可）
        </p>

        <p className="text-xs text-white/30">© {new Date().getFullYear()} e-CHIRO</p>
      </div>
    </footer>
  );
}
