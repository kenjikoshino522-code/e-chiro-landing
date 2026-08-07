import Image from "next/image";
import { LINE_URL } from "@/lib/constants";
import FadeIn from "@/components/FadeIn";

const TIERS = [
  {
    number: "①",
    src: "/images/menu/menu-01-ultimate.jpg",
    alt: "1. Ultimate Body Care アルティメット・ボディケア 究極 ¥20,000",
    nameEn: "Ultimate Body Care",
    nameJa: "アルティメット・ボディケア",
    part: "究極",
    price: "¥20,000",
    duration: "目安60分",
    description: "パフォーマンス最大化を狙う根本改善の最上位プラン。",
  },
  {
    number: "②",
    src: "/images/menu/menu-02-total.jpg",
    alt: "2. Total Body Care トータル・ボディケア 全身 ¥12,000",
    nameEn: "Total Body Care",
    nameJa: "トータル・ボディケア",
    part: "全身",
    price: "¥12,000",
    duration: "目安45分",
    description: "全身の歪みを総合的に調整する標準プラン。",
  },
  {
    number: "③",
    src: "/images/menu/menu-03-neckarm.jpg",
    alt: "3. Neck & Arm Care ネック&アームケア 首・腕 ¥5,000",
    nameEn: "Neck & Arm Care",
    nameJa: "ネック&アームケア",
    part: "首・腕",
    price: "¥5,000",
    duration: "目安30分",
    description: "首・肩・腕の痛みや凝りに集中したケア。",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TIERS.map((tier, i) => ({
    "@type": "Service",
    position: i + 1,
    serviceType: `${tier.nameEn}（${tier.nameJa}）`,
    name: `${tier.nameEn}（${tier.nameJa}）`,
    description: tier.description,
    provider: {
      "@type": "LocalBusiness",
      name: "e-CHIRO",
    },
    areaServed: "東京都近郊",
    offers: {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: tier.price.replace(/[^0-9]/g, ""),
      priceSpecification: {
        "@type": "PriceSpecification",
        price: tier.price.replace(/[^0-9]/g, ""),
        priceCurrency: "JPY",
      },
    },
  })),
};

export default function ServiceMenu() {
  return (
    <section id="menu" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">SERVICE MENU</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            あなたの身体を、アップグレードしよう
          </h2>
        </div>

        <div className="mt-14 space-y-10">
          {TIERS.map((item, i) => (
            <FadeIn key={item.number} delay={i * 100}>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={2000}
                  height={1125}
                  className="w-full"
                  sizes="(min-width: 1024px) 960px, 100vw"
                />

                <div className="border-t border-neutral-200 px-6 py-6 sm:px-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-heading text-lg font-bold text-neutral-900">
                      {item.number} {item.nameEn}
                      <span className="ml-2 text-sm font-medium text-neutral-500">{item.nameJa}</span>
                    </h3>
                    <span className="text-xl font-extrabold text-brand-blue">{item.price}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-neutral-500">
                    {item.part}｜{item.duration}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.description}</p>
                </div>

                <div className="flex justify-center bg-neutral-50 px-4 py-6">
                  <a
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs rounded-full bg-brand-blue px-6 py-3 text-center text-sm font-bold text-white transition hover:opacity-90 sm:text-base"
                  >
                    {item.number}をLINEで予約する
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
