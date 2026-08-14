import Image from "next/image";

type PhotoTestimonial = {
  type: "photo";
  src: string;
  w: number;
  h: number;
  role: string;
  name: string;
};

type TextTestimonial = {
  type: "text";
  body: string;
  role: string;
  name: string;
  handle: string;
};

const TESTIMONIALS: (PhotoTestimonial | TextTestimonial)[] = [
  { type: "photo", src: "/images/testimonials/01-zeugal.png", w: 469, h: 750, role: "プロゲーマー", name: "ゼウガル選手" },
  {
    type: "text",
    role: "スクエアエニックス プロデューサー",
    name: "齊藤陽介様",
    handle: "@SaitoYosuke_Z",
    body: "「こんな方にオススメ」の三拍子にハマり過ぎてたのでKEN先生に治療して貰いました...おおう...体が軽い...有難う御座いました。",
  },
  { type: "photo", src: "/images/testimonials/10-sengoku.jpg", w: 591, h: 630, role: "プロゲーミングチーム", name: "戦国ゲーミング様" },
  { type: "photo", src: "/images/testimonials/14-dogura.jpg", w: 564, h: 815, role: "プロゲーマー", name: "どぐら選手" },
  { type: "photo", src: "/images/testimonials/16-hazuki.jpg", w: 571, h: 506, role: "アイドル", name: "葉月あすか様" },
];

const CARD_CLASS =
  "w-56 flex-none overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg";

function TestimonialCard({ item }: { item: (typeof TESTIMONIALS)[number] }) {
  if (item.type === "text") {
    return (
      <div className={`${CARD_CLASS} flex h-64 flex-col p-4`}>
        <div className="flex items-center gap-1.5 text-neutral-900" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-xs font-medium text-neutral-400">{item.handle}</span>
        </div>
        <p className="mt-2 line-clamp-4 flex-1 text-xs leading-relaxed text-neutral-700">{item.body}</p>
        <div className="mt-2 border-t border-neutral-200 pt-2">
          <p className="text-[11px] font-medium text-neutral-400">{item.role}</p>
          <p className="text-sm font-bold text-neutral-900">{item.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={CARD_CLASS}>
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
  );
}

export default function TestimonialGrid() {
  const track = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="group relative mt-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max gap-5 px-6 animate-marquee-slow group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
