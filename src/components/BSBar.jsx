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
 * Assets (top→bottom): 現金 → その他資産 → のれん
 * Right (top→bottom): 有利子負債 → その他負債 → 純資産
 * 債務超過時: 純資産ブロックが底辺(0ライン)から下方向へ突き抜ける
 *
 * maxTotal: 外部から与えるスケーリング基準値。複数バーの一貫性に使う。
 */
export default function BSBar({
  data,
  barHeight = 400,
  maxTotal,
  label,
  labelClassName,
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
  const ownMax = Math.max(assetTotal, rightPositive, 1);
  const referenceMax = maxTotal || ownMax;
  const scale = barHeight / referenceMax;

  const cashH = cash * scale;
  const gwH = goodwill * scale;
  const othersH = others * scale;

  const debtH = debt * scale;
  const otherLiabH = otherLiab * scale;
  const equityH = isNeg ? 0 : equity * scale;
  const negEquityH = isNeg ? absEquity * scale : 0;

  const assetColH = assetTotal * scale;
  const rightPosH = rightPositive * scale;

  const Wrapper = animate ? motion.div : "div";
  const containerProps = (height) =>
    animate
      ? {
          initial: { height: 0 },
          animate: { height },
          transition: { duration: 1.0, ease: "easeOut" },
        }
      : { style: { height } };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className={labelClassName || "text-sm font-bold text-slate-300 tracking-wide"}>
          {label}
        </div>
      )}
      {year && (
        <div className="text-lg font-black text-white">{year}年</div>
      )}
      <div className="flex gap-1 items-start" style={{ height: barHeight }}>
        {/* Assets (left) */}
        <Wrapper
          {...containerProps(assetColH)}
          className="flex flex-col w-16 border border-slate-600 rounded overflow-hidden bg-slate-800/50"
        >
          {/* 現金 */}
          {animate ? (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: cashH }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: COLORS.cash.bg, opacity, minHeight: cash > 0 ? 2 : 0 }}
            >
              {cashH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  現金<br />{cash}
                </span>
              )}
            </motion.div>
          ) : (
            <div
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ height: cashH, backgroundColor: COLORS.cash.bg, opacity, minHeight: cash > 0 ? 2 : 0 }}
            >
              {cashH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  現金<br />{cash}
                </span>
              )}
            </div>
          )}

          {/* その他資産 */}
          {animate ? (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: othersH }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: COLORS.others.bg, opacity, minHeight: others > 0 ? 2 : 0 }}
            >
              {othersH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  その他<br />{others}
                </span>
              )}
            </motion.div>
          ) : (
            <div
              className="w-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ height: othersH, backgroundColor: COLORS.others.bg, opacity, minHeight: others > 0 ? 2 : 0 }}
            >
              {othersH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  その他<br />{others}
                </span>
              )}
            </div>
          )}

          {/* のれん */}
          {goodwill > 0 && (
            animate ? (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: gwH }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
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
              </motion.div>
            ) : (
              <div
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
              </div>
            )
          )}
        </Wrapper>

        {/* Liabilities + Equity (right) */}
        <div className="flex flex-col w-16">
          {/* 正の領域 */}
          <Wrapper
            {...containerProps(rightPosH)}
            className="flex flex-col w-full border border-slate-600 rounded-t overflow-hidden bg-slate-800/50"
          >
            {/* 有利子負債 */}
            {animate ? (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: debtH }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ backgroundColor: COLORS.debt.bg, opacity, minHeight: debt > 0 ? 2 : 0 }}
              >
                {debtH > 36 && (
                  <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                    有利子<br />負債<br />{debt}
                  </span>
                )}
              </motion.div>
            ) : (
              <div
                className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ height: debtH, backgroundColor: COLORS.debt.bg, opacity, minHeight: debt > 0 ? 2 : 0 }}
              >
                {debtH > 36 && (
                  <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                    有利子<br />負債<br />{debt}
                  </span>
                )}
              </div>
            )}

            {/* その他負債 */}
            {animate ? (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: otherLiabH }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ backgroundColor: COLORS.otherLiab.bg, opacity, minHeight: otherLiab > 0 ? 2 : 0 }}
              >
                {otherLiabH > 24 && (
                  <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                    その他<br />{otherLiab}
                  </span>
                )}
              </motion.div>
            ) : (
              <div
                className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ height: otherLiabH, backgroundColor: COLORS.otherLiab.bg, opacity, minHeight: otherLiab > 0 ? 2 : 0 }}
              >
                {otherLiabH > 24 && (
                  <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                    その他<br />{otherLiab}
                  </span>
                )}
              </div>
            )}

            {/* 純資産 (正の場合のみ) */}
            {!isNeg && (
              animate ? (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: equityH }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: COLORS.equity.bg, opacity, minHeight: equity > 0 ? 2 : 0 }}
                >
                  {equityH > 24 && (
                    <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                      純資産<br />{equity}
                    </span>
                  )}
                </motion.div>
              ) : (
                <div
                  className="w-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ height: equityH, backgroundColor: COLORS.equity.bg, opacity, minHeight: equity > 0 ? 2 : 0 }}
                >
                  {equityH > 24 && (
                    <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                      純資産<br />{equity}
                    </span>
                  )}
                </div>
              )
            )}
          </Wrapper>

          {/* 債務超過: 0ラインから突き抜ける */}
          {isNeg && (
            <>
              <div className="w-full border-t-2 border-dashed border-white/70" />
              {animate ? (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: negEquityH }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="w-full flex items-center justify-center text-xs font-bold border border-t-0 border-slate-600 rounded-b"
                  style={{
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
                </motion.div>
              ) : (
                <div
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex gap-1 text-[10px] text-slate-400">
        <span className="w-16 text-center">資産</span>
        <span className="w-16 text-center">負債+純資産</span>
      </div>
      {unit && (
        <div className="text-[10px] text-slate-500 mt-1">単位: {unit}</div>
      )}
    </div>
  );
}
