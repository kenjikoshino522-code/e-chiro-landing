import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Temporary helper: reply to any message sent to the bot with the sender's
// LINE userId, so the admin can grab their own ID for LINE_ADMIN_USER_ID.
// Point the LINE webhook here temporarily, then switch it back afterward.
export async function POST(request: Request) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false });
  }

  let body: { events?: { replyToken?: string; source?: { userId?: string } }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false });
  }

  const events = Array.isArray(body.events) ? body.events : [];

  await Promise.all(
    events.map(async (event) => {
      const replyToken = event.replyToken;
      const userId = event.source?.userId;
      if (!replyToken || !userId) return;

      await fetch("https://api.line.me/v2/bot/message/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          replyToken,
          messages: [{ type: "text", text: `あなたのUser IDです:\n${userId}` }],
        }),
      });
    })
  );

  return NextResponse.json({ ok: true });
}
