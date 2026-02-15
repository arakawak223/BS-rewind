import { useState, useCallback, useEffect, useMemo } from "react";

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
 * Interactive B/S bar — ネイティブ range スライダー方式。
 *
 * 上: B/Sバー (リアルタイム表示)
 * 下: 各項目の水平スライダー
 * 純資産は自動計算 (= 資産合計 - 負債合計)
 */
export default function DraggableBSBar({
  initialData,
  barHeight = 400,
  onDataChange,
  label = "あなたの予測",
  year,
}) {
  const initCash = initialData.assets.cash || 0;
  const initGoodwill = initialData.assets.goodwill || 0;
  const initOthers = initialData.assets.others || 0;
  const initDebt = initialData.liabilities.debt || 0;
  const initOtherLiab = initialData.liabilities.others || 0;

  const sliderMax = useMemo(() => {
    const at = initCash + initGoodwill + initOthers;
    const rt = initDebt + initOtherLiab + Math.abs(initialData.equity ?? 0);
    return Math.max(at, rt, 1) * 2;
  }, [initCash, initGoodwill, initOthers, initDebt, initOtherLiab, initialData.equity]);

  const sliderStep = useMemo(() => {
    return Math.max(0.1, Math.round((sliderMax / 200) * 10) / 10);
  }, [sliderMax]);

  const [cash, setCash] = useState(initCash);
  const [goodwill, setGoodwill] = useState(initGoodwill);
  const [others, setOthers] = useState(initOthers);
  const [debt, setDebt] = useState(initDebt);
  const [otherLiab, setOtherLiab] = useState(initOtherLiab);

  const assetTotal = cash + goodwill + others;
  const liabTotal = debt + otherLiab;
  const equity = assetTotal - liabTotal;
  const isNeg = equity < 0;
  const absEquity = Math.abs(equity);

  // ---- notify parent ----
  useEffect(() => {
    onDataChange?.({
      assets: { cash, goodwill, others },
      liabilities: { debt, others: otherLiab },
      equity,
      _balanced: true,
    });
  }, [cash, goodwill, others, debt, otherLiab, equity, onDataChange]);

  const r = (v) => Math.round(v * 10) / 10;

  // ---- Visual bar heights ----
  const visualBarHeight = Math.min(barHeight * 0.55, 260);
  const rightPositive = debt + otherLiab + Math.max(equity, 0);
  const maxPositive = Math.max(assetTotal, rightPositive, 1);
  const scale = visualBarHeight / maxPositive;

  const cashH = cash * scale;
  const othersH = others * scale;
  const gwH = goodwill * scale;
  const debtH = debt * scale;
  const otherLiabH = otherLiab * scale;
  const equityH = isNeg ? 0 : equity * scale;
  const negEquityH = isNeg ? absEquity * scale : 0;

  const SLIDER_ITEMS = [
    { key: "cash", label: "現金", color: COLORS.cash, value: cash, setter: setCash, group: "asset" },
    { key: "others", label: "その他資産", color: COLORS.others, value: others, setter: setOthers, group: "asset" },
    { key: "goodwill", label: "のれん", color: COLORS.goodwill, value: goodwill, setter: setGoodwill, group: "asset" },
    { key: "debt", label: "有利子負債", color: COLORS.debt, value: debt, setter: setDebt, group: "liab" },
    { key: "otherLiab", label: "その他負債", color: COLORS.otherLiab, value: otherLiab, setter: setOtherLiab, group: "liab" },
  ];

  const assetSliders = SLIDER_ITEMS.filter((s) => s.group === "asset");
  const liabSliders = SLIDER_ITEMS.filter((s) => s.group === "liab");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-bold text-yellow-300 tracking-wide">
        {label}
      </div>
      {year && (
        <div className="text-lg font-black text-white">{year}年</div>
      )}

      {/* ---- Visual B/S bar (read-only) ---- */}
      <div className="flex gap-1 items-start">
        {/* Assets */}
        <div className="flex flex-col items-center w-20">
          <div
            className="flex flex-col w-full border-2 border-yellow-400/50 rounded-t bg-slate-800/50"
            style={{ height: assetTotal * scale, overflow: "hidden" }}
          >
            <div
              className="w-full flex items-center justify-center text-[10px] font-bold select-none shrink-0"
              style={{ height: cashH, backgroundColor: COLORS.cash }}
            >
              {cashH > 18 && (
                <span className="text-gray-900 text-center leading-tight px-0.5 pointer-events-none">
                  現金
                  <br />
                  {r(cash)}
                </span>
              )}
            </div>
            <div
              className="w-full flex items-center justify-center text-[10px] font-bold select-none shrink-0"
              style={{ height: othersH, backgroundColor: COLORS.others }}
            >
              {othersH > 18 && (
                <span className="text-gray-900 text-center leading-tight px-0.5 pointer-events-none">
                  その他
                  <br />
                  {r(others)}
                </span>
              )}
            </div>
            <div
              className="w-full flex items-center justify-center text-[10px] font-bold select-none shrink-0"
              style={{
                height: gwH,
                backgroundColor: COLORS.goodwill,
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)",
              }}
            >
              {gwH > 18 && (
                <span className="text-gray-900 text-center leading-tight px-0.5 pointer-events-none">
                  のれん
                  <br />
                  {r(goodwill)}
                </span>
              )}
            </div>
          </div>
          <div className="text-[9px] text-slate-400 text-center mt-1">
            資産 {r(assetTotal)}
          </div>
        </div>

        {/* Balance indicator */}
        <div className="flex flex-col items-center justify-center self-center px-1">
          <span className="text-green-400 text-lg font-bold">=</span>
        </div>

        {/* Liabilities + Equity */}
        <div className="flex flex-col items-center w-20">
          <div
            className="flex flex-col w-full border-2 border-yellow-400/50 rounded-t bg-slate-800/50"
            style={{ height: rightPositive * scale, overflow: "visible" }}
          >
            <div
              className="w-full flex items-center justify-center text-[10px] font-bold select-none shrink-0"
              style={{ height: debtH, backgroundColor: COLORS.debt }}
            >
              {debtH > 18 && (
                <span className="text-gray-900 text-center leading-tight px-0.5 pointer-events-none">
                  負債
                  <br />
                  {r(debt)}
                </span>
              )}
            </div>
            <div
              className="w-full flex items-center justify-center text-[10px] font-bold select-none shrink-0"
              style={{ height: otherLiabH, backgroundColor: COLORS.otherLiab }}
            >
              {otherLiabH > 18 && (
                <span className="text-gray-900 text-center leading-tight px-0.5 pointer-events-none">
                  その他
                  <br />
                  {r(otherLiab)}
                </span>
              )}
            </div>
            {!isNeg && (
              <div
                className="w-full flex items-center justify-center text-[10px] font-bold select-none shrink-0"
                style={{ height: equityH, backgroundColor: COLORS.equity }}
              >
                {equityH > 18 && (
                  <span className="text-gray-900 text-center leading-tight px-0.5 pointer-events-none">
                    純資産
                    <br />
                    {r(equity)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 債務超過 */}
          {isNeg && (
            <>
              <div className="w-full border-t-2 border-dashed border-white/70" />
              <div
                className="w-full flex items-center justify-center text-[10px] font-bold select-none border-2 border-t-0 border-yellow-400/50 rounded-b"
                style={{
                  height: negEquityH,
                  backgroundColor: COLORS.equityNeg,
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)",
                }}
              >
                {negEquityH > 14 && (
                  <span className="text-white text-center leading-tight px-0.5 pointer-events-none drop-shadow-md">
                    債務超過
                    <br />
                    {r(equity)}
                  </span>
                )}
              </div>
            </>
          )}
          <div className="text-[9px] text-slate-400 text-center mt-1">
            {isNeg ? (
              <>
                負債 {r(liabTotal)}{" "}
                <span className="text-red-400">純資産 {r(equity)}</span>
              </>
            ) : (
              <>負債+純資産 {r(assetTotal)}</>
            )}
          </div>
        </div>
      </div>

      {/* ---- Range sliders ---- */}
      <div className="w-full max-w-xs mt-2 space-y-1.5">
        {/* Assets section */}
        <div className="text-[10px] text-slate-500 font-bold border-b border-slate-700/50 pb-0.5">
          資産
        </div>
        {assetSliders.map(({ key, label, color, value, setter }) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-slate-300 w-14 shrink-0 leading-tight">
              {label}
            </span>
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={sliderStep}
              value={value}
              onChange={(e) => setter(parseFloat(e.target.value))}
              className="bs-range flex-1"
              style={{ "--thumb-color": color }}
            />
            <span className="text-[10px] text-slate-300 w-10 text-right tabular-nums font-mono">
              {r(value)}
            </span>
          </div>
        ))}

        {/* Liabilities section */}
        <div className="text-[10px] text-slate-500 font-bold border-b border-slate-700/50 pb-0.5 mt-2">
          負債
        </div>
        {liabSliders.map(({ key, label, color, value, setter }) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-slate-300 w-14 shrink-0 leading-tight">
              {label}
            </span>
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={sliderStep}
              value={value}
              onChange={(e) => setter(parseFloat(e.target.value))}
              className="bs-range flex-1"
              style={{ "--thumb-color": color }}
            />
            <span className="text-[10px] text-slate-300 w-10 text-right tabular-nums font-mono">
              {r(value)}
            </span>
          </div>
        ))}

        {/* Equity display (auto-calculated) */}
        <div className="flex items-center gap-2 pt-1.5 border-t border-slate-700/50">
          <div
            className="w-2.5 h-2.5 rounded-sm shrink-0"
            style={{
              backgroundColor: isNeg ? COLORS.equityNeg : COLORS.equity,
            }}
          />
          <span className="text-[10px] text-slate-300 w-14 shrink-0">
            純資産
          </span>
          <span className="flex-1 text-[9px] text-slate-600 italic">
            自動計算
          </span>
          <span
            className={`text-xs w-10 text-right tabular-nums font-mono font-bold ${
              isNeg ? "text-red-400" : "text-yellow-300"
            }`}
          >
            {r(equity)}
          </span>
        </div>
      </div>
    </div>
  );
}
