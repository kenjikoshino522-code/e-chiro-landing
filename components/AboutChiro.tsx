import FadeIn from "@/components/FadeIn";

const CHIROPRACTOR_POINTS = [
  "脊椎・神経系のヘルスケア専門家として、神経筋骨格系の機能や生活の質の向上に取り組みます。",
  "最新の研究と臨床知見に基づき、検査から施術まで専門的なアプローチを行います。",
  "正式な教育課程は4年制・4200時間以上(うち臨床実習1000時間以上を含む)。",
];

export default function AboutChiro() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <FadeIn variant="slide-left">
          <p className="flex items-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            ABOUT CHIROPRACTIC
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-neutral-900">
            カイロプラクティックとは
          </h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-700">
            <p>
              米国発祥の手技療法で、WHO(世界保健機関)もヘルスケアの一つとして位置づけを示しており、
              世界約40の国や地域で法制化されています。
            </p>
            <p>
              主に脊椎の調整(アジャスト)を通じて、痛みの軽減や身体機能の改善を目的とした施術です。
            </p>
          </div>
        </FadeIn>

        <FadeIn variant="slide-right" delay={150}>
          <p className="flex items-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            ABOUT CHIROPRACTOR
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-neutral-900">
            カイロプラクターとは
          </h3>
          <ul className="mt-4 space-y-3">
            {CHIROPRACTOR_POINTS.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-relaxed text-neutral-700">
                <span aria-hidden="true" className="mt-0.5 flex-none text-[10px] text-brand-blue">▶</span>
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
