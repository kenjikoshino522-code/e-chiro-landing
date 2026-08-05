import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <p className="text-sm font-bold tracking-widest text-brand-blue">ABOUT</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            施術者紹介
          </h2>

          <div className="mt-8">
            <p className="text-2xl font-extrabold text-neutral-900">
              Dr.KEN
              <span className="ml-2 text-base font-medium text-neutral-500">
                ケネス・ラッセル／越野兼次
              </span>
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-600">
              代表取締役｜米国政府公認カイロプラクティック・ドクター（D.C.）
            </p>
          </div>

          <p className="mt-6 text-base leading-relaxed text-neutral-700">
            e-CHIROは、eスポーツ選手、ゲーマー、クリエイターの皆様を
            「最高のパフォーマンスを発揮し続けられる状態」に導くために、
            カイロプラクティック・サービスを提供しています。
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700">
            長時間のプレイや配信で酷使される首・肩・腰・手首。米国政府公認D.C.資格を持つDr.KENが、
            一人ひとりの姿勢・体の癖に向き合い、パフォーマンスを支えるコンディショニングをお届けします。
          </p>
        </div>

        <div className="order-1 md:order-2">
          <div className="overflow-hidden rounded-2xl bg-brand-blue">
            <Image
              src="/images/icon.jpg"
              alt="施術中のDr.KEN"
              width={1080}
              height={1080}
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 480px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
