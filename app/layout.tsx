import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "e-CHIRO | Empowering e-Sports Players, Gamers, and Creators.",
  description:
    "米国政府公認カイロプラクティック・ドクター Dr.KEN による、eスポーツ選手・ゲーマー・クリエイターのための出張カイロプラクティック。Upgrade Your Body & Tier!",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
