import FadeIn from "@/components/FadeIn";

const FEATURES = ["出張型・完全予約制", "マンツーマン施術", "米国政府公認D.C.資格保持", "セルフケア指導付き"];

export default function WhatIsEChiro() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            WHAT IS e-CHIRO
          </p>
          <FadeIn variant="mask" delay={100}>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              e-CHIRO（イーカイロ）とは
            </h2>
          </FadeIn>
        </FadeIn>

        <FadeIn variant="fade" delay={150}>
          <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-neutral-700">
            <p>
              e-CHIROは、eスポーツ選手・ゲーマー・クリエイターの皆様のための出張型カイロプラクティックサービスです。
              長時間のプレイや配信で酷使される首・肩・腰・手首を、米国政府公認D.C.資格を持つ施術者が
              科学的根拠に基づいて調整し、「最高のパフォーマンスを発揮し続けられる状態」に導きます。
            </p>
            <p>
              個人のお客様への出張施術はもちろん、ゲーミングチーム・企業様との法人契約にも対応。
              個人でもチームでも、e-CHIROがあなたの身体をアップグレードします。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 border-l-2 border-brand-blue bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
              >
                <span aria-hidden="true" className="text-[10px] text-brand-blue">▶</span>
                {feature}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
