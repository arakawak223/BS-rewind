import { useState, useEffect, useMemo } from "react";
import BSBar from "./BSBar";
import StockPriceTicker from "./StockPriceTicker";

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
 * Deal B/S + 予測 B/S を横並び表示し、下にスライダーを配置。
 * 純資産は自動計算 (= 資産合計 - 負債合計)。
 */
export default function DraggableBSBar({
  initialData,
  dealData,
  barHeight = 400,
  onDataChange,
  year,
  dealYear,
  unit,
  stockPrice,
  companyName,
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

  // Notify parent
  useEffect(() => {
    onDataChange?.({
      assets: { cash, goodwill, others },
      liabilities: { debt, others: otherLiab },
      equity,
      _balanced: true,
    });
  }, [cash, goodwill, others, debt, otherLiab, equity, onDataChange]);

  const r = (v) => Math.round(v);

  // Prediction data object for BSBar
  const predictionData = {
    assets: { cash, goodwill, others },
    liabilities: { debt, others: otherLiab },
    equity,
  };

  // Pair maxTotal for consistent Deal/Prediction scaling
  const bsMax = (d) => {
    const a = (d.assets.cash || 0) + (d.assets.goodwill || 0) + (d.assets.others || 0);
    const rp = (d.liabilities.debt || 0) + (d.liabilities.others || 0) + Math.max(d.equity, 0);
    return Math.max(a, rp);
  };
  const pairMaxTotal = Math.max(bsMax(dealData), bsMax(predictionData), 1);

  const SLIDER_ITEMS = [
    { key: "cash", label: "現金", color: COLORS.cash, value: cash, setter: setCash, group: "asset" },
    { key: "others", label: "その他資産", color: COLORS.others, value: others, setter: setOthers, group: "asset" },
    { key: "goodwill", label: "のれん", color: COLORS.goodwill, value: goodwill, setter: setGoodwill, group: "asset" },
    { key: "debt", label: "有利子負債", color: COLORS.debt, value: debt, setter: setDebt, group: "liab" },
    { key: "otherLiab", label: "その他負債", color: COLORS.otherLiab, value: otherLiab, setter: setOtherLiab, group: "liab" },
  ];

  const assetSliders = SLIDER_ITEMS.filter((s) => s.group === "asset");
  const liabSliders = SLIDER_ITEMS.filter((s) => s.group === "liab");

  const yearDiff = year && dealYear ? year - dealYear : null;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Side-by-side Deal + Prediction bars */}
      <div className="flex items-end gap-0.5">
        <div className="flex flex-col items-center">
          {stockPrice && (
            <div className="mb-2">
              <StockPriceTicker
                price={stockPrice.deal}
                previousPrice={stockPrice.before}
                unit={stockPrice.unit}
                label={`${companyName} 株価`}
                animate={false}
              />
            </div>
          )}
          <BSBar
            data={dealData}
            barHeight={barHeight}
            maxTotal={pairMaxTotal}
            label="Decision実行直後"
            year={dealYear}
            unit={unit}
          />
        </div>

        {/* Arrow between bars */}
        <div className="flex flex-col items-center justify-center px-0.5 pb-8">
          <span className="text-lg text-orange-400 font-bold">→</span>
          {yearDiff && (
            <span className="text-[8px] text-orange-400/70 text-center leading-tight whitespace-nowrap">
              {yearDiff}年後?
            </span>
          )}
        </div>

        <BSBar
          data={predictionData}
          barHeight={barHeight}
          maxTotal={pairMaxTotal}
          label="あなたの予測"
          labelClassName="text-sm font-bold text-yellow-300 tracking-wide"
          year={year}
          unit={unit}
        />
      </div>

      {/* Range sliders */}
      <div className="w-full max-w-xs mt-1 space-y-3.5">
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
              style={{ "--thumb-color": color, touchAction: "none" }}
            />
            <span className="text-[10px] text-slate-300 w-10 text-right tabular-nums font-mono">
              {r(value)}
            </span>
          </div>
        ))}

        {/* Liabilities section */}
        <div className="text-[10px] text-slate-500 font-bold border-b border-slate-700/50 pb-0.5 mt-3">
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
              style={{ "--thumb-color": color, touchAction: "none" }}
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
