"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import type { MangaImage } from "@/lib/manga";

export default function MangaGallery({ images }: { images: MangaImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : Math.min(i + 1, images.length - 1)));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : Math.max(i - 1, 0)));
    }

    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        {images.map((image, i) => (
          <FadeIn key={image.src} variant="fade" delay={i * 80}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full cursor-zoom-in"
              aria-label={`${image.alt}を拡大表示`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full rounded-xl border border-neutral-200 shadow-sm transition hover:opacity-90"
                sizes="(min-width: 640px) 512px, 100vw"
              />
            </button>
          </FadeIn>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="閉じる"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {openIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(openIndex - 1);
              }}
              aria-label="前のコマ"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {openIndex < images.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(openIndex + 1);
              }}
              aria-label="次のコマ"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <Image
            src={images[openIndex].src}
            alt={images[openIndex].alt}
            width={images[openIndex].width}
            height={images[openIndex].height}
            className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-4 font-heading text-xs text-white/60">
            {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
