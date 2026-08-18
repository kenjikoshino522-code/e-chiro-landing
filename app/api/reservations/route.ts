import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { CONTACT_EMAIL, RESERVATION_MENUS } from "@/lib/constants";

export const runtime = "nodejs";

const LOCATIONS = ["渋谷", "新宿", "池袋", "赤羽", "横浜", "津田沼", "自宅"];
const REFERRAL_SOURCES = ["X", "Google", "紹介", "その他"];

type ReservationPayload = {
  name: string;
  email: string;
  phone?: string;
  menu: string;
  preferredDatetime: string;
  location: string;
  referralSource: string;
  referralOther?: string;
  note?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isWithinBookingHours(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes >= 10 * 60 && totalMinutes <= 20 * 60;
}

function isValidPayload(body: unknown): body is ReservationPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length === 0) return false;
  if (typeof b.email !== "string" || !EMAIL_PATTERN.test(b.email.trim())) return false;
  if (typeof b.menu !== "string" || !RESERVATION_MENUS.some((m) => m.id === b.menu)) return false;
  if (typeof b.preferredDatetime !== "string" || b.preferredDatetime.trim().length === 0) return false;
  if (!isWithinBookingHours(b.preferredDatetime)) return false;
  if (typeof b.location !== "string" || !LOCATIONS.includes(b.location)) return false;
  if (typeof b.referralSource !== "string" || !REFERRAL_SOURCES.includes(b.referralSource)) return false;
  if (b.referralSource === "その他" && (typeof b.referralOther !== "string" || b.referralOther.trim().length === 0)) {
    return false;
  }

  return true;
}

function formatDatetime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildNotificationLines(payload: ReservationPayload) {
  const menu = RESERVATION_MENUS.find((m) => m.id === payload.menu);
  const referral =
    payload.referralSource === "その他" && payload.referralOther
      ? `その他（${payload.referralOther}）`
      : payload.referralSource;

  return [
    "【新規予約】",
    `氏名: ${payload.name}`,
    `メール: ${payload.email}`,
    payload.phone ? `電話番号: ${payload.phone}` : null,
    `メニュー: ${menu ? `${menu.label} ${menu.price}` : payload.menu}`,
    `希望日時: ${formatDatetime(payload.preferredDatetime)}`,
    `希望場所: ${payload.location}`,
    `流入経路: ${referral}`,
    payload.note ? `備考: ${payload.note}` : null,
    "決済: 未払い（日時確定後にご案内予定）",
  ].filter(Boolean);
}

async function sendLineNotification(payload: ReservationPayload): Promise<boolean> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = process.env.LINE_ADMIN_USER_ID;
  if (!token || !userId) return false;

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: "text", text: buildNotificationLines(payload).join("\n") }],
    }),
  });

  return res.ok;
}

async function sendEmailNotification(payload: ReservationPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const lines = buildNotificationLines(payload);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "e-CHIRO予約フォーム <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      subject: `【新規予約】${payload.name}様`,
      text: lines.join("\n"),
    }),
  });

  return res.ok;
}

async function sendCustomerConfirmationEmail(payload: ReservationPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const menu = RESERVATION_MENUS.find((m) => m.id === payload.menu);

  const lines = [
    `${payload.name} 様`,
    "",
    "この度はe-CHIROにご予約リクエストをいただき、誠にありがとうございます。",
    "以下の内容で承りました。",
    "",
    `メニュー: ${menu ? `${menu.label} ${menu.price}` : payload.menu}`,
    `第一希望日時: ${formatDatetime(payload.preferredDatetime)}`,
    `希望場所: ${payload.location}`,
    "",
    "担当者より改めて日時確定のご連絡をいたします。",
    "日時確定後にお支払い（決済リンク）のご案内を別途お送りしますので、今しばらくお待ちください。",
    "",
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
      subject: "【e-CHIRO】ご予約リクエストを受け付けました",
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
      {
        ok: false,
        error:
          "氏名・メールアドレス・メニュー・希望日時（10:00〜20:00）・希望場所・流入経路は必須です。",
      },
      { status: 400 }
    );
  }

  // Supabase/email/LINE are all optional — the reservation goes through as
  // long as at least one of them actually succeeds below.
  let savedToDatabase = false;
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("reservations").insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      menu: body.menu,
      preferred_datetime: body.preferredDatetime,
      location: body.location,
      referral_source: body.referralSource,
      referral_source_other: body.referralSource === "その他" ? body.referralOther || null : null,
      note: body.note || null,
    });
    savedToDatabase = !error;
    if (error) console.error("[reservations] supabase insert error", error);
  }

  let adminEmailSent = false;
  try {
    adminEmailSent = await sendEmailNotification(body);
    if (!adminEmailSent) console.error("[reservations] admin email failed (non-ok response)");
  } catch (e) {
    console.error("[reservations] admin email threw", e);
    adminEmailSent = false;
  }

  try {
    await sendCustomerConfirmationEmail(body);
  } catch (e) {
    console.error("[reservations] customer email threw", e);
  }

  let lineSent = false;
  try {
    lineSent = await sendLineNotification(body);
    if (!lineSent) console.error("[reservations] line notification failed (non-ok response)");
  } catch (e) {
    console.error("[reservations] line notification threw", e);
    lineSent = false;
  }

  if (!savedToDatabase && !adminEmailSent && !lineSent) {
    return NextResponse.json(
      { ok: false, error: "予約フォームの設定が完了していません。しばらくしてから再度お試しください。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
