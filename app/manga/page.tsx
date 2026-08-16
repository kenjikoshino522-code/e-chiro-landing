import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "漫画アーカイブ | e-CHIRO",
  alternates: { canonical: `${SITE_URL}/manga` },
};

const SERIES: {
  title: string;
  description: string;
  images: { src: string; alt: string; width: number; height: number }[];
}[] = [
  {
    title: "「ゲーム→風呂→就寝」が最強の自律神経ハック",
    description: "入浴のタイミングを間違えると、寝つきもゲームの調子も落ちる。",
    images: [
      {
        src: "/images/manga/sleepinggame-1.png",
        alt: "無自覚に睡眠の質が落ちているせいで、ゲームのパフォーマンスも落ちている",
        width: 507,
        height: 869,
      },
      {
        src: "/images/manga/sleepinggame-2.png",
        alt: "自律神経とは、交感神経（アクセル）と副交感神経（ブレーキ）の切り替えのこと",
        width: 512,
        height: 875,
      },
      {
        src: "/images/manga/sleepinggame-3.png",
        alt: "ゲームと入浴で何が起きる？風呂→ゲーム→就寝と、ゲーム→風呂→就寝の比較",
        width: 506,
        height: 651,
      },
      {
        src: "/images/manga/sleepinggame-4.png",
        alt: "睡眠の質を上げるコツ。ゲーム→お風呂→ストレッチ→就寝のナイトルーティン",
        width: 1824,
        height: 2352,
      },
    ],
  },
];

export default function MangaPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <FadeIn variant="scale">
              <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
                <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
                COMIC
              </p>
              <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                漫画アーカイブ
              </h1>
            </FadeIn>
            <FadeIn variant="fade" delay={150}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                e-CHIROがどんなサービスか、漫画でわかりやすく紹介しています。
              </p>
            </FadeIn>
          </div>

          {SERIES.length === 0 ? (
            <p className="mt-20 text-center text-sm text-neutral-400">近日公開予定です。</p>
          ) : (
            <div className="mt-16 space-y-20">
              {SERIES.map((series) => (
                <div key={series.title}>
                  <div className="text-center">
                    <h2 className="font-heading text-xl font-bold text-neutral-900 sm:text-2xl">
                      {series.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{series.description}</p>
                  </div>

                  <div className="mx-auto mt-8 flex max-w-lg flex-col gap-4">
                    {series.images.map((image, i) => (
                      <FadeIn key={image.src} variant="fade" delay={i * 80}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className="w-full rounded-xl border border-neutral-200 shadow-sm"
                          sizes="(min-width: 640px) 512px, 100vw"
                        />
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
