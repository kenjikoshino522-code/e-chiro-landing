import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import ParallaxImage from "@/components/ParallaxImage";

const CAREER = [
  "元プロゲーマー(プロゲーミングチームITS 鉄拳部門所属)",
  "ウエスタンステーツ大学(University of Western States)卒業",
  "カイロプラクティック博士(Doctor of Chiropractic, D.C.)取得 ※米国",
  "理学療法士資格(Physical Therapist, PT)取得 ※米国",
  "人間生物学士(Bachelor of Human Biology)取得",
];

const CREDENTIALS = [
  { title: "米国D.C.資格", body: "Doctor of Chiropractic (D.C.)" },
  { title: "元プロゲーマー", body: "eスポーツ専門のコンディショニング" },
  { title: "法人・チーム対応", body: "出張実績あり" },
];

export default function About() {
  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <FadeIn variant="scale">
            <p className="flex items-center gap-2 font-heading text-sm font-bold tracking-widest text-brand-blue">
              <span aria-hidden="true" className="h-px w-5 bg-brand-blue" />
              ABOUT
            </p>
            <FadeIn variant="mask" delay={100}>
              <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                施術者紹介
              </h2>
            </FadeIn>
          </FadeIn>

          <FadeIn variant="fade" delay={150}>
            <div className="mt-8">
              <p className="text-2xl font-extrabold text-neutral-900">Dr.KEN</p>
              <p className="mt-1 text-sm font-medium text-neutral-600">
                代表取締役｜米国D.C.（Doctor of Chiropractic）｜元プロゲーマー
              </p>
            </div>

            <ul className="mt-6 space-y-2 border-l-2 border-brand-blue/20 pl-4">
              {CAREER.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-neutral-700">
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
              D.C.（Doctor of Chiropractic）は、4年制・4200時間以上の教育を受け、米国の国家試験（NBCE、計4科目）に合格して取得する資格です。
              世界約40の国・地域で法制化されており、WHO（世界保健機関）もヘルスケアの一つに位置づけています。
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
              <p>
                プロゲーマーとして1日10時間以上座り続けていた時期、首や腰の痛みで集中できない辛さを自ら経験。
                その体を変えてくれたカイロプラクターとの出会いをきっかけに、プロゲーマーからカイロプラクターへと
                キャリアを転身しました。
              </p>
              <p>
                同じ悩みを抱えるプレイヤー・ゲーマー・クリエイターの力になりたいという想いから、
                出張型カイロプラクティック「e-CHIRO」を立ち上げました。
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {CREDENTIALS.map((c) => (
                <div
                  key={c.title}
                  className="border-l-2 border-brand-blue bg-neutral-50 px-4 py-3 text-sm text-neutral-700"
                >
                  <p className="font-bold text-neutral-900">{c.title}</p>
                  <p className="mt-0.5 text-xs text-neutral-500">{c.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn variant="slide-right" delay={200}>
          <ParallaxImage className="mx-auto max-w-[280px] rounded-2xl bg-brand-blue md:max-w-none">
            <Image
              src="/images/dr-ken-headshot.jpg"
              alt="Dr.KEN"
              width={1080}
              height={1080}
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 480px, 280px"
            />
          </ParallaxImage>
        </FadeIn>
      </div>
    </section>
  );
}
