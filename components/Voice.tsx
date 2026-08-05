import Link from "next/link";
import { X_URL } from "@/lib/constants";

export default function Voice() {
  return (
    <section id="voice" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold tracking-widest text-brand-blue">VOICE OF PLAYERS</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Tier UPを実感した声
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-700">
          施術を受けた選手・配信者の皆さまから、たくさんの声をいただいています。
        </p>

        <Link
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-black text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </span>
          <span>
            <span className="block text-sm font-bold text-neutral-900">
              X（旧Twitter）でも感想をポストいただいています
            </span>
            <span className="mt-1 block text-sm font-medium text-brand-blue">@echiro_dc をフォロー →</span>
          </span>
        </Link>

        <div className="mx-auto mt-16 max-w-xl rounded-2xl bg-neutral-50 p-8">
          <p className="text-sm leading-relaxed text-neutral-700">
            選手個人へのケアはもちろん、チーム単位でのコンディショニング導入にご興味のある運営者様は、
            お気軽にご相談ください。
          </p>
          <Link
            href="#corporate"
            className="mt-4 inline-block text-sm font-bold text-brand-blue underline underline-offset-4"
          >
            法人プランのご相談はこちら →
          </Link>
        </div>
      </div>
    </section>
  );
}
