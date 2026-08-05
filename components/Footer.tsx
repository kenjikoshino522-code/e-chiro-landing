import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, LINE_URL, X_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 px-4 py-12 text-white/70 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Image
          src="/images/logo-square.jpg"
          alt="e-CHIRO"
          width={40}
          height={40}
          className="rounded-md"
        />

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            公式LINE
          </a>
          <a href={X_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            X (@echiro_dc)
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
            {CONTACT_EMAIL}
          </a>
        </div>

        <p className="max-w-md text-xs leading-relaxed text-white/40">
          サービスエリア: 都内近郊（自宅出張も可）・完全予約制・キャッシュレス決済対応（現金相談可）
        </p>

        <p className="text-xs text-white/30">© {new Date().getFullYear()} e-CHIRO</p>
      </div>
    </footer>
  );
}
