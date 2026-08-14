import FadeIn from "@/components/FadeIn";

export default function AboutChiro() {
  return (
    <section id="chiro" className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
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
          <ul className="mt-6 space-y-2 text-left text-sm leading-relaxed text-neutral-700 sm:text-base">
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-brand-blue">▶</span>
              身体の動きやバランスをチェックする
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-brand-blue">▶</span>
              背骨・関節・筋肉なども含めて考える
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-brand-blue">▶</span>
              「ボキッとするだけ」ではない
            </li>
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-neutral-700 sm:text-base">
            e-CHIROでは、ゲームやPC作業による首・肩・腰・腕の負担も含めてチェックします。
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
