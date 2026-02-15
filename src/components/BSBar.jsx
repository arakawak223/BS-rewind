import { motion } from "framer-motion";

const COLORS = {
  cash: { bg: "#4ade80", label: "現金" },
  goodwill: { bg: "#c084fc", label: "のれん" },
  others: { bg: "#60a5fa", label: "その他資産" },
  debt: { bg: "#f87171", label: "有利子負債" },
  otherLiab: { bg: "#fb923c", label: "その他負債" },
  equity: { bg: "#facc15", label: "純資産" },
  equityNeg: { bg: "#ef4444", label: "債務超過" },
};

/**
 * Read-only B/S stacked bar.
 * Assets (top→bottom): 現金 → のれん → その他資産
 * Right (top→bottom): 有利子負債 → その他負債 → 純資産
 * 債務超過時: 純資産ブロックが底辺(0ライン)から下方向へ突き抜ける
 */
export default function BSBar({
  data,
  barHeight = 400,
  label,
  year,
  animate = false,
  opacity = 1,
  unit,
}) {
  const cash = data.assets.cash || 0;
  const goodwill = data.assets.goodwill || 0;
  const others = data.assets.others || 0;
  const assetTotal = cash + goodwill + others;

  const debt = data.liabilities.debt || 0;
  const otherLiab = data.liabilities.others || 0;
  const equity = data.equity;
  const isNeg = equity < 0;
  const absEquity = Math.abs(equity);

  // 正の領域の最大値でスケーリング
  const rightPositive = debt + otherLiab + Math.max(equity, 0);
  const maxPositive = Math.max(assetTotal, rightPositive, 1);
  const scale = barHeight / maxPositive;

  const cashH = cash * scale;
  const gwH = goodwill * scale;
  const othersH = others * scale;

  const debtH = debt * scale;
  const otherLiabH = otherLiab * scale;
  const equityH = isNeg ? 0 : equity * scale;
  const negEquityH = isNeg ? absEquity * scale : 0;

  const assetColH = assetTotal * scale;
  const rightPosH = rightPositive * scale;

  const Component = animate ? motion.div : "div";
  const makeProps = (height) =>
    animate
      ? {
          initial: { height: 0 },
          animate: { height },
          transition: { duration: 1.2, ease: "easeOut" },
        }
      : {};

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="text-sm font-bold text-slate-300 tracking-wide">
          {label}
        </div>
      )}
      {year && (
        <div className="text-lg font-black text-white">{year}年</div>
      )}
      <div className="flex gap-1 items-start">
        {/* Assets (left) */}
        <div
          className="flex flex-col w-20 border border-slate-600 rounded overflow-hidden bg-slate-800/50"
          style={{ height: assetColH }}
        >
          {/* 現金 */}
          <Component
            {...makeProps(cashH)}
            className="w-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ height: cashH, backgroundColor: COLORS.cash.bg, opacity, minHeight: cash > 0 ? 2 : 0 }}
          >
            {cashH > 24 && (
              <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                現金<br />{cash}
              </span>
            )}
          </Component>

          {/* その他資産 */}
          <Component
            {...makeProps(othersH)}
            className="w-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ height: othersH, backgroundColor: COLORS.others.bg, opacity, minHeight: others > 0 ? 2 : 0 }}
          >
            {othersH > 24 && (
              <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                その他<br />{others}
              </span>
            )}
          </Component>

          {/* のれん */}
          {goodwill > 0 && (
            <Component
              {...makeProps(gwH)}
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                height: gwH,
                backgroundColor: COLORS.goodwill.bg,
                opacity,
                minHeight: 2,
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)",
              }}
            >
              {gwH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  のれん<br />{goodwill}
                </span>
              )}
            </Component>
          )}
        </div>

        {/* Liabilities + Equity (right) */}
        <div className="flex flex-col w-20">
          {/* 正の領域 */}
          <div
            className="flex flex-col w-full border border-slate-600 rounded-t overflow-hidden bg-slate-800/50"
            style={{ height: rightPosH }}
          >
            {/* 有利子負債 */}
            <Component
              {...makeProps(debtH)}
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ height: debtH, backgroundColor: COLORS.debt.bg, opacity, minHeight: debt > 0 ? 2 : 0 }}
            >
              {debtH > 36 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  有利子<br />負債<br />{debt}
                </span>
              )}
            </Component>

            {/* その他負債 */}
            <Component
              {...makeProps(otherLiabH)}
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ height: otherLiabH, backgroundColor: COLORS.otherLiab.bg, opacity, minHeight: otherLiab > 0 ? 2 : 0 }}
            >
              {otherLiabH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  その他<br />{otherLiab}
                </span>
              )}
            </Component>

            {/* 純資産 (正の場合のみ) */}
            {!isNeg && (
              <Component
                {...makeProps(equityH)}
                className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ height: equityH, backgroundColor: COLORS.equity.bg, opacity, minHeight: equity > 0 ? 2 : 0 }}
              >
                {equityH > 24 && (
                  <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                    純資産<br />{equity}
                  </span>
                )}
              </Component>
            )}
          </div>

          {/* 債務超過: 0ラインから突き抜ける */}
          {isNeg && (
            <>
              <div className="w-full border-t-2 border-dashed border-white/70" />
              <Component
                {...makeProps(negEquityH)}
                className="w-full flex items-center justify-center text-xs font-bold border border-t-0 border-slate-600 rounded-b"
                style={{
                  height: negEquityH,
                  backgroundColor: COLORS.equityNeg.bg,
                  opacity,
                  minHeight: 2,
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)",
                }}
              >
                {negEquityH > 20 && (
                  <span className="text-white drop-shadow-md text-center leading-tight px-1">
                    債務超過<br />{equity}
                  </span>
                )}
              </Component>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-1 text-[10px] text-slate-400">
        <span className="w-20 text-center">資産</span>
        <span className="w-20 text-center">負債+純資産</span>
      </div>
      {unit && (
        <div className="text-[10px] text-slate-500 mt-1">単位: {unit}</div>
      )}
    </div>
  );
}
