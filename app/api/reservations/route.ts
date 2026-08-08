import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { CONTACT_EMAIL, RESERVATION_MENUS } from "@/lib/constants";

export const runtime = "nodejs";

type ReservationPayload = {
  name: string;
  contact: string;
  menu: string;
  preferredDatetime1: string;
  preferredDatetime2?: string;
  preferredDatetime3?: string;
  note?: string;
};

function isValidPayload(body: unknown): body is ReservationPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.contact === "string" &&
    b.contact.trim().length > 0 &&
    typeof b.menu === "string" &&
    RESERVATION_MENUS.some((m) => m.id === b.menu) &&
    typeof b.preferredDatetime1 === "string" &&
    b.preferredDatetime1.trim().length > 0
  );
}

function formatDatetime(value?: string) {
  if (!value) return null;
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
  return [
    "【新規予約】",
    `氏名: ${payload.name}`,
    `連絡先: ${payload.contact}`,
    `メニュー: ${menu ? `${menu.label} ${menu.price}` : payload.menu}`,
    `第一希望: ${formatDatetime(payload.preferredDatetime1)}`,
    payload.preferredDatetime2 ? `第二希望: ${formatDatetime(payload.preferredDatetime2)}` : null,
    payload.preferredDatetime3 ? `第三希望: ${formatDatetime(payload.preferredDatetime3)}` : null,
    payload.note ? `備考: ${payload.note}` : null,
    "決済: 未払い（お客様に決済リンクを案内済み）",
  ].filter(Boolean);
}

async function sendLineNotification(payload: ReservationPayload) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const userId = process.env.LINE_ADMIN_USER_ID;
  if (!token || !userId) return;

  await fetch("https://api.line.me/v2/bot/message/push", {
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "リクエストの形式が正しくありません。" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { ok: false, error: "氏名・連絡先・メニュー・第一希望日時は必須です。" },
      { status: 400 }
    );
  }

  // Supabase is optional — the reservation still goes through as long as at
  // least one of {database save, email notification} succeeds below.
  let savedToDatabase = false;
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { error } = await supabase.from("reservations").insert({
      name: body.name,
      contact: body.contact,
      menu: body.menu,
      preferred_datetime_1: body.preferredDatetime1,
      preferred_datetime_2: body.preferredDatetime2 || null,
      preferred_datetime_3: body.preferredDatetime3 || null,
      note: body.note || null,
    });
    savedToDatabase = !error;
  }

  let emailSent = false;
  try {
    emailSent = await sendEmailNotification(body);
  } catch {
    emailSent = false;
  }

  try {
    await sendLineNotification(body);
  } catch {
    // LINE is a best-effort extra channel; it never determines the response.
  }

  if (!savedToDatabase && !emailSent) {
    return NextResponse.json(
      { ok: false, error: "予約フォームの設定が完了していません。しばらくしてから再度お試しください。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
