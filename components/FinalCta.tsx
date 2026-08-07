import { LINE_URL } from "@/lib/constants";

export default function FinalCta() {
  return (
    <section className="bg-neutral-950 px-4 py-24 text-center text-white sm:px-6 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-heading text-sm font-bold tracking-widest text-brand-yellow">READY?</p>
        <h2 className="mt-3 font-heading text-4xl font-black tracking-tight sm:text-5xl">
          LEVEL UP YOUR BODY
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
          完全予約制・都内近郊に出張対応。まずはLINEでお気軽にご相談ください。
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-sm rounded-full bg-brand-yellow px-8 py-4 text-center text-base font-extrabold text-brand-blue shadow-lg transition hover:scale-[1.02] sm:text-lg"
          >
            LINEで予約・相談する
          </a>
        </div>
      </div>
    </section>
  );
}
