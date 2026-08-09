import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function LogoConcept() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn variant="scale">
          <p className="flex items-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            LOGO CONCEPT
          </p>
        </FadeIn>

        <div className="mt-10 grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn variant="slide-right" delay={200} className="group flex justify-center md:order-2">
            <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-brand-blue p-10 shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <Image
                src="/images/logo-square.jpg"
                alt="e-CHIRO ロゴマーク"
                width={600}
                height={600}
                className="w-full rounded-xl transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </FadeIn>

          <div className="md:order-1">
            <FadeIn variant="scale">
              <h2 className="font-heading text-2xl font-extrabold leading-snug text-neutral-900 sm:text-3xl">
                BONE × <ruby>
                  カイロプラクティック<rp>(</rp><rt className="text-xs font-normal text-neutral-400">カイロ</rt><rp>)</rp>
                </ruby>{" "}
                = WING
              </h2>
            </FadeIn>
            <FadeIn variant="fade" delay={150}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
                <p>
                  姿勢を支える重要なパーツである「仙骨」をモチーフにして、骨のずれを調整する
                  <ruby>
                    カイロプラクティック<rp>(</rp><rt className="text-xs font-normal text-neutral-400">アジャスト</rt><rp>)</rp>
                  </ruby>
                  の動きをマークに取り入れました。
                </p>
                <p>中心の骨を上側にスライドさせると、流麗な翼が姿を表します。</p>
                <p>
                  この翼（ボーン・ウイング）には、プレイヤーやクリエイターの皆様が
                  「最高のパフォーマンスを発揮し続けられるように」という願いが込められています。
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
