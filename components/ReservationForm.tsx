"use client";

import { useState, type FormEvent } from "react";
import { RESERVATION_MENUS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export default function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<string>(RESERVATION_MENUS[0].id);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      contact: String(data.get("contact") || ""),
      menu: String(data.get("menu") || ""),
      preferredDatetime1: String(data.get("preferredDatetime1") || ""),
      preferredDatetime2: String(data.get("preferredDatetime2") || ""),
      preferredDatetime3: String(data.get("preferredDatetime3") || ""),
      note: String(data.get("note") || ""),
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok || !result.ok) {
        setErrorMessage(result.error || "送信に失敗しました。時間をおいて再度お試しください。");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("通信エラーが発生しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  }

  const confirmedMenu = RESERVATION_MENUS.find((m) => m.id === selectedMenu) ?? RESERVATION_MENUS[0];

  if (status === "success") {
    return (
      <section id="reserve" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center shadow-sm sm:p-12">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">RESERVED</p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">
            ご予約リクエストを受け付けました
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            内容を確認の上、担当より折り返しご連絡いたします。決済は以下のリンクより事前にお済ませいただけます。
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 text-left">
            <p className="text-sm font-bold text-neutral-900">{confirmedMenu.label}</p>
            <p className="text-lg font-extrabold text-brand-blue">{confirmedMenu.price}</p>
          </div>

          <a
            href={confirmedMenu.squareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full rounded-full bg-brand-blue px-8 py-4 text-center text-base font-extrabold text-white shadow-lg transition hover:opacity-90"
          >
            決済ページへ進む
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">RESERVATION</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            サイトから予約する
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
            以下のフォームからもご予約いただけます。お急ぎの方はLINEでのご相談もご利用ください。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-neutral-900">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-bold text-neutral-900">
              連絡先（メールまたは電話番号） <span className="text-red-500">*</span>
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <fieldset>
            <legend className="text-sm font-bold text-neutral-900">
              希望メニュー <span className="text-red-500">*</span>
            </legend>
            <div className="mt-2 space-y-2">
              {RESERVATION_MENUS.map((menu) => (
                <label
                  key={menu.id}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-neutral-300 px-4 py-3 text-sm has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5"
                >
                  <input
                    type="radio"
                    name="menu"
                    value={menu.id}
                    checked={selectedMenu === menu.id}
                    onChange={() => setSelectedMenu(menu.id)}
                    className="h-4 w-4 accent-brand-blue"
                    required
                  />
                  <span className="flex-1 text-neutral-900">{menu.label}</span>
                  <span className="font-bold text-brand-blue">{menu.price}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="preferredDatetime1" className="block text-sm font-bold text-neutral-900">
              第一希望日時 <span className="text-red-500">*</span>
            </label>
            <input
              id="preferredDatetime1"
              name="preferredDatetime1"
              type="datetime-local"
              required
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="preferredDatetime2" className="block text-sm font-bold text-neutral-900">
              第二希望日時（任意）
            </label>
            <input
              id="preferredDatetime2"
              name="preferredDatetime2"
              type="datetime-local"
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="preferredDatetime3" className="block text-sm font-bold text-neutral-900">
              第三希望日時（任意）
            </label>
            <input
              id="preferredDatetime3"
              name="preferredDatetime3"
              type="datetime-local"
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-bold text-neutral-900">
              備考（任意）
            </label>
            <textarea
              id="note"
              name="note"
              rows={4}
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>

          {status === "error" && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-brand-blue px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? "送信中..." : "この内容で予約リクエストを送る"}
          </button>
        </form>
      </div>
    </section>
  );
}
