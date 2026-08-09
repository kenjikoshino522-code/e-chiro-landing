import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Chakra_Petch } from "next/font/google";
import "./globals.css";
import StickyMobileCta from "@/components/StickyMobileCta";
import ScrollProgress from "@/components/ScrollProgress";
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  LINE_URL,
  RESERVATION_MENUS,
  SITE_URL,
  X_URL,
} from "@/lib/constants";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-chakra-petch",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "e-CHIRO | Empowering e-Sports Players, Gamers, and Creators.",
  description:
    "東京近郊で出張対応する、eスポーツ選手・ゲーマー・デスクワーカーのためのカイロプラクティック。米国D.C.取得・元プロゲーマーのDr.KENが、長時間のPC作業やプレイによる肩こり・腰痛のコンディショニングをサポートします。",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "e-CHIRO | Upgrade Your Body & Tier!",
    description:
      "eスポーツ選手・ゲーマー・クリエイターのための出張カイロプラクティック。米国政府公認D.C.資格保持のDr.KENが施術します。",
    url: SITE_URL,
    siteName: "e-CHIRO",
    locale: "ja_JP",
    type: "website",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY_NAME,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressCountry: "JP",
    streetAddress: COMPANY_ADDRESS,
  },
  areaServed: "東京都近郊",
  priceRange: `¥${Math.min(...RESERVATION_MENUS.map((m) => Number(m.price.replace(/[^0-9]/g, ""))))}〜¥${Math.max(...RESERVATION_MENUS.map((m) => Number(m.price.replace(/[^0-9]/g, ""))))}`,
  sameAs: [LINE_URL, X_URL],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenKakuGothicNew.variable} ${chakraPetch.variable}`}>
      <body className="pb-16 font-sans antialiased sm:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <ScrollProgress />
        {children}
        <StickyMobileCta />
      </body>
    </html>
  );
}
