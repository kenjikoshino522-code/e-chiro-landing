import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const TRUSTED_BY = [
  { src: "/images/testimonials/01-zeugal.png", w: 469, h: 750, role: "プロゲーマー", name: "ゼウガル選手" },
  { src: "/images/testimonials/02-ikari.png", w: 505, h: 652, role: "プロゲーマー", name: "iKARi選手" },
  { src: "/images/testimonials/03-sutanmi.png", w: 463, h: 511, role: "配信者", name: "スタンミ＆じゃすぱー様" },
  { src: "/images/testimonials/04-syonen.png", w: 418, h: 389, role: "プロゲーマー", name: "少年選手" },
  { src: "/images/testimonials/05-fighter.png", w: 581, h: 603, role: "eスポーツ実況", name: "ファイター様" },
  { src: "/images/testimonials/06-evi.jpg", w: 572, h: 329, role: "プロゲーマー", name: "Evi選手" },
  { src: "/images/testimonials/09-jona.jpg", w: 576, h: 331, role: "プロゲーマー", name: "Jona選手" },
  { src: "/images/testimonials/10-sengoku.jpg", w: 591, h: 630, role: "プロゲーミングチーム", name: "戦国ゲーミング様" },
  { src: "/images/testimonials/13-chikurin-evo.jpg", w: 524, h: 746, role: "プロゲーマー", name: "チクリン選手" },
  { src: "/images/testimonials/14-dogura.jpg", w: 564, h: 815, role: "プロゲーマー", name: "どぐら選手" },
  { src: "/images/testimonials/16-hazuki.jpg", w: 571, h: 506, role: "アイドル", name: "葉月あすか様" },
  { src: "/images/testimonials/19-nobi.jpg", w: 571, h: 220, role: "プロゲーマー", name: "ノビ選手（Team YAMASA）" },
  { src: "/images/testimonials/20-chikurin-gomari.png", w: 595, h: 641, role: "プロゲーマー＆声優", name: "チクリン＆ごまりご夫妻" },
];

const CARD_CLASS =
  "w-36 flex-none overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm sm:w-44";

export default function TrustSection() {
  const track = [...TRUSTED_BY, ...TRUSTED_BY];

  return (
    <section className="bg-neutral-50 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            TRUSTED BY PLAYERS &amp; TEAMS
          </p>
          <FadeIn variant="mask" delay={100}>
            <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
              プロ選手・ゲーム関連企業にも利用されています
            </h2>
          </FadeIn>
        </FadeIn>
      </div>

      <div className="group relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-neutral-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-neutral-50 to-transparent" />
        <div className="flex w-max gap-4 px-6 animate-marquee-slow group-hover:[animation-play-state:paused]">
          {track.map((item, i) => (
            <div key={`${item.name}-${i}`} className={CARD_CLASS}>
              <div className="flex h-36 items-center justify-center bg-neutral-100 sm:h-44">
                <Image
                  src={item.src}
                  alt={`${item.role} ${item.name}`}
                  width={item.w}
                  height={item.h}
                  className="max-h-36 w-full object-contain sm:max-h-44"
                  sizes="176px"
                />
              </div>
              <div className="border-t border-neutral-200 px-3 py-2">
                <p className="text-[10px] font-medium text-neutral-400">{item.role}</p>
                <p className="text-xs font-bold text-neutral-900">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
