import FadeIn from "@/components/FadeIn";

export default function AboutChiro() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            CHIROPRACTIC 101
          </p>
          <FadeIn variant="mask" delay={100}>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              そもそも、カイロって何？
            </h2>
          </FadeIn>
        </FadeIn>

        <FadeIn variant="fade" delay={150}>
          <div className="mt-6 space-y-4 text-left text-sm leading-relaxed text-neutral-700 sm:text-base">
            <p>
              カイロプラクティックというと、「背骨をボキッとする施術」をイメージする人も多いかもしれません。
              でも、それだけではありません。
            </p>
            <p>
              簡単にいうと、身体の動きやバランスをチェックし、背骨や関節などにアプローチするヘルスケアです。
              姿勢や関節の動き、筋肉、身体の使い方を確認しながら、「どこに負担がかかっているのか」
              「なぜ動きにくくなっているのか」を一緒に考えていくのが特徴です。
            </p>
            <p>
              e-CHIROでは、ゲームやPC作業による首・肩・腰・腕まわりの負担も含めて、あなたの身体をチェックします。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
