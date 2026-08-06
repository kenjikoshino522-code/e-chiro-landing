import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "漫画アーカイブ | e-CHIRO",
};

const SERIES = [
  {
    title: "信頼性・資格編",
    description: "e-CHIROのサービスがWHO基準の教育を受けた専門家によって提供されている理由を紹介。",
    images: [
      { src: "/images/manga/trust-v3-1.jpg", alt: "信頼性・資格編 1ページ目" },
      { src: "/images/manga/trust-v3-2.jpg", alt: "信頼性・資格編 2ページ目" },
      { src: "/images/manga/trust-v3-3.jpg", alt: "信頼性・資格編 3ページ目" },
    ],
  },
  {
    title: "コンディション管理編",
    description: "最高のデバイスを揃えるのと同じくらい、体のコンディションを整えることが重要という話。",
    images: [
      { src: "/images/manga/condition-v2-2.jpg", alt: "コンディション管理編 前半" },
      { src: "/images/manga/condition-v2-3.jpg", alt: "コンディション管理編 後半" },
    ],
  },
  {
    title: "eスポーツ選手編",
    description: "プロゲーマーのランクアップを支えるDr.Kenのケア。",
    images: [{ src: "/images/manga/esports-1.jpg", alt: "eスポーツ選手編" }],
  },
  {
    title: "ゲームライフ編",
    description: "長時間のゲームで体の不調を感じたら、我慢せず専門家に相談を。",
    images: [{ src: "/images/manga/deformed-1.jpg", alt: "ゲームライフ編" }],
  },
];

export default function MangaPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-bold tracking-widest text-brand-blue">COMIC</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              漫画アーカイブ
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              e-CHIROがどんなサービスか、漫画でわかりやすく紹介しています。
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {SERIES.map((series) => (
              <div key={series.title}>
                <h2 className="text-xl font-bold text-neutral-900">{series.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{series.description}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {series.images.map((img) => (
                    <div
                      key={img.src}
                      className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={1056}
                        height={1408}
                        className="w-full"
                        sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
