"use client";

import { useState, type FormEvent } from "react";
import FadeIn from "@/components/FadeIn";
import { TSHIRT_PRICE } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const SIZES = ["S", "M", "L", "XL"];

export default function TshirtOrderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [shippingAddress, setShippingAddress] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/tshirt-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, size, quantity, shippingAddress }),
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

  if (status === "success") {
    return (
      <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center shadow-sm sm:p-12">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            ORDERED
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">
            ご注文を受け付けました
          </h2>
        </FadeIn>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          ご入力いただいたメールアドレスに、決済ページのご案内を含む確認メールをお送りします。
        </p>
      </div>
    );
  }

  return (
    <div id="order" className="mx-auto mt-16 max-w-xl">
      <div className="text-center">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
            <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
            ORDER
          </p>
          <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            注文フォーム
          </h2>
        </FadeIn>
        <FadeIn variant="fade" delay={150}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
            以下のフォームからご注文いただけます。1枚 {TSHIRT_PRICE}（税込）。
          </p>
        </FadeIn>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="tshirt-name" className="block text-sm font-bold text-neutral-900">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            id="tshirt-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label htmlFor="tshirt-email" className="block text-sm font-bold text-neutral-900">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            id="tshirt-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div>
          <label htmlFor="tshirt-phone" className="block text-sm font-bold text-neutral-900">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            id="tshirt-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tshirt-size" className="block text-sm font-bold text-neutral-900">
              サイズ <span className="text-red-500">*</span>
            </label>
            <select
              id="tshirt-size"
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            >
              <option value="" disabled>
                選択
              </option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tshirt-quantity" className="block text-sm font-bold text-neutral-900">
              枚数 <span className="text-red-500">*</span>
            </label>
            <input
              id="tshirt-quantity"
              type="number"
              min={1}
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tshirt-address" className="block text-sm font-bold text-neutral-900">
            配送先住所 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="tshirt-address"
            rows={3}
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="mt-2 w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </div>

        <p className="text-xs leading-relaxed text-neutral-500">
          ※在庫状況により発送までお時間をいただく場合がございます。あらかじめご了承ください。
        </p>

        {status === "error" && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-brand-blue px-8 py-4 text-base font-extrabold text-white shadow-lg transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "送信中..." : "この内容で注文する"}
        </button>
      </form>
    </div>
  );
}
