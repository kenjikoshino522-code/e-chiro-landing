import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ZoomableGallery from "@/components/ZoomableGallery";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/FadeIn";
import CountUp from "@/components/CountUp";
import TshirtOrderForm from "@/components/TshirtOrderForm";
import { LINE_URL, SITE_URL, TSHIRT_TREATED_PRICE, X_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "e-CHIRO オリジナルTシャツ | e-CHIRO",
  alternates: { canonical: `${SITE_URL}/tshirts` },
};

const SIZE_ROWS = [
  { label: "身丈", s: 65, m: 68, l: 71 },
  { label: "身幅", s: 48, m: 52, l: 56 },
  { label: "肩幅", s: 43, m: 46, l: 49 },
  { label: "袖丈", s: 18, m: 19, l: 20 },
];

const COLORS = [
  {
    name: "半袖黒 / 白刺繍",
    images: [
      { src: "/images/tshirts/black-01.jpg", alt: "e-CHIRO Tシャツ 黒 全体" },
      { src: "/images/tshirts/black-02.jpg", alt: "e-CHIRO Tシャツ 黒 商品説明" },
      { src: "/images/tshirts/black-03.jpg", alt: "e-CHIRO Tシャツ 黒 刺繍アップ" },
    ],
  },
  {
    name: "半袖白 / 青刺繍",
    images: [
      { src: "/images/tshirts/white-01.jpg", alt: "e-CHIRO Tシャツ 白 全体" },
      { src: "/images/tshirts/white-02.jpg", alt: "e-CHIRO Tシャツ 白 商品説明" },
      { src: "/images/tshirts/white-03.jpg", alt: "e-CHIRO Tシャツ 白 刺繍アップ" },
      { src: "/images/tshirts/white-04.jpg", alt: "e-CHIRO Tシャツ 白 ディテール" },
    ],
  },
];

export default function TshirtsPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <FadeIn variant="scale">
              <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
              <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
              MERCHANDISE
            </p>
              <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                e-CHIRO オリジナルTシャツ
              </h1>
            </FadeIn>
            <FadeIn variant="fade" delay={150}>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
                Organic Cotton（オーガニックコットン）を使用した、e-CHIROロゴ入りTシャツです。
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm font-bold text-brand-blue">
                ロゴはプリントではなく、一枚一枚丁寧な刺繍仕上げ。
              </p>
              <p className="mt-4 font-heading text-2xl font-extrabold text-brand-blue">
                <CountUp value={5970} prefix="¥" />
                <span className="ml-1 font-sans text-sm font-medium text-neutral-500">(税込)</span>
              </p>
              <p className="mt-3 text-xs text-neutral-400">画像タップで拡大表示できます</p>
            </FadeIn>
            <FadeIn variant="fade" delay={200}>
              <div className="mx-auto mt-6 max-w-md rounded-xl border border-brand-blue/20 bg-brand-blue/5 px-5 py-4 text-left text-sm leading-relaxed text-neutral-700">
                <p className="font-bold text-neutral-900">🎁 施術を受けた方限定価格 {TSHIRT_TREATED_PRICE}</p>
                <p className="mt-1">ご予約時にご希望のカラー・サイズをお伝えください。</p>
              </div>
            </FadeIn>
          </div>

          <div className="mt-16 space-y-16">
            {COLORS.map((color) => (
              <div key={color.name}>
                <h2 className="font-heading text-lg font-bold text-neutral-900">{color.name}</h2>
                <div className="mt-4">
                  <ZoomableGallery images={color.images} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="text-lg font-bold text-neutral-900">サイズ表 (cm)</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200">
              <table className="w-full min-w-[360px] text-sm">
                <thead>
                  <tr className="bg-neutral-50 text-left">
                    <th className="px-4 py-3 font-bold text-neutral-900">サイズ</th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-900">S</th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-900">M</th>
                    <th className="px-4 py-3 text-center font-bold text-neutral-900">L</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-neutral-200">
                      <td className="px-4 py-3 font-medium text-neutral-700">{row.label}</td>
                      <td className="px-4 py-3 text-center text-neutral-700">{row.s}</td>
                      <td className="px-4 py-3 text-center text-neutral-700">{row.m}</td>
                      <td className="px-4 py-3 text-center text-neutral-700">{row.l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-xl rounded-2xl bg-neutral-50 p-8 text-center">
            <p className="text-sm leading-relaxed text-neutral-700">
              ご購入方法はLINE公式アカウントまたはXのDMよりお気軽にお問い合わせください。
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaButton
                href={LINE_URL}
                variant="blue"
                className="rounded-full px-8 py-4 text-center text-sm font-bold shadow-lg"
              >
                LINEで問い合わせる
              </CtaButton>
              <CtaButton
                href={X_URL}
                variant="outline"
                className="rounded-full px-8 py-4 text-center text-sm font-bold"
              >
                Xで問い合わせる
              </CtaButton>
            </div>
          </div>

          <TshirtOrderForm />

          <FadeIn variant="fade">
            <p className="mt-20 text-center text-sm font-bold text-neutral-500">
              👕 e-CHIROグッズ、続々登場予定
            </p>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
