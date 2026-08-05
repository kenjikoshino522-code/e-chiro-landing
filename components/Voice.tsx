import Link from "next/link";
import { X_URL } from "@/lib/constants";

const REVIEWS = [
  {
    name: "さいとう",
    date: "2024/4/12",
    title: "腰も肩も首もスッキリします",
    body: "デスクワークの方はぜひとも受けてほしいです。もともと腰の痛みを気にしてましたが、全身は繋がってるとのことで、肩や首周りも合わせて見ていただき、施術後に明らかに上半身が軽くなりました。",
  },
  {
    name: "きりまる。",
    date: "2023/9/1",
    title: "施術中すでに体の軽さを実感…！",
    body: "施術で全身をみてもらい、食いしばりや腰の凝り、猫背になりかけていることなど、自分でもできるケアを細かく教えていただきました。横になっていても体がみるみる軽くなっていくのがわかりました。",
  },
  {
    name: "Rino",
    date: "2023/9/1",
    title: "終わった後のスッキリ感が最高",
    body: "長年のデスクワークで慢性的な肩こりに悩まされていましたが、終わった後の体のスッキリ感に驚きました。特に首周りの詰まりが解消されて、身体全身が軽くなったように感じました。",
  },
  {
    name: "アケノ",
    date: "2023/6/27",
    title: "初めてのカイロプラクティック",
    body: "接骨院で施術を受けてもなかなか改善しなかった首周りの問題もかなり改善されて、とても嬉しいです。共通の話題で楽しく会話しながら、終始リラックスして受けることができました。",
  },
  {
    name: "スミス",
    date: "2022/11/30",
    title: "骨盤矯正で自己治癒力も上がる",
    body: "カリステニクスというスポーツをしており、脳からの指令(神経系)がとても大切なため、こういった矯正はパフォーマンスを上げる為にも必要な施術と実感しています。アスリートにもオススメです。",
  },
];

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="w-[300px] flex-none rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:w-[340px]">
      <div className="flex items-center gap-1 text-brand-yellow" aria-hidden="true">
        {"★★★★★"}
      </div>
      <p className="mt-3 text-sm font-bold text-neutral-900">{review.title}</p>
      <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-neutral-600">{review.body}</p>
      <p className="mt-4 text-xs font-medium text-neutral-400">
        {review.name} ・ {review.date}
      </p>
    </div>
  );
}

export default function Voice() {
  const track = [...REVIEWS, ...REVIEWS];

  return (
    <section id="voice" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-sm font-bold tracking-widest text-brand-blue">VOICE OF PLAYERS</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          Tier UPを実感した声
        </h2>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-neutral-700">
          <span className="text-brand-yellow">★★★★★</span>
          <span>5.0（13件のレビュー）</span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
          施術を受けたお客様から、たくさんの声をいただいています。
        </p>
      </div>

      <div className="group relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max gap-6 px-6 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-4xl px-4 text-center sm:px-6">
        <p className="text-xs text-neutral-400">レビュー出典: MOSH予約ページ「e-CHIRO」</p>

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
            className="mt-4 inline-flex min-h-11 items-center py-2 text-sm font-bold text-brand-blue underline underline-offset-4"
          >
            法人プランのご相談はこちら →
          </Link>
        </div>
      </div>
    </section>
  );
}
