import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "漫画アーカイブ | e-CHIRO",
};

// SERIES is intentionally empty — content to be added.
const SERIES: {
  title: string;
  description: string;
  images: { src: string; alt: string }[];
}[] = [];

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

          {SERIES.length === 0 ? (
            <p className="mt-20 text-center text-sm text-neutral-400">近日公開予定です。</p>
          ) : (
            <div className="mt-16 space-y-20">
              {SERIES.map((series) => (
                <div key={series.title}>
                  <h2 className="text-xl font-bold text-neutral-900">{series.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{series.description}</p>
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
