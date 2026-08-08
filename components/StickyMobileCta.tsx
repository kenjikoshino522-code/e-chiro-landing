import CtaButton from "@/components/CtaButton";
import { LINE_URL } from "@/lib/constants";

export default function StickyMobileCta() {
  return (
    <div
      role="navigation"
      aria-label="クイック予約メニュー"
      className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur-sm sm:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <CtaButton
        href={LINE_URL}
        variant="yellow"
        className="flex-1 rounded-full py-2.5 text-center text-sm font-bold"
      >
        LINEで予約
      </CtaButton>
      <CtaButton
        href="/#reserve"
        variant="blue"
        external={false}
        className="flex-1 rounded-full py-2.5 text-center text-sm font-bold"
      >
        予約フォーム
      </CtaButton>
    </div>
  );
}
