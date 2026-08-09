import Link from "next/link";
import CtaButton from "@/components/CtaButton";
import FadeIn from "@/components/FadeIn";
import { CONTACT_EMAIL, NOTE_URL } from "@/lib/constants";

export default function CorporatePlan() {
  return (
    <section id="corporate" className="bg-brand-blue px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <FadeIn variant="scale">
          <p className="flex items-center justify-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-yellow">
            <span aria-hidden="true" className="h-px w-5 bg-white/40" />
            FOR TEAMS &amp; COMPANIES
          </p>
          <FadeIn variant="mask" delay={100}>
            <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
              チームのコンディションを、
              <br className="sm:hidden" />
              まるごとアップグレード
            </h2>
          </FadeIn>
        </FadeIn>

        <FadeIn variant="fade" delay={150}>
          <p className="mx-auto mt-8 max-w-2xl text-left text-base leading-relaxed text-white/90">
            複数のゲーミングチーム・企業様と継続契約中。
            チームの規模・頻度・ご要望に合わせてプランをカスタマイズするため、料金・内容はお気軽にご相談ください。
          </p>
          <ul className="mx-auto mt-6 max-w-2xl space-y-2 text-left text-sm leading-relaxed text-white/90">
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-brand-yellow">✓</span>
              選手・社員への定期的なコンディショニング
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-brand-yellow">✓</span>
              大会・イベントへの出張対応
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="text-brand-yellow">✓</span>
              チーム単位・企業単位でのご相談
            </li>
          </ul>
        </FadeIn>

        <div className="mt-10 flex justify-center">
          <CtaButton
            href={`mailto:${CONTACT_EMAIL}`}
            variant="yellow"
            external={false}
            className="rounded-full px-8 py-4 text-base font-extrabold shadow-lg"
          >
            法人プランのご相談はこちら
          </CtaButton>
        </div>

        <Link
          href={NOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 flex flex-col gap-3 rounded-2xl bg-white p-6 text-left shadow-lg transition hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-blue">COLUMN</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-900">
              福利厚生としてのマッサージ導入、何がどう変わる？生産性・エンゲージメント向上の実例を解説
            </p>
          </div>
          <span className="whitespace-nowrap text-sm font-bold text-brand-blue">note記事を読む →</span>
        </Link>
      </div>
    </section>
  );
}
