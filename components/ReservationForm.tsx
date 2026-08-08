"use client";

import { useState, type FormEvent } from "react";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/FadeIn";
import { RESERVATION_MENUS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export default function ReservationForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<string>(RESERVATION_MENUS[0].id);
  const [datetime1, setDatetime1] = useState("");
  const [datetime2, setDatetime2] = useState("");
  const [datetime3, setDatetime3] = useState("");
  const [note, setNote] = useState("");

  async function submitReservation() {
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      name,
      contact,
      menu: selectedMenu,
      preferredDatetime1: datetime1,
      preferredDatetime2: datetime2,
      preferredDatetime3: datetime3,
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
            <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">RESERVED</p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">
              ご予約リクエストを受け付けました
            </h2>
          </FadeIn>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            内容を確認の上、担当より折り返しご連絡いたします。決済は以下のリンクより事前にお済ませいただけます。
          </p>

          <div className="mt-8 rounded-xl bg-white p-6 text-left">
            <p className="text-sm font-bold text-neutral-900">{confirmedMenu.label}</p>
            <p className="text-lg font-extrabold text-brand-blue">{confirmedMenu.price}</p>
          </div>

          <CtaButton
            href={confirmedMenu.squareLink}
            variant="blue"
            className="mt-6 block w-full rounded-full px-8 py-4 text-center text-base font-extrabold shadow-lg"
          >
            決済ページへ進む
          </CtaButton>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <FadeIn variant="scale">
            <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">RESERVATION</p>
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
          {step === 1 ? "ステップ 1/2：基本情報" : "ステップ 2/2：ご希望日時"}
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
                <label htmlFor="contact" className="block text-sm font-bold text-neutral-900">
                  連絡先（メールまたは電話番号） <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
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
                <label htmlFor="preferredDatetime1" className="block text-sm font-bold text-neutral-900">
                  第一希望日時 <span className="text-red-500">*</span>
                </label>
                <input
                  id="preferredDatetime1"
                  name="preferredDatetime1"
                  type="datetime-local"
                  required
                  value={datetime1}
                  onChange={(e) => setDatetime1(e.target.value)}
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
                  value={datetime2}
                  onChange={(e) => setDatetime2(e.target.value)}
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
                  value={datetime3}
                  onChange={(e) => setDatetime3(e.target.value)}
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
