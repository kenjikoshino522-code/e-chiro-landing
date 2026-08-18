"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { RESERVATION_MENUS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const LOCATIONS = ["渋谷", "新宿", "池袋", "赤羽", "横浜", "津田沼", "自宅（別途追加料金）"];

const REFERRAL_SOURCES = ["X", "Google", "紹介", "その他"];

const TIME_SLOTS = Array.from({ length: 21 }, (_, i) => {
  const totalMinutes = 10 * 60 + i * 30;
  const hour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minute = String(totalMinutes % 60).padStart(2, "0");
  return `${hour}:${minute}`;
});

export default function ReservationForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<string>(RESERVATION_MENUS[0].id);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [referralSource, setReferralSource] = useState("");
  const [referralOther, setReferralOther] = useState("");
  const [note, setNote] = useState("");

  async function submitReservation() {
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      name,
      email,
      phone,
      menu: selectedMenu,
      preferredDatetime: date && time ? `${date}T${time}` : "",
      location: location.replace("（別途追加料金）", ""),
      referralSource,
      referralOther: referralSource === "その他" ? referralOther : "",
      note,
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

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    submitReservation();
  }

  const confirmedMenu = RESERVATION_MENUS.find((m) => m.id === selectedMenu) ?? RESERVATION_MENUS[0];

  if (status === "success") {
    return (
      <section id="reserve" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-xl rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center shadow-sm sm:p-12">
          <FadeIn variant="scale">
            <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
              <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
              RESERVED
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">
              ご予約リクエストを受け付けました
            </h2>
          </FadeIn>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            担当者より日時確定のご連絡をいたします。日時確定後、お支払い（決済リンク）のご案内を別途お送りしますので、今しばらくお待ちください。
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 text-left">
            <p className="text-sm font-bold text-neutral-900">{confirmedMenu.label}</p>
            <p className="text-lg font-extrabold text-brand-blue">{confirmedMenu.price}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <FadeIn variant="scale">
            <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
              <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
              RESERVATION
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              サイトから予約する
            </h2>
          </FadeIn>
          <FadeIn variant="fade" delay={150}>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              以下のフォームからもご予約いただけます。お急ぎの方はLINEでのご相談もご利用ください。
            </p>
          </FadeIn>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2" aria-hidden="true">
          <span className={`h-1.5 w-8 rounded-full ${step === 1 ? "bg-brand-blue" : "bg-brand-blue/30"}`} />
          <span className={`h-1.5 w-8 rounded-full ${step === 2 ? "bg-brand-blue" : "bg-brand-blue/30"}`} />
        </div>
        <p className="mt-2 text-center text-xs font-bold text-neutral-500">
          {step === 1 ? "ステップ 1/2：基本情報" : "ステップ 2/2：ご希望日時・場所"}
        </p>

        <form onSubmit={handleFormSubmit} className="mt-6 space-y-6">
          {step === 1 && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-neutral-900">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-neutral-900">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-neutral-900">
                  電話番号（任意）
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                <label htmlFor="referralSource" className="block text-sm font-bold text-neutral-900">
                  当店をどこで知りましたか？ <span className="text-red-500">*</span>
                </label>
                <select
                  id="referralSource"
                  name="referralSource"
                  required
                  value={referralSource}
                  onChange={(e) => setReferralSource(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  {REFERRAL_SOURCES.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {referralSource === "その他" && (
                <div>
                  <label htmlFor="referralOther" className="block text-sm font-bold text-neutral-900">
                    詳しく教えてください
                  </label>
                  <input
                    id="referralOther"
                    name="referralOther"
                    type="text"
                    value={referralOther}
                    onChange={(e) => setReferralOther(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-brand-blue px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:opacity-90"
              >
                次へ（希望日時を入力）
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-bold text-neutral-900">
                  第一希望日時 <span className="text-red-500">*</span>
                </label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                  <select
                    id="time"
                    name="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  >
                    <option value="" disabled>
                      時間を選択
                    </option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  ※ご希望のお日にち・お時間は、施術者の空き状況により調整をお願いする場合がございます。あらかじめご了承ください。
                </p>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-bold text-neutral-900">
                  施術希望場所 <span className="text-red-500">*</span>
                </label>
                <select
                  id="location"
                  name="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-bold text-neutral-900">
                  備考（任意）
                </label>
                <textarea
                  id="note"
                  name="note"
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-neutral-300 px-6 py-4 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
                >
                  戻る
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-1 rounded-full bg-brand-blue px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting" ? "送信中..." : "この内容で予約リクエストを送る"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
