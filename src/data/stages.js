export const stages = [
  {
    stage_id: "toshiba_2006",
    company_name: "東芝",
    stage_name: "東芝 (原発買収の激震)",
    investment_target: "米ウエスチングハウス買収",
    before_year: 2006,
    after_year: 2017,
    unit: "1,000億円",
    description:
      "2006年、東芝は原子力事業の拡大を狙い、米ウエスチングハウス(WH)を約6,600億円で買収。しかし福島原発事故後、原子力事業は世界的に縮小し、巨額の減損損失が発生。債務超過に陥った。",
    data: {
      before: {
        assets: { cash: 2.5, goodwill: 0.0, others: 42.5 },
        liabilities: { debt: 11.0, others: 24.0 },
        equity: 10.0,
      },
      deal: {
        assets: { cash: 1.9, goodwill: 6.6, others: 42.5 },
        liabilities: { debt: 17.0, others: 24.0 },
        equity: 10.0,
      },
      investment: { amount: 6.6, method: "debt_financed" },
      after_actual: {
        assets: { cash: 1.0, goodwill: 0.0, others: 27.4 },
        liabilities: { debt: 22.0, others: 11.9 },
        equity: -5.5,
      },
    },
  },
  {
    stage_id: "sharp_2009",
    company_name: "シャープ",
    stage_name: "シャープ (液晶投資の光と影)",
    investment_target: "堺液晶工場建設",
    before_year: 2009,
    after_year: 2016,
    unit: "1,000億円",
    description:
      "2009年、シャープは液晶パネルの世界的リーダーを目指し、堺工場に約3,800億円を投じた。しかしスマートフォン向け有機ELの台頭や価格競争の激化により、液晶事業は急速に悪化。最終的に債務超過に陥り、2016年に鴻海(ホンハイ)精密工業の傘下に入った。",
    data: {
      before: {
        assets: { cash: 4.5, goodwill: 0.0, others: 23.5 },
        liabilities: { debt: 6.5, others: 11.5 },
        equity: 10.0,
      },
      deal: {
        assets: { cash: 1.2, goodwill: 0.0, others: 26.8 },
        liabilities: { debt: 6.5, others: 11.5 },
        equity: 10.0,
      },
      investment: { amount: 3.3, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 0.7, goodwill: 0.0, others: 10.5 },
        liabilities: { debt: 8.8, others: 5.5 },
        equity: -3.1,
      },
    },
  },
  {
    stage_id: "google_2006",
    company_name: "Google",
    stage_name: "Google (YouTube買収の伝説)",
    investment_target: "YouTube買収",
    before_year: 2006,
    after_year: 2016,
    unit: "1,000億円",
    description:
      "2006年、GoogleはYouTubeを約16.5億ドル(約2,000億円)で買収。動画プラットフォームという未知の領域への投資は当時「高すぎる」と批判された。しかしYouTubeは世界最大の動画プラットフォームとなり、Googleの広告収益を劇的に押し上げた。",
    data: {
      before: {
        assets: { cash: 11.0, goodwill: 0.0, others: 7.4 },
        liabilities: { debt: 0.0, others: 1.4 },
        equity: 17.0,
      },
      deal: {
        assets: { cash: 9.0, goodwill: 2.0, others: 7.4 },
        liabilities: { debt: 0.0, others: 1.4 },
        equity: 17.0,
      },
      investment: { amount: 2.0, method: "cash_financed" },
      after_actual: {
        assets: { cash: 95.0, goodwill: 2.0, others: 60.0 },
        liabilities: { debt: 0.0, others: 22.0 },
        equity: 135.0,
      },
    },
  },
  {
    stage_id: "tesla_2014",
    company_name: "Tesla",
    stage_name: "Tesla (ギガファクトリーの賭け)",
    investment_target: "ギガファクトリー建設",
    before_year: 2014,
    after_year: 2024,
    unit: "1,000億円",
    description:
      "2014年、TeslaはネバダにギガファクトリーをEVバッテリーの大量生産を目的に建設開始。約50億ドルの投資は、当時年間売上わずか31億ドルの企業にとって巨大な賭けだった。しかしEVの急速な普及とバッテリーコスト低減により、Teslaは世界最大のEVメーカーへと成長した。",
    data: {
      before: {
        assets: { cash: 2.4, goodwill: 0.0, others: 3.4 },
        liabilities: { debt: 2.5, others: 2.3 },
        equity: 1.0,
      },
      deal: {
        assets: { cash: 1.0, goodwill: 0.0, others: 4.8 },
        liabilities: { debt: 2.5, others: 2.3 },
        equity: 1.0,
      },
      investment: { amount: 1.4, method: "cash_to_capex" },
      after_actual: {
        assets: { cash: 45.0, goodwill: 0.0, others: 70.0 },
        liabilities: { debt: 10.0, others: 35.0 },
        equity: 70.0,
      },
    },
  },
];

/** B/Sデータの資産合計を計算 */
export function bsTotal(bs) {
  return (bs.assets.cash || 0) + (bs.assets.goodwill || 0) + (bs.assets.others || 0);
}

/** ステージの全フェーズの最大資産合計を計算 */
export function getMaxTotal(stage) {
  const { before, deal, after_actual } = stage.data;
  return Math.max(bsTotal(before), bsTotal(deal), bsTotal(after_actual));
}

export function getStage(id) {
  return stages.find((s) => s.stage_id === id);
}
