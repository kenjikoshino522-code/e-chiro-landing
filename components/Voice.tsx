import Image from "next/image";
import Link from "next/link";
import { X_URL } from "@/lib/constants";

const SCREENSHOTS = [
  { src: "/images/testimonials/rayflitz.jpg", w: 570, h: 113, alt: "RayFlitzさんの投稿" },
  { src: "/images/testimonials/saladin.jpg", w: 571, h: 180, alt: "皿さんの投稿" },
  { src: "/images/testimonials/furoshiki.jpg", w: 563, h: 172, alt: "フロシキラボさんの投稿" },
  { src: "/images/testimonials/dendaira-1.jpg", w: 556, h: 243, alt: "田平孝太郎さんの投稿" },
  { src: "/images/testimonials/dendaira-2.jpg", w: 555, h: 197, alt: "田平孝太郎さんの投稿" },
  { src: "/images/testimonials/dendaira-3.jpg", w: 545, h: 211, alt: "田平孝太郎さんの投稿" },
  { src: "/images/testimonials/dendaira-4.jpg", w: 578, h: 106, alt: "田平孝太郎さんの投稿" },
  { src: "/images/testimonials/tsuchiya.jpg", w: 561, h: 282, alt: "SG_Tsuchiyaさんの投稿" },
  { src: "/images/testimonials/hazuki.jpg", w: 571, h: 506, alt: "葉月あすかさんの投稿" },
  { src: "/images/testimonials/ao.png", w: 586, h: 211, alt: "VARREL AOさんの投稿" },
  { src: "/images/testimonials/aoyama.jpg", w: 578, h: 220, alt: "EQNX AOYAMA333さんの投稿" },
  { src: "/images/testimonials/arurun.png", w: 589, h: 563, alt: "arurunさんの投稿" },
  { src: "/images/testimonials/murai.png", w: 585, h: 420, alt: "Ryosuke Muraiさんの投稿" },
  { src: "/images/testimonials/fighter.png", w: 581, h: 603, alt: "FIREWORKSさんの投稿" },
  { src: "/images/testimonials/hagihara.png", w: 587, h: 641, alt: "Junpei Hagiharaさんの投稿" },
  { src: "/images/testimonials/hasegawa.png", w: 460, h: 513, alt: "長谷川優貴さんの投稿" },
  { src: "/images/testimonials/hokuto.png", w: 587, h: 507, alt: "Hokutoさんの投稿" },
  { src: "/images/testimonials/ikari.png", w: 505, h: 652, alt: "KN iKARiさんの投稿" },
  { src: "/images/testimonials/miitan.png", w: 581, h: 221, alt: "みいたん。さんの投稿" },
  { src: "/images/testimonials/moruko.png", w: 467, h: 107, alt: "モル子さんの投稿" },
];

function ShotCard({ shot }: { shot: (typeof SCREENSHOTS)[number] }) {
  return (
    <div className="w-[280px] flex-none overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm sm:w-[320px]">
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.w}
        height={shot.h}
        className="h-auto w-full"
        sizes="320px"
      />
    </div>
  );
}

export default function Voice() {
  const track = [...SCREENSHOTS, ...SCREENSHOTS];

  return (
    <section id="voice" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-sm font-bold tracking-widest text-brand-blue">VOICE OF PLAYERS</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Tier UPを実感した声
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-neutral-700">
          <span className="text-brand-yellow">★★★★★</span>
          <span>5.0（MOSHレビュー13件）</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
          施術を受けた選手・配信者の皆さまから、たくさんの声をいただいています。
        </p>
      </div>

      <div className="group relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max items-center gap-6 px-6 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((shot, i) => (
            <ShotCard key={`${shot.src}-${i}`} shot={shot} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-4xl px-4 text-center sm:px-6">
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

        <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-neutral-50 p-8">
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
