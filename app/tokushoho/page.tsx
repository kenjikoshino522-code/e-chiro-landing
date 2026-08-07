import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  COMPANY_PHONE_NOTE,
  COMPANY_REPRESENTATIVE,
  CONTACT_EMAIL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | e-CHIRO",
  robots: { index: false },
};

const ITEMS: { label: string; value: string }[] = [
  { label: "事業者名", value: COMPANY_NAME },
  { label: "運営責任者", value: COMPANY_REPRESENTATIVE },
  { label: "所在地", value: COMPANY_ADDRESS },
  { label: "電話番号", value: COMPANY_PHONE_NOTE },
  { label: "連絡先", value: `メール：${CONTACT_EMAIL}` },
  {
    label: "役務の提供時期",
    value: "LINE公式アカウントでのご予約確定後、ご指定の日時・場所にて施術を提供します。",
  },
  {
    label: "料金",
    value:
      "①Neck & Arm Care ¥5,000（税込） / ②Total Body Care ¥12,000（税込） / ③Ultimate Body Care ¥20,000（税込）※遠方は別途出張費が発生する場合があります。",
  },
  {
    label: "料金以外の必要費用",
    value: "交通費（出張エリア外の場合）",
  },
  {
    label: "支払方法",
    value: "現金、Suica/PASMO等交通系電子マネー、QUICPay、iD、PayPay、Apple Pay、各種クレジットカード（Square決済端末利用）",
  },
  {
    label: "支払時期",
    value: "施術当日、施術前または施術後にその場でお支払いいただきます。",
  },
  {
    label: "キャンセル・返金ポリシー",
    value: "予約日の3日前まで：キャンセル料無料。前日キャンセル：施術料金の50％。当日キャンセル・無断キャンセル：全額請求とさせていただきます。",
  },
  {
    label: "返品・不良施術への対応",
    value: "サービスの性質上、返品はお受けできません。施術内容にご不明点がある場合は施術当日中にご連絡ください。",
  },
];

export default function TokushohoPage() {
  return (
    <>
      <Header />
      <main className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">LEGAL</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            特定商取引法に基づく表記
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            ※内容に変更がある場合は随時更新いたします。
          </p>

          <dl className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
            {ITEMS.map((item) => (
              <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-sm font-bold text-neutral-900">{item.label}</dt>
                <dd className="text-sm leading-relaxed text-neutral-700">{item.value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href="/#top"
            className="mt-10 inline-flex min-h-11 items-center text-sm font-bold text-brand-blue underline underline-offset-4"
          >
            ← トップページに戻る
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
