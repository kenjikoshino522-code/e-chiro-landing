import Image from "next/image";

const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/testimonials/placeholder-${i + 1}.svg`,
  alt: `テスティモニアル スクリーンショット プレースホルダー ${i + 1}（差し替え予定）`,
}));

export default function TestimonialGrid() {
  return (
    <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
      <p className="text-center text-xs font-medium text-neutral-400">
        ※以下はレイアウト確認用のプレースホルダーです。実際のスクリーンショットに差し替え予定です。
      </p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {PLACEHOLDERS.map((item) => (
          <div
            key={item.src}
            className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={500}
              className="h-full w-full object-cover"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
