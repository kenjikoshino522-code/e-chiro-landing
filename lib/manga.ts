export type MangaImage = { src: string; alt: string; width: number; height: number };

export type MangaSeries = {
  slug: string;
  title: string;
  description: string;
  images: MangaImage[];
};

export const MANGA_SERIES: MangaSeries[] = [
  {
    slug: "intro",
    title: "そのエイムの乱れ、原因は「デバイス」ではなく「体」にある。",
    description: "WHO基準の専門家が提供する、ゲーマーのためのパフォーマンス向上メソッド「e-CHIRO」とは。",
    images: [
      {
        src: "/images/manga/intro-1.png",
        alt: "そのエイムの乱れ、原因は「デバイス」ではなく「体」にある。e-CHIRO：WHO基準の専門家が提供する、ゲーマーのためのパフォーマンス向上メソッド。",
        width: 2560,
        height: 1440,
      },
      {
        src: "/images/manga/intro-2.png",
        alt: "ランクが上がらず悩むゲーマーに、Dr.KENがe-CHIROのパフォーマンス・アップ・メソッドを紹介",
        width: 896,
        height: 1195,
      },
      {
        src: "/images/manga/intro-3.png",
        alt: "カイロプラクティックはWHOが認める国際的なヘルスケア。4200時間以上の専門教育とNBCE4段階の国家試験",
        width: 1056,
        height: 1408,
      },
      {
        src: "/images/manga/intro-4.png",
        alt: "e-CHIROのおかげでランクアップ達成。最高のデバイスに、最高のコンディションを",
        width: 1056,
        height: 1408,
      },
      {
        src: "/images/manga/intro-5.png",
        alt: "予約方法：X DMまたは公式LINEで希望日時と場所を送るだけ。対応エリアと月1回のメンテナンスのすすめ",
        width: 1086,
        height: 1448,
      },
    ],
  },
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
