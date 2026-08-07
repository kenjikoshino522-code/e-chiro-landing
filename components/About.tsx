import Image from "next/image";

const CAREER = [
  "元プロゲーマー(プロゲーミングチームITS 鉄拳部門所属)",
  "ウエスタンステーツ大学(University of Western States)卒業",
  "カイロプラクティック博士(Doctor of Chiropractic, D.C.)取得 ※米国",
  "理学療法士資格(Physical Therapist, PT)取得 ※米国",
  "人間生物学士(Bachelor of Human Biology)取得",
];

export default function About() {
  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-heading text-sm font-bold tracking-widest text-brand-blue">ABOUT</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            施術者紹介
          </h2>

          <div className="mt-8">
            <p className="text-2xl font-extrabold text-neutral-900">Dr.KEN</p>
            <p className="mt-1 text-sm font-medium text-neutral-600">
              代表取締役｜米国政府公認D.C.｜米国理学療法士｜元プロゲーマー
            </p>
          </div>

          <ul className="mt-6 space-y-2 border-l-2 border-brand-blue/20 pl-4">
            {CAREER.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-neutral-700">
                {item}
              </li>
            ))}
          </ul>

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
        </div>

        <div>
          <div className="mx-auto max-w-[280px] overflow-hidden rounded-2xl bg-brand-blue md:max-w-none">
            <Image
              src="/images/dr-ken-headshot.jpg"
              alt="Dr.KEN"
              width={1080}
              height={1080}
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 480px, 280px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
