import Image from "next/image";
import CtaButton from "@/components/CtaButton";
import { LINE_URL, SITE_TAGLINE_EN_LINE1, SITE_TAGLINE_EN_LINE2 } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="top" className="bg-brand-blue">
      <h1 className="sr-only font-heading">
        e-CHIRO | {SITE_TAGLINE_EN_LINE1} {SITE_TAGLINE_EN_LINE2}
      </h1>
      <div className="mx-auto max-w-6xl">
        <Image
          src="/images/header-logo.jpg"
          alt={`e-CHIRO. ${SITE_TAGLINE_EN_LINE1} ${SITE_TAGLINE_EN_LINE2}`}
          width={3000}
          height={1000}
          priority
          className="h-[220px] w-full object-cover object-center sm:h-auto sm:object-contain"
          sizes="100vw"
        />
      </div>
      <p className="mx-auto max-w-xl px-4 pt-4 text-center text-sm font-bold leading-relaxed text-white sm:text-base">
        Dr.KEN(元プロゲーマー × 米国D.C.取得のカイロプラクター)が施術します
      </p>
      <div className="flex justify-center bg-brand-blue px-4 pb-10 pt-4 sm:pb-14">
        <CtaButton
          href={LINE_URL}
          variant="yellow"
          className="w-full max-w-sm rounded-full px-8 py-4 text-center text-base font-extrabold shadow-lg sm:text-lg"
        >
          LINEで予約・相談する
        </CtaButton>
      </div>
    </section>
  );
}
