import Image from "next/image";
import { LINE_URL } from "@/lib/constants";

const TIERS = [
  {
    tier: "TIER 1",
    src: "/images/menu/menu-03-neckarm.jpg",
    alt: "TIER 1 Neck & Arm Care ネック&アームケア 首・腕 ¥5,000",
  },
  {
    tier: "TIER 2",
    src: "/images/menu/menu-02-total.jpg",
    alt: "TIER 2 Total Body Care トータル・ボディケア 全身 ¥12,000",
  },
  {
    tier: "TIER 3",
    src: "/images/menu/menu-01-ultimate.jpg",
    alt: "TIER 3 Ultimate Body Care アルティメット・ボディケア 究極 ¥20,000",
  },
];

export default function ServiceMenu() {
  return (
    <section id="menu" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-blue">SERVICE MENU</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            あなたのTierを、アップグレードしよう
          </h2>
        </div>

        <div className="mt-14 space-y-10">
          {TIERS.map((item) => (
            <div key={item.tier} className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
              <Image
                src={item.src}
                alt={item.alt}
                width={2000}
                height={1125}
                className="w-full"
                sizes="(min-width: 1024px) 960px, 100vw"
              />
              <div className="flex justify-center bg-neutral-50 px-4 py-6">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs rounded-full bg-brand-blue px-6 py-3 text-center text-sm font-bold text-white transition hover:opacity-90 sm:text-base"
                >
                  {item.tier} をLINEで予約する
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
