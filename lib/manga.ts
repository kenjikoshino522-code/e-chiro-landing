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
    slug: "exercise-boost",
    title: "「体を動かす」だけでゲームが強くなる理由",
    description: "血流と自律神経を整えると、判断も反応もブレなくなる。",
    images: [
      {
        src: "/images/manga/exercise-1.png",
        alt: "反応が遅れて負けてしまった…それ、集中力だけの問題ではなく体のコンディションが関係しているかも",
        width: 504,
        height: 504,
      },
      {
        src: "/images/manga/exercise-2.png",
        alt: "運動で血流が上がる→脳の働きが活性化！適度な運動は覚醒度や認知機能を高める",
        width: 504,
        height: 504,
      },
      {
        src: "/images/manga/exercise-3.png",
        alt: "前頭前野の働きが高まる→判断スピードUP！適度な運動は実行機能を一時的に高める",
        width: 504,
        height: 504,
      },
      {
        src: "/images/manga/exercise-4.png",
        alt: "長時間同じ姿勢は操作の質を落とす。軽く体を動かすことで緊張がほぐれ操作精度が落ちにくくなる",
        width: 504,
        height: 504,
      },
      {
        src: "/images/manga/exercise-5.png",
        alt: "血流UPは後半のパフォーマンス低下を防ぐ。合間に体を動かすと最後までパフォーマンスを維持できる",
        width: 504,
        height: 504,
      },
      {
        src: "/images/manga/exercise-6.png",
        alt: "自律神経のバランスが整う→冷静な判断に！最高のパフォーマンスは準備から始まる",
        width: 504,
        height: 504,
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
