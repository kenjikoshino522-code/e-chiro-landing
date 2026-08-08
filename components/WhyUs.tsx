import FadeIn from "@/components/FadeIn";

const CARD_VARIANTS = ["slide-left", "slide-up", "slide-right"] as const;

const PILLARS = [
  {
    number: "01",
    title: "RED FLAGを見逃さない専門性",
    body: "DC（米国政府認定カイロプラクター）資格に基づき、危険な症状（レッドフラッグ）を見極めた上で施術。必要な場合は整形外科への受診も遠慮なく提案します。",
  },
  {
    number: "02",
    title: "科学的根拠に基づく施術",
    body: "感覚や経験則だけに頼らず、Human Biology（人体生物学）の学術的背景から、なぜその施術が必要かを言語化してお伝えします。",
  },
  {
    number: "03",
    title: "試合後もパフォーマンスを維持するセルフケア",
    body: "施術だけで終わらせません。日常でできるセルフケア（ストレッチ、水分補給、姿勢改善など）を必ず持ち帰ってもらい、「その場限りの回復」で終わらせない設計です。",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn variant="scale" className="text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">WHY UPGRADE WITH US</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            なぜe-CHIROが選ばれるのか
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.number} variant={CARD_VARIANTS[i]} delay={i * 120}>
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="font-heading text-3xl font-black text-brand-blue">{pillar.number}</span>
                <h3 className="mt-4 font-heading text-lg font-bold leading-snug text-neutral-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{pillar.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
