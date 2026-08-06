import Link from "next/link";

export default function PageLinkBanner({
  eyebrow,
  title,
  description,
  href,
  buttonLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
}) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <Link
        href={href}
        className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:justify-between sm:text-left"
      >
        <div>
          <p className="text-xs font-bold tracking-widest text-brand-blue">{eyebrow}</p>
          <p className="mt-2 text-lg font-bold text-neutral-900">{title}</p>
          <p className="mt-1 text-sm text-neutral-600">{description}</p>
        </div>
        <span className="flex-none rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white">
          {buttonLabel}
        </span>
      </Link>
    </section>
  );
}
