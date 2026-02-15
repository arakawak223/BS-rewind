import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bsTotal } from "../data/stages";

const COLORS = {
  cash: "#4ade80",
  goodwill: "#c084fc",
  others: "#60a5fa",
  debt: "#f87171",
  otherLiab: "#fb923c",
  equity: "#facc15",
  equityNeg: "#ef4444",
};

/**
 * Interpolate between two B/S snapshots.
 */
function interpolateBS(before, after, t) {
  const lerp = (a, b) => a + (b - a) * t;
  return {
    assets: {
      cash: lerp(before.assets.cash || 0, after.assets.cash || 0),
      goodwill: lerp(before.assets.goodwill || 0, after.assets.goodwill || 0),
      others: lerp(before.assets.others || 0, after.assets.others || 0),
    },
    liabilities: {
      debt: lerp(before.liabilities.debt || 0, after.liabilities.debt || 0),
      others: lerp(before.liabilities.others || 0, after.liabilities.others || 0),
    },
    equity: lerp(before.equity, after.equity),
  };
}

/**
 * Animated B/S bar with framer-motion dynamic scaling.
 * Container height changes smoothly as total changes.
 * maxTotal: スケーリング基準値 (全フェーズの最大値)
 */
function BSBarAnimated({ data, barHeight, maxTotal, opacity = 1, borderColorHex = "#475569" }) {
  const cash = Math.abs(data.assets.cash || 0);
  const goodwill = Math.abs(data.assets.goodwill || 0);
  const others = Math.abs(data.assets.others || 0);
  const assetTotal = cash + goodwill + others;

  const debt = Math.abs(data.liabilities.debt || 0);
  const otherLiab = Math.abs(data.liabilities.others || 0);
  const equity = data.equity;
  const isNeg = equity < 0;
  const absEquity = Math.abs(equity);

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

  const assetColH = Math.max(assetTotal * scale, 4);
  const rightPosH = Math.max(rightPositive * scale, 4);

  const r = (v) => Math.round(v * 10) / 10;

  return (
    <div className="flex gap-1 items-end">
      {/* Assets */}
      <motion.div
        className="flex flex-col w-20 border rounded overflow-hidden bg-slate-800/30"
        style={{ borderColor: borderColorHex }}
        animate={{ height: assetColH }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
          style={{ backgroundColor: COLORS.cash, opacity, minHeight: cash > 0.1 ? 2 : 0 }}
          animate={{ height: cashH }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {cashH > 24 && (
            <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
              現金<br />{r(cash)}
            </span>
          )}
        </motion.div>
        <motion.div
          className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
          style={{ backgroundColor: COLORS.others, opacity, minHeight: others > 0.1 ? 2 : 0 }}
          animate={{ height: othersH }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {othersH > 24 && (
            <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
              その他<br />{r(others)}
            </span>
          )}
        </motion.div>
        {goodwill > 0.1 && (
          <motion.div
            className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
            style={{
              backgroundColor: COLORS.goodwill, opacity, minHeight: 2,
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)",
            }}
            animate={{ height: gwH }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {gwH > 24 && (
              <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                のれん<br />{r(goodwill)}
              </span>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Right side */}
      <div className="flex flex-col w-20">
        {/* 正の領域 */}
        <motion.div
          className="flex flex-col w-full border rounded-t overflow-hidden bg-slate-800/30"
          style={{ borderColor: borderColorHex }}
          animate={{ height: rightPosH }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
            style={{ backgroundColor: COLORS.debt, opacity, minHeight: debt > 0.1 ? 2 : 0 }}
            animate={{ height: debtH }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {debtH > 36 && (
              <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                有利子<br />負債<br />{r(debt)}
              </span>
            )}
          </motion.div>
          <motion.div
            className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
            style={{ backgroundColor: COLORS.otherLiab, opacity, minHeight: otherLiab > 0.1 ? 2 : 0 }}
            animate={{ height: otherLiabH }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {otherLiabH > 24 && (
              <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                その他<br />{r(otherLiab)}
              </span>
            )}
          </motion.div>
          {!isNeg && (
            <motion.div
              className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
              style={{ backgroundColor: COLORS.equity, opacity, minHeight: equity > 0.1 ? 2 : 0 }}
              animate={{ height: equityH }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {equityH > 24 && (
                <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
                  純資産<br />{r(equity)}
                </span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* 債務超過: 突き抜け */}
        {isNeg && (
          <>
            <div className="w-full border-t-2 border-dashed border-white/70" />
            <motion.div
              className="w-full flex items-center justify-center text-xs font-bold select-none border border-t-0 rounded-b"
              style={{
                borderColor: borderColorHex,
                backgroundColor: COLORS.equityNeg,
                opacity,
                minHeight: 2,
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)",
              }}
              animate={{ height: negEquityH }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {negEquityH > 20 && (
                <span className="text-white drop-shadow-md text-center leading-tight px-1">
                  債務超過<br />{r(absEquity)}
                </span>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RewindAnimation({
  stage,
  postDeal,
  prediction,
  barHeight = 400,
  onComplete,
}) {
  const { before_year, after_year, data } = stage;
  const startBS = postDeal || data.before;
  const actualAfter = data.after_actual;
  const [currentYear, setCurrentYear] = useState(before_year);
  const [currentBS, setCurrentBS] = useState(startBS);
  const [phase, setPhase] = useState("counting");
  const [bgColor, setBgColor] = useState("transparent");

  const totalYears = after_year - before_year;

  // Rewind用スケール: deal, after, prediction の最大値
  const predictionBS = prediction
    ? {
        assets: prediction.assets,
        liabilities: prediction.liabilities,
        equity: prediction.equity,
      }
    : null;

  const dealTotal = bsTotal(startBS);
  const afterTotal = bsTotal(actualAfter);
  const predTotal = predictionBS ? bsTotal(predictionBS) : 0;
  const rewindMax = Math.max(dealTotal, afterTotal, predTotal);

  useEffect(() => {
    if (phase !== "counting") return;

    let year = before_year;
    const interval = setInterval(() => {
      year++;
      const t = (year - before_year) / totalYears;
      setCurrentYear(year);
      setCurrentBS(interpolateBS(startBS, actualAfter, t));

      if (year >= after_year) {
        clearInterval(interval);
        const isFailure = actualAfter.equity < 0;
        setBgColor(isFailure ? "rgba(220, 38, 38, 0.15)" : "rgba(255, 215, 0, 0.1)");
        setPhase("done");
        setTimeout(() => onComplete?.(), 1500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [phase, before_year, after_year, actualAfter, startBS, totalYears, onComplete]);

  return (
    <motion.div
      className="flex flex-col items-center gap-6 p-8 rounded-2xl relative"
      style={{ backgroundColor: bgColor, transition: "background-color 1s ease" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Year counter */}
      <motion.div
        className="text-6xl font-black text-white tabular-nums"
        key={currentYear}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {currentYear}
      </motion.div>

      <div className="text-sm text-slate-400">
        {phase === "counting" && "時を戻しています..."}
        {phase === "done" && (actualAfter.equity < 0 ? "債務超過に転落..." : "投資成功!")}
      </div>

      {/* Overlaid B/S bars */}
      <div className="relative">
        {predictionBS && (
          <div className="absolute inset-0 z-0">
            <div className="flex flex-col items-center">
              <div className="text-xs text-yellow-400/60 mb-1">あなたの予測</div>
              <BSBarAnimated
                data={predictionBS}
                barHeight={barHeight}
                maxTotal={rewindMax}
                opacity={0.3}
                borderColorHex="rgba(250, 204, 21, 0.3)"
              />
            </div>
          </div>
        )}

        <div className="relative z-10">
          <div className="flex flex-col items-center">
            <div className="text-xs text-slate-300 mb-1">実データ</div>
            <BSBarAnimated
              data={currentBS}
              barHeight={barHeight}
              maxTotal={rewindMax}
              opacity={0.85}
            />
          </div>
        </div>
      </div>

      {/* Flash effect */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`absolute inset-0 rounded-2xl border-4 pointer-events-none ${
              actualAfter.equity < 0
                ? "border-red-500/50"
                : "border-yellow-400/50"
            }`}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
