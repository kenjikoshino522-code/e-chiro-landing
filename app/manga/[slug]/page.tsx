import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { MANGA_SERIES, getMangaSeries } from "@/lib/manga";
import { SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return MANGA_SERIES.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = getMangaSeries(slug);
  if (!series) return {};
  return {
    title: `${series.title} | e-CHIRO 漫画アーカイブ`,
    description: series.description,
    alternates: { canonical: `${SITE_URL}/manga/${series.slug}` },
  };
}

export default async function MangaSeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = getMangaSeries(slug);
  if (!series) notFound();

  return (
    <>
      <Header />
      <main className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-lg">
          <FadeIn variant="fade">
            <Link href="/manga" className="inline-flex min-h-11 items-center text-sm font-bold text-brand-blue">
              ← 漫画アーカイブに戻る
            </Link>
          </FadeIn>

          <div className="mt-6 text-center">
            <FadeIn variant="scale">
              <h1 className="font-heading text-xl font-bold leading-snug text-neutral-900 sm:text-2xl">
                {series.title}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{series.description}</p>
            </FadeIn>
          </div>

          <div className="mt-8 flex flex-col gap-4">
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
      </main>
      <Footer />
    </>
  );
}
