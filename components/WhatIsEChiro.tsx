import FadeIn from "@/components/FadeIn";

const FEATURES = ["出張型・完全予約制", "マンツーマン施術", "米国D.C.資格保持", "セルフケア指導付き"];

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
              e-CHIROは、ゲーマー・eスポーツ選手・長時間のPC作業をする方のための出張型カイロプラクティックです。
              プレイや作業で凝り固まった首・肩・腰・腕まわりを、あなたのいる場所までお伺いしてケアします。
              「なんとなく身体が重い」「座りっぱなしで姿勢が気になる」——そんな悩みに、コンディショニングという形でアプローチします。
              個人はもちろん、チーム・企業単位でもご利用いただけます。
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
