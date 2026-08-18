import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { CONTACT_EMAIL, TSHIRT_PRICE, TSHIRT_SQUARE_LINK } from "@/lib/constants";

export const runtime = "nodejs";

const SIZES = ["S", "M", "L", "XL"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  size: string;
  quantity: string;
  shippingAddress: string;
};

function isValidPayload(body: unknown): body is OrderPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length === 0) return false;
  if (typeof b.email !== "string" || !EMAIL_PATTERN.test(b.email.trim())) return false;
  if (typeof b.phone !== "string" || b.phone.trim().length === 0) return false;
  if (typeof b.size !== "string" || !SIZES.includes(b.size)) return false;
  if (typeof b.shippingAddress !== "string" || b.shippingAddress.trim().length === 0) return false;
  if (typeof b.quantity !== "string") return false;
  const quantity = Number(b.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) return false;

  return true;
}

function unitPriceYen() {
  return Number(TSHIRT_PRICE.replace(/[^0-9]/g, ""));
}

function buildNotificationLines(payload: OrderPayload) {
  const quantity = Number(payload.quantity);
  const total = unitPriceYen() * quantity;
  return [
    "【Tシャツ新規注文】",
    `氏名: ${payload.name}`,
    `メール: ${payload.email}`,
    `電話番号: ${payload.phone}`,
    `サイズ: ${payload.size}`,
    `枚数: ${quantity}枚`,
    `合計金額: ¥${total.toLocaleString("ja-JP")}（${TSHIRT_PRICE} × ${quantity}）`,
    `配送先住所: ${payload.shippingAddress}`,
    "決済: 未払い（お客様に確認メールで決済リンクを案内済み）",
  ];
}

async function sendAdminNotification(payload: OrderPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "e-CHIRO注文フォーム <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `【Tシャツ新規注文】${payload.name}様`,
      text: buildNotificationLines(payload).join("\n"),
    }),
  });

  return res.ok;
}

async function sendCustomerConfirmation(payload: OrderPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const quantity = Number(payload.quantity);
  const total = unitPriceYen() * quantity;

  const lines = [
    `${payload.name} 様`,
    "",
    "この度はe-CHIROオリジナルTシャツにご注文いただき、誠にありがとうございます。",
    "以下の内容で承りました。",
    "",
    `サイズ: ${payload.size}`,
    `枚数: ${quantity}枚`,
    `合計金額: ¥${total.toLocaleString("ja-JP")}（税込）`,
    `配送先住所: ${payload.shippingAddress}`,
    "",
    "お支払いは、以下のリンクよりお願いいたします。",
    TSHIRT_SQUARE_LINK,
    "",
    "在庫状況により発送までお時間をいただく場合がございます。あらかじめご了承ください。",
    "何かご不明な点がございましたら、本メールへの返信または公式LINEにてお気軽にお問い合わせください。",
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "e-CHIRO <onboarding@resend.dev>",
      to: [payload.email],
      subject: "【e-CHIRO】Tシャツのご注文を受け付けました",
      text: lines.join("\n"),
    }),
  });

  return res.ok;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "リクエストの形式が正しくありません。" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "氏名・メールアドレス・電話番号・サイズ・枚数・配送先住所は必須です。" },
      { status: 400 }
    );
  }

  let savedToDatabase = false;
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("tshirt_orders").insert({
      name: body.name,
      email: body.email,
      phone: body.phone,
      size: body.size,
      quantity: Number(body.quantity),
      shipping_address: body.shippingAddress,
    });
    savedToDatabase = !error;
    if (error) console.error("[tshirt-orders] supabase insert error", error);
  }

  let adminEmailSent = false;
  try {
    adminEmailSent = await sendAdminNotification(body);
    if (!adminEmailSent) console.error("[tshirt-orders] admin email failed (non-ok response)");
  } catch (e) {
    console.error("[tshirt-orders] admin email threw", e);
  }

  try {
    await sendCustomerConfirmation(body);
  } catch (e) {
    console.error("[tshirt-orders] customer email threw", e);
  }

  if (!savedToDatabase && !adminEmailSent) {
    return NextResponse.json(
      { ok: false, error: "注文フォームの設定が完了していません。しばらくしてから再度お試しください。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
