const STEPS = [
  {
    number: "01",
    title: "X DMまたは公式LINEで送るだけ",
    body: "希望日時・希望場所・お名前の3つを送るだけ。予約は超シンプルです。",
  },
  {
    number: "02",
    title: "都内近郊の提携スペース、または自宅出張",
    body: "固定店舗を持たず、渋谷・新宿・池袋・赤羽・横浜・津田沼などの提携プライベート施術スペースを利用。ご自宅への出張も対応しています（別途出張料）。",
  },
  {
    number: "03",
    title: "まずは月1回のメンテナンスから",
    body: "整体のように毎週通う必要はありません。コンディションを維持するための定期メンテナンスとして、月1回から始めるのがおすすめです。",
  },
];

export default function ReservationFlow() {
  return (
    <section className="bg-neutral-50 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-brand-blue">HOW TO BOOK</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            予約の流れ
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl font-black text-brand-blue">{step.number}</span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-neutral-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
