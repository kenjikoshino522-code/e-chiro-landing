import Image from "next/image";

const TESTIMONIALS = [
  { src: "/images/testimonials/01-zeugal.png", w: 469, h: 750, role: "プロゲーマー", name: "ゼウガル選手" },
  { src: "/images/testimonials/02-ikari.png", w: 505, h: 652, role: "プロゲーマー", name: "iKARi選手" },
  { src: "/images/testimonials/03-sutanmi.png", w: 463, h: 511, role: "配信者", name: "スタンミ＆じゃすぱー様" },
  { src: "/images/testimonials/04-syonen.png", w: 418, h: 389, role: "プロゲーマー", name: "少年選手" },
  { src: "/images/testimonials/05-fighter.png", w: 581, h: 603, role: "eスポーツ実況", name: "ファイター様" },
  { src: "/images/testimonials/06-evi.jpg", w: 572, h: 329, role: "プロゲーマー", name: "Evi選手" },
  { src: "/images/testimonials/07-komori.jpg", w: 568, h: 134, role: "声優", name: "小森未彩様" },
  { src: "/images/testimonials/08-saito.jpg", w: 566, h: 294, role: "スクエアエニックス プロデューサー", name: "齊藤陽介様" },
  { src: "/images/testimonials/09-jona.jpg", w: 576, h: 331, role: "プロゲーマー", name: "Jona選手" },
  { src: "/images/testimonials/10-sengoku.jpg", w: 591, h: 630, role: "プロゲーミングチーム", name: "戦国ゲーミング様" },
  { src: "/images/testimonials/11-zerost.png", w: 590, h: 77, role: "プロゲーマー＆ストリーマー", name: "Zerost様" },
  { src: "/images/testimonials/12-ceros.jpg", w: 553, h: 88, role: "プロゲーマー＆ストリーマー", name: "Ceros様" },
  { src: "/images/testimonials/13-chikurin-evo.jpg", w: 524, h: 746, role: "プロゲーマー", name: "チクリン選手" },
  { src: "/images/testimonials/14-dogura.jpg", w: 564, h: 815, role: "プロゲーマー", name: "どぐら選手" },
  { src: "/images/testimonials/15-recap.jpg", w: 356, h: 139, role: "プロゲーマー", name: "Recap選手" },
  { src: "/images/testimonials/16-hazuki.jpg", w: 571, h: 506, role: "アイドル", name: "葉月あすか様" },
  { src: "/images/testimonials/18-pinya.jpg", w: 566, h: 130, role: "プロゲーマー", name: "PINYA選手" },
  { src: "/images/testimonials/19-nobi.jpg", w: 571, h: 220, role: "プロゲーマー", name: "ノビ選手（Team YAMASA）" },
  { src: "/images/testimonials/20-chikurin-gomari.png", w: 595, h: 641, role: "プロゲーマー＆声優", name: "チクリン＆ごまりご夫妻" },
];

export default function TestimonialGrid() {
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="group relative mt-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max gap-5 px-6 animate-marquee-slow group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="w-56 flex-none overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-transform duration-300 ease-out hover:z-20 hover:scale-125"
          >
            <div className="flex h-64 items-center justify-center bg-neutral-50">
              <Image
                src={item.src}
                alt={`${item.role} ${item.name} の投稿`}
                width={item.w}
                height={item.h}
                className="max-h-64 w-full object-contain"
                sizes="224px"
              />
            </div>
            <div className="border-t border-neutral-200 bg-neutral-50 px-3 py-2">
              <p className="text-[11px] font-medium text-neutral-400">{item.role}</p>
              <p className="text-sm font-bold text-neutral-900">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
