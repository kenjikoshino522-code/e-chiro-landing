import FadeIn from "@/components/FadeIn";

const CARD_VARIANTS = ["slide-left", "slide-up", "slide-right"] as const;

const STEPS = [
  {
    number: "01",
    title: "X DMまたは公式LINEで送るだけ",
    body: "希望日時・希望場所・お名前の3つを送るだけ。予約は超シンプルです。",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "都内近郊の提携スペース、または自宅出張",
    body: "固定店舗を持たず、渋谷・新宿・池袋・赤羽・横浜・津田沼などの提携プライベート施術スペースを利用。ご自宅への出張も対応しています（別途出張料）。",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "まずは月1回のメンテナンスから",
    body: "整体のように毎週通う必要はありません。コンディションを維持するための定期メンテナンスとして、月1回から始めるのがおすすめです。",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4.5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 14l2.2 2.2L16 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ReservationFlow() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn variant="scale" className="text-center">
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">HOW TO BOOK</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            予約の流れ
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} variant={CARD_VARIANTS[i]} delay={i * 120} className="relative">
              <div className="h-full rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    {step.icon}
                  </span>
                  <span className="font-heading text-2xl font-black text-brand-blue">{step.number}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-neutral-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{step.body}</p>
              </div>

              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 sm:block">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-blue/40">
                    <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
