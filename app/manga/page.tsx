import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MANGA_SERIES } from "@/lib/manga";
import { SITE_URL, X_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI漫画アーカイブ | e-CHIRO",
  alternates: { canonical: `${SITE_URL}/manga` },
};

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
                AI漫画アーカイブ
              </h1>
            </FadeIn>
            <FadeIn variant="fade" delay={150}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                e-CHIROがどんなサービスか、漫画でわかりやすく紹介しています。
              </p>
              <Link
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-brand-blue"
              >
                Xでも投稿しています → @echiro_dc
              </Link>
            </FadeIn>
          </div>

          {MANGA_SERIES.length === 0 ? (
            <p className="mt-20 text-center text-sm text-neutral-400">近日公開予定です。</p>
          ) : (
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {MANGA_SERIES.map((series, i) => {
                const cover = series.images[0];
                return (
                  <FadeIn key={series.slug} variant="fade" delay={i * 100}>
                    <Link
                      href={`/manga/${series.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          sizes="(min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="p-5">
                        <h2 className="font-heading text-base font-bold leading-snug text-neutral-900">
                          {series.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-600">{series.description}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-blue">
                          続きを読む →
                        </span>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
