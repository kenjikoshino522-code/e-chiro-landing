export type MangaImage = { src: string; alt: string; width: number; height: number };

export type MangaSeries = {
  slug: string;
  title: string;
  description: string;
  images: MangaImage[];
};

export const MANGA_SERIES: MangaSeries[] = [
  {
    slug: "sleep-hack",
    title: "「ゲーム→風呂→就寝」が最強の自律神経ハック",
    description: "入浴のタイミングを間違えると、寝つきもゲームの調子も落ちる。",
    images: [
      {
        src: "/images/manga/sleepinggame-1.png",
        alt: "無自覚に睡眠の質が落ちているせいで、ゲームのパフォーマンスも落ちている",
        width: 507,
        height: 869,
      },
      {
        src: "/images/manga/sleepinggame-2.png",
        alt: "自律神経とは、交感神経（アクセル）と副交感神経（ブレーキ）の切り替えのこと",
        width: 512,
        height: 875,
      },
      {
        src: "/images/manga/sleepinggame-3.png",
        alt: "ゲームと入浴で何が起きる？風呂→ゲーム→就寝と、ゲーム→風呂→就寝の比較",
        width: 506,
        height: 651,
      },
      {
        src: "/images/manga/sleepinggame-4.png",
        alt: "睡眠の質を上げるコツ。ゲーム→お風呂→ストレッチ→就寝のナイトルーティン",
        width: 1824,
        height: 2352,
      },
    ],
  },
];

export function getMangaSeries(slug: string): MangaSeries | undefined {
  return MANGA_SERIES.find((series) => series.slug === slug);
}
