import Image from "next/image";
import { LINE_URL, SITE_TAGLINE_EN_LINE1, SITE_TAGLINE_EN_LINE2 } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="top" className="bg-brand-blue">
      <h1 className="sr-only">
        e-CHIRO | {SITE_TAGLINE_EN_LINE1} {SITE_TAGLINE_EN_LINE2}
      </h1>
      <div className="mx-auto max-w-6xl">
        <Image
          src="/images/hero-banner.jpg"
          alt={`e-CHIRO. ${SITE_TAGLINE_EN_LINE1} ${SITE_TAGLINE_EN_LINE2}`}
          width={2000}
          height={1125}
          priority
          className="w-full"
          sizes="100vw"
        />
      </div>
      <div className="flex justify-center bg-brand-blue px-4 pb-10 pt-2 sm:pb-14">
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm rounded-full bg-brand-yellow px-8 py-4 text-center text-base font-extrabold text-brand-blue shadow-lg transition hover:scale-[1.02] sm:text-lg"
        >
          LINEで予約・相談する
        </a>
      </div>
    </section>
  );
}
