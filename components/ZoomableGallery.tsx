"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = { src: string; alt: string };

export default function ZoomableGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(img)}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={2400}
              height={1260}
              className="w-full transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21l-4.3-4.3M9 8v6M6 11h6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              拡大する
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="閉じる"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Image
            src={active.src}
            alt={active.alt}
            width={2400}
            height={1260}
            className="max-h-[90vh] w-auto max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
