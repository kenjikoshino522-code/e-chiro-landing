import Image from "next/image";
import { LINE_URL } from "@/lib/constants";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";

const CARD_VARIANTS = ["slide-left", "slide-up", "slide-right"] as const;

const TIERS = [
  {
    number: "①",
    tag: "01 / ULTIMATE",
    src: "/images/menu/menu-01-ultimate.jpg",
    alt: "1. Ultimate Body Care アルティメット・ボディケア 究極 ¥20,000",
    nameEn: "Ultimate Body Care",
    nameJa: "アルティメット・ボディケア",
    part: "究極",
    price: "¥20,000",
    duration: "45 — 70分",
    description: "パフォーマンス最大化を狙う根本改善の最上位プラン。",
    bodyParts: [
      { en: "Cervical & Shoulder", ja: "首・肩" },
      { en: "Thoracic & Lumbar", ja: "背中・腰" },
      { en: "Pelvis", ja: "骨盤" },
      { en: "Arms, Legs & Hands", ja: "両腕・両脚・両手" },
      { en: "Scalp", ja: "頭部" },
    ],
  },
  {
    number: "②",
    tag: "02 / TOTAL",
    src: "/images/menu/menu-02-total.jpg",
    alt: "2. Total Body Care トータル・ボディケア 全身 ¥12,000",
    nameEn: "Total Body Care",
    nameJa: "トータル・ボディケア",
    part: "全身",
    price: "¥12,000",
    duration: "30 — 45分",
    description: "全身の歪みを総合的に調整する標準プラン。",
    bodyParts: [
      { en: "Cervical & Shoulder", ja: "首・肩" },
      { en: "Thoracic & Lumbar", ja: "背中・腰" },
      { en: "Pelvis", ja: "骨盤" },
      { en: "Hands", ja: "両手" },
    ],
  },
  {
    number: "③",
    tag: "03 / NECK & ARM",
    src: "/images/menu/menu-03-neckarm.jpg",
    alt: "3. Neck & Arm Care ネック&アームケア 首・腕 ¥5,000",
    nameEn: "Neck & Arm Care",
    nameJa: "ネック&アームケア",
    part: "首・腕",
    price: "¥5,000",
    duration: "15 — 30分",
    description: "首・肩・腕の痛みや凝りに集中したケア。",
    bodyParts: [
      { en: "Cervical & Shoulder", ja: "首・肩" },
      { en: "Arms", ja: "両腕" },
    ],
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
    <section id="menu" className="relative bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,0,220,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,0,220,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative mx-auto max-w-6xl">
        <FadeIn variant="scale" className="text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">SERVICE MENU</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            あなたの身体を、アップグレードしよう
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TIERS.map((item, i) => (
            <FadeIn key={item.number} variant={CARD_VARIANTS[i]} delay={i * 120} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-center justify-center bg-neutral-900">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={2000}
                    height={1125}
                    className="max-h-[200px] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 380px, 100vw"
                  />
                </div>

                <div className="flex flex-1 flex-col border-t border-neutral-200 px-6 py-6">
                  <p className="font-heading text-xs font-bold tracking-[0.2em] text-brand-blue">{item.tag}</p>
                  <h3 className="mt-1 font-heading text-lg font-bold text-neutral-900">
                    {item.number} {item.nameEn}
                    <span className="ml-2 text-sm font-medium text-neutral-500">{item.nameJa}</span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {item.bodyParts.map((bp) => (
                      <li
                        key={bp.en}
                        className="flex items-center justify-between border-b border-neutral-100 py-1.5 text-sm text-neutral-700"
                      >
                        <span>{bp.en}</span>
                        <span className="text-xs text-neutral-500">{bp.ja}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-1 items-end justify-between border-t border-neutral-200 pt-4">
                    <span className="text-xs font-medium text-neutral-500">{item.duration}</span>
                    <span className="font-heading text-2xl font-extrabold text-brand-blue">
                      <CountUp value={Number(item.price.replace(/[^0-9]/g, ""))} prefix="¥" />
                    </span>
                  </div>
                </div>

                <div className="flex justify-center bg-neutral-50 px-4 py-6">
                  <CtaButton
                    href={LINE_URL}
                    variant="blue"
                    className="w-full max-w-xs rounded-full px-6 py-3 text-center text-sm font-bold sm:text-base"
                  >
                    {item.number}をLINEで予約する
                  </CtaButton>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn variant="fade" delay={150}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
            <p className="text-sm leading-relaxed text-neutral-700">
              「どのメニューが合うか分からない」という方も、まずはLINEで気軽にご相談ください。
            </p>
            <CtaButton
              href={LINE_URL}
              variant="outline"
              className="mt-4 inline-block rounded-full px-6 py-3 text-sm font-bold"
            >
              まずはLINEで相談する
            </CtaButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
