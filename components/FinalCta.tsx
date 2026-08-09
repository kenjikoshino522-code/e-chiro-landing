import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/FadeIn";
import { LINE_URL } from "@/lib/constants";

export default function FinalCta() {
  return (
    <section className="bg-neutral-950 px-4 py-24 text-center text-white sm:px-6 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-yellow">
            <span aria-hidden="true" className="h-px w-5 bg-white/40" />
            READY?
          </p>
          <h2 className="mt-3 font-heading text-4xl font-black tracking-tight sm:text-5xl">
            LEVEL UP YOUR BODY
          </h2>
        </FadeIn>
        <FadeIn variant="fade" delay={150}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
            完全予約制・都内近郊に出張対応。まずはLINEでお気軽にご相談ください。
          </p>
        </FadeIn>
        <div className="mt-10 flex justify-center">
          <CtaButton
            href={LINE_URL}
            variant="yellow"
            className="w-full max-w-sm rounded-full px-8 py-4 text-center text-base font-extrabold shadow-lg sm:text-lg"
          >
            LINEで予約・相談する
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
