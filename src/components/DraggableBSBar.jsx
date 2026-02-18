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

const SLIDER_HEIGHT = 120;

/**
 * Deal B/S + 予測 B/S を横並び表示し、下に縦型スライダーを配置。
 * 純資産は自動計算 (= 資産合計 - 負債合計)。
 */
export default function DraggableBSBar({
  initialData,
  dealData,
  actualData,
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
    const dealAt = initCash + initGoodwill + initOthers;
    const dealRt = initDebt + initOtherLiab + Math.abs(initialData.equity ?? 0);
    const dealMax = Math.max(dealAt, dealRt, 1);

    // Also consider actual data so sliders always cover the real answer
    let actualMax = 0;
    if (actualData) {
      const actAt = (actualData.assets.cash || 0) + (actualData.assets.goodwill || 0) + (actualData.assets.others || 0);
      const actRt = (actualData.liabilities.debt || 0) + (actualData.liabilities.others || 0) + Math.max(actualData.equity ?? 0, 0);
      const actNeg = actualData.equity < 0 ? Math.abs(actualData.equity) : 0;
      actualMax = Math.max(actAt, actRt, actNeg);
    }

    return Math.max(dealMax, actualMax, 1) * 2;
  }, [initCash, initGoodwill, initOthers, initDebt, initOtherLiab, initialData.equity, actualData]);

  const sliderStep = useMemo(() => {
    return Math.max(0.1, Math.round((sliderMax / 200) * 10) / 10);
  }, [sliderMax]);

  const [cash, setCash] = useState(initCash);
  const [goodwill, setGoodwill] = useState(initGoodwill);
  const [others, setOthers] = useState(initOthers);
  const [debt, setDebt] = useState(initDebt);
  const [otherLiab, setOtherLiab] = useState(initOtherLiab);
  const [activeSlider, setActiveSlider] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const assetTotal = cash + goodwill + others;
  const liabTotal = debt + otherLiab;
  const equity = assetTotal - liabTotal;
  const isNeg = equity < 0;

  // Clear active slider on global pointer up
  useEffect(() => {
    const clear = () => setActiveSlider(null);
    window.addEventListener("pointerup", clear);
    window.addEventListener("pointercancel", clear);
    return () => {
      window.removeEventListener("pointerup", clear);
      window.removeEventListener("pointercancel", clear);
    };
  }, []);

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

  const predictionData = {
    assets: { cash, goodwill, others },
    liabilities: { debt, others: otherLiab },
    equity,
  };

  const bsMax = (d) => {
    const a = (d.assets.cash || 0) + (d.assets.goodwill || 0) + (d.assets.others || 0);
    const rp = (d.liabilities.debt || 0) + (d.liabilities.others || 0) + Math.max(d.equity, 0);
    const neg = d.equity < 0 ? Math.abs(d.equity) : 0;
    return Math.max(a, rp) + neg;
  };
  const pairMaxTotal = Math.max(bsMax(dealData), bsMax(predictionData), 1);

  const SLIDER_ITEMS = [
    { id: "cash", label: "現金", color: COLORS.cash, value: cash, setter: setCash, group: "asset" },
    { id: "others", label: "その他\n資産", color: COLORS.others, value: others, setter: setOthers, group: "asset" },
    { id: "goodwill", label: "のれん", color: COLORS.goodwill, value: goodwill, setter: setGoodwill, group: "asset" },
    { id: "debt", label: "有利子\n負債", color: COLORS.debt, value: debt, setter: setDebt, group: "liab" },
    { id: "otherLiab", label: "その他\n負債", color: COLORS.otherLiab, value: otherLiab, setter: setOtherLiab, group: "liab" },
  ];

  const assetSliders = SLIDER_ITEMS.filter((s) => s.group === "asset");
  const liabSliders = SLIDER_ITEMS.filter((s) => s.group === "liab");

  const yearDiff = year && dealYear ? year - dealYear : null;

  const handleSliderStart = (id) => {
    setActiveSlider(id);
    if (!hasInteracted) setHasInteracted(true);
  };

  const renderSlider = ({ id, label, color, value, setter }) => {
    const isActive = activeSlider === id;
    // value=0 → bottom, value=max → top
    const thumbTop = SLIDER_HEIGHT * (1 - value / sliderMax);

    return (
      <div key={id} className="flex flex-col items-center gap-1" style={{ width: 46 }}>
        {/* Label */}
        <span
          className="text-[9px] text-center leading-tight font-bold whitespace-pre-line h-6 flex items-end justify-center"
          style={{ color, textShadow: isActive ? `0 0 8px ${color}` : "none" }}
        >
          {label}
        </span>
        {/* Vertical slider wrapper */}
        <div className="relative" style={{ width: 46, height: SLIDER_HEIGHT }}>
          <input
            type="range"
            min={0}
            max={sliderMax}
            step={sliderStep}
            value={value}
            onChange={(e) => setter(parseFloat(e.target.value))}
            onPointerDown={() => handleSliderStart(id)}
            className="bs-range bs-range-3d"
            style={{
              position: "absolute",
              width: `${SLIDER_HEIGHT}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              "--thumb-color": color,
              touchAction: "none",
            }}
          />
          {/* SVG arrow indicator at thumb position */}
          {isActive && (
            <div
              className="absolute pointer-events-none select-none"
              style={{
                left: 2,
                top: Math.max(-2, Math.min(SLIDER_HEIGHT - 18, thumbTop - 9)),
                transition: "top 0.05s ease-out",
                zIndex: 20,
              }}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                style={{ filter: `drop-shadow(0 0 6px ${color})` }}
              >
                <polygon points="0,0 16,9 0,18" fill={color} />
              </svg>
            </div>
          )}
        </div>
        {/* Value */}
        <span
          className="text-[10px] tabular-nums font-mono font-bold"
          style={{ color: isActive ? color : "#cbd5e1" }}
        >
          {r(value)}
        </span>
      </div>
    );
  };

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
          <span className="text-lg text-orange-400 font-bold">&rarr;</span>
          {yearDiff && (
            <span className="text-[8px] text-orange-400/70 text-center leading-tight whitespace-nowrap">
              {yearDiff}年後?
            </span>
          )}
        </div>

        {/* Prediction B/S with pulse effect */}
        <div
          className={!hasInteracted ? "prediction-pulse" : ""}
          style={{ transition: "box-shadow 0.5s ease-out" }}
        >
          <BSBar
            data={predictionData}
            barHeight={barHeight}
            maxTotal={pairMaxTotal}
            label="あなたの予測"
            labelClassName={`text-sm font-bold text-yellow-300 tracking-wide ${
              !hasInteracted ? "prediction-label-blink" : ""
            }`}
            year={year}
            unit={unit}
          />
        </div>
      </div>

      {/* Instruction text (fades after interaction) */}
      {!hasInteracted && (
        <div className="text-xs text-yellow-300/70 text-center animate-pulse">
          ↓ スライダーを動かして予測B/Sを作成 ↓
        </div>
      )}

      {/* Vertical sliders */}
      <div className="flex items-start gap-0.5">
        {/* Asset sliders */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] text-slate-500 font-bold mb-1 tracking-wider">
            ━ 資産 ━
          </div>
          <div className="flex gap-0.5">
            {assetSliders.map(renderSlider)}
          </div>
        </div>

        {/* Divider */}
        <div
          className="mx-1 bg-slate-700/60 rounded-full"
          style={{ width: 2, height: SLIDER_HEIGHT + 50, marginTop: 14 }}
        />

        {/* Liability sliders */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] text-slate-500 font-bold mb-1 tracking-wider">
            ━ 負債 ━
          </div>
          <div className="flex gap-0.5">
            {liabSliders.map(renderSlider)}
          </div>
        </div>
      </div>

      {/* Equity (auto-calculated) */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: isNeg ? COLORS.equityNeg : COLORS.equity }}
        />
        <span className="text-[10px] text-slate-300 font-bold">純資産</span>
        <span className="text-[9px] text-slate-600 italic">=自動計算</span>
        <span
          className={`text-sm tabular-nums font-mono font-bold ml-1 ${
            isNeg ? "text-red-400" : "text-yellow-300"
          }`}
        >
          {r(equity)}
        </span>
      </div>
    </div>
  );
}
