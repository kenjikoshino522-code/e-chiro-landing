import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function HeroProfile() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6">
      <FadeIn variant="fade">
        <Link
          href="#about"
          className="mx-auto flex max-w-xl items-center gap-4 rounded-2xl border border-neutral-200 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md sm:p-5"
        >
          <Image
            src="/images/dr-ken-headshot.jpg"
            alt="Dr.KEN"
            width={80}
            height={80}
            className="h-16 w-16 flex-none rounded-full object-cover sm:h-20 sm:w-20"
          />
          <div>
            <p className="text-base font-extrabold text-neutral-900">Dr.KEN</p>
            <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">
              元プロゲーマー × 米国D.C.取得のカイロプラクター。ゲーマー・デスクワーカーの身体を熟知しています。
            </p>
            <p className="mt-1 text-xs font-bold text-brand-blue">プロフィールを見る →</p>
          </div>
        </Link>
      </FadeIn>
    </section>
  );
}
