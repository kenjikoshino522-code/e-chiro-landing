import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function PageLinkBanner({
  eyebrow,
  title,
  description,
  href,
  buttonLabel,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6">
      <FadeIn variant="scale" className="mx-auto max-w-4xl">
        <Link
          href={href}
          className="group flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:text-left">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                width={96}
                height={96}
                className="h-20 w-20 flex-none rounded-xl object-cover sm:h-24 sm:w-24"
              />
            )}
            <div>
              <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-widest text-brand-blue">
                <span aria-hidden="true" className="h-px w-4 bg-brand-blue" />
                {eyebrow}
              </p>
              <p className="mt-2 font-heading text-lg font-bold text-neutral-900">{title}</p>
              <p className="mt-1 text-sm text-neutral-600">{description}</p>
            </div>
          </div>
          <span className="flex-none rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition duration-300 ease-out group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(30,0,220,0.45)] group-active:scale-95">
            {buttonLabel}
          </span>
        </Link>
      </FadeIn>
    </section>
  );
}
