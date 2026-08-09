import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/FadeIn";

export default function PlayersBanner() {
  return (
    <section className="bg-brand-blue px-4 py-16 text-center text-white sm:px-6">
      <FadeIn variant="scale">
        <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-yellow">
          <span aria-hidden="true" className="h-px w-5 bg-white/40" />
          PLAYERS
          <span aria-hidden="true" className="h-px w-5 bg-white/40" />
        </p>
        <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
          多くのプロ選手・チームに選ばれています
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/80">
          eスポーツプロ選手・配信者・チームスタッフなど、これまで多くの方に施術を行ってきました。実際の声は以下でご紹介しています。
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButton
            href="#voice"
            variant="yellow"
            external={false}
            className="rounded-full px-6 py-3 text-sm font-bold"
          >
            利用者の声を見る →
          </CtaButton>
        </div>
      </FadeIn>
    </section>
  );
}
