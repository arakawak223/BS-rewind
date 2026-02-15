export const stages = [
  {
    stage_id: "toshiba_2006",
    company_name: "東芝",
    investment_target: "米ウエスチングハウス買収",
    before_year: 2006,
    after_year: 2017,
    unit: "1000億円(1ブロック)",
    description:
      "2006年、東芝は原子力事業の拡大を狙い、米ウエスチングハウス(WH)を約6,600億円で買収。しかし福島原発事故後、原子力事業は世界的に縮小し、巨額の減損損失が発生。債務超過に陥った。",
    data: {
      before: {
        assets: { cash: 25, goodwill: 0, others: 20 },
        liabilities: { debt: 15, others: 20 },
        equity: 10,
      },
      investment: {
        amount: 6.6,
        method: "debt_financed",
      },
      after_actual: {
        assets: { cash: 9.9, goodwill: 0, others: 27.5 },
        liabilities: { debt: 25, others: 17.9 },
        equity: -5.5,
      },
    },
  },
];

/**
 * 投資直後のB/Sを計算する。
 * debt_financed: のれんが増加、同額が有利子負債で調達。
 * cash_financed: のれんが増加、同額の現金が減少。
 */
export function calcPostDeal(stage) {
  const { before, investment } = stage.data;
  const amount = investment.amount;

  if (investment.method === "debt_financed") {
    return {
      assets: {
        cash: before.assets.cash,
        goodwill: (before.assets.goodwill || 0) + amount,
        others: before.assets.others,
      },
      liabilities: {
        debt: before.liabilities.debt + amount,
        others: before.liabilities.others,
      },
      equity: before.equity,
    };
  }

  // cash_financed: 現金が減り、のれんが増える
  return {
    assets: {
      cash: before.assets.cash - amount,
      goodwill: (before.assets.goodwill || 0) + amount,
      others: before.assets.others,
    },
    liabilities: { ...before.liabilities },
    equity: before.equity,
  };
}

export function getStage(id) {
  return stages.find((s) => s.stage_id === id);
}
