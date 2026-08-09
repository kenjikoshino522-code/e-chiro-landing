const ITEMS = ["米国D.C.資格保持", "元プロゲーマー", "完全予約制", "東京近郊出張対応"];

export default function TickerBanner() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden bg-brand-blue py-2.5" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-3 whitespace-nowrap">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-heading text-xs font-bold tracking-[0.2em] text-white/70"
          >
            {item}
            <span className="mx-3 text-white/40">・</span>
          </span>
        ))}
      </div>
    </div>
  );
}
