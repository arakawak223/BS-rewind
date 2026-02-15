import { useState, useRef, useCallback, useEffect } from "react";

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
 * Interactive B/S bar — 6項目構成 / 総額可変 / 債務超過突き抜け表現。
 *
 * 資産側 (top→bottom): 現金 → その他資産 → のれん
 * 右側 (top→bottom): 有利子負債 → その他負債 → 純資産
 *
 * ハンドル:
 *   cash-others      : 現金 ↔ その他資産
 *   others-goodwill  : その他資産 ↔ のれん
 *   debt-otherliab   : 有利子負債 ↔ その他負債
 *   otherliab-equity : その他負債 ↔ 純資産 (純資産マイナス可)
 *   asset-total      : 資産合計を増減 (のれんが伸縮)
 *   right-total      : 右側合計を増減 (有利子負債が伸縮)
 */
export default function DraggableBSBar({
  initialData,
  barHeight = 400,
  onDataChange,
  label = "あなたの予測",
  year,
}) {
  const [values, setValues] = useState(() => ({
    cash: initialData.assets.cash || 0,
    goodwill: initialData.assets.goodwill || 0,
    others: initialData.assets.others || 0,
    debt: initialData.liabilities.debt || 0,
    otherLiab: initialData.liabilities.others || 0,
    equity: initialData.equity ?? 10,
  }));

  const draggingRef = useRef(null);
  const valuesRef = useRef(values);
  valuesRef.current = values;

  // ---- derived ----
  const assetTotal = values.cash + values.goodwill + values.others;
  const isNeg = values.equity < 0;
  const absEquity = Math.abs(values.equity);
  const rightAccounting = values.debt + values.otherLiab + values.equity;
  const isBalanced = Math.abs(assetTotal - rightAccounting) < 0.5;
  const diff = Math.round((assetTotal - rightAccounting) * 10) / 10;

  // ---- notify parent ----
  useEffect(() => {
    onDataChange?.({
      assets: {
        cash: values.cash,
        goodwill: values.goodwill,
        others: values.others,
      },
      liabilities: {
        debt: values.debt,
        others: values.otherLiab,
      },
      equity: values.equity,
      _balanced: isBalanced,
    });
  }, [values, isBalanced, onDataChange]);

  // ---- auto balance ----
  const handleAutoBalance = useCallback(() => {
    setValues((prev) => {
      const at = prev.cash + prev.goodwill + prev.others;
      return { ...prev, equity: at - prev.debt - prev.otherLiab };
    });
  }, []);

  // ---- drag ----
  const getY = useCallback(
    (e) => (e.touches ? e.touches[0].clientY : e.clientY),
    []
  );

  const handleDragStart = useCallback(
    (handleId, e) => {
      e.preventDefault();
      const startY = getY(e);
      const v = valuesRef.current;
      const at = v.cash + v.goodwill + v.others;
      const rp = v.debt + v.otherLiab + Math.max(v.equity, 0);
      const mt = Math.max(at, rp, 1);
      draggingRef.current = { handleId, startY, maxTotal: mt };

      const handleMove = (moveEvent) => {
        if (!draggingRef.current) return;
        const curY = getY(moveEvent);
        const deltaY = curY - draggingRef.current.startY;
        const vd = (deltaY / barHeight) * draggingRef.current.maxTotal;
        const id = draggingRef.current.handleId;

        setValues((prev) => {
          const next = { ...prev };

          if (id === "cash-others") {
            next.cash = prev.cash + vd;
            next.others = prev.others - vd;
          } else if (id === "others-goodwill") {
            next.others = prev.others + vd;
            next.goodwill = prev.goodwill - vd;
          } else if (id === "debt-otherliab") {
            next.debt = prev.debt + vd;
            next.otherLiab = prev.otherLiab - vd;
          } else if (id === "otherliab-equity") {
            next.otherLiab = prev.otherLiab + vd;
            next.equity = prev.equity - vd;
          } else if (id === "asset-total") {
            next.goodwill = prev.goodwill + vd;
          } else if (id === "right-total") {
            next.debt = prev.debt + vd;
          }

          // cash, goodwill, others, debt, otherLiab >= 0
          if (
            next.cash < 0 ||
            next.goodwill < 0 ||
            next.others < 0 ||
            next.debt < 0 ||
            next.otherLiab < 0
          )
            return prev;

          draggingRef.current.startY = curY;
          return next;
        });
      };

      const handleEnd = () => {
        draggingRef.current = null;
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);
      };

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    },
    [barHeight, getY]
  );

  // ---- sub-components ----
  const InternalHandle = ({ handleId }) => (
    <div
      className="w-full h-3 cursor-row-resize flex items-center justify-center z-10 group relative"
      style={{ marginTop: -6, marginBottom: -6 }}
      onMouseDown={(e) => handleDragStart(handleId, e)}
      onTouchStart={(e) => handleDragStart(handleId, e)}
    >
      <div className="w-3/4 h-1 bg-white/60 rounded-full group-hover:bg-white group-hover:h-1.5 group-active:bg-yellow-300 transition-all" />
      <div className="absolute -top-2 -bottom-2 left-0 right-0" />
    </div>
  );

  const BottomHandle = ({ handleId }) => (
    <div
      className="w-full h-4 cursor-row-resize flex items-center justify-center group"
      onMouseDown={(e) => handleDragStart(handleId, e)}
      onTouchStart={(e) => handleDragStart(handleId, e)}
    >
      <div className="w-full h-1.5 bg-orange-400/50 rounded-b group-hover:bg-orange-400 group-active:bg-yellow-300 transition-all flex items-center justify-center">
        <span className="text-[8px] text-orange-200/70 group-hover:text-white pointer-events-none select-none">
          ▲▼
        </span>
      </div>
    </div>
  );

  // ---- pixel heights ----
  const rightPositive = values.debt + values.otherLiab + Math.max(values.equity, 0);
  const maxPositive = Math.max(assetTotal, rightPositive, 1);
  const scale = barHeight / maxPositive;

  const cashH = values.cash * scale;
  const gwH = values.goodwill * scale;
  const othersH = values.others * scale;
  const assetColH = assetTotal * scale;

  const debtH = values.debt * scale;
  const otherLiabH = values.otherLiab * scale;
  const equityH = isNeg ? 0 : values.equity * scale;
  const negEquityH = isNeg ? absEquity * scale : 0;
  const rightPosH = rightPositive * scale;

  const r = (v) => Math.round(v * 10) / 10;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-sm font-bold text-yellow-300 tracking-wide">
        {label}
      </div>
      {year && (
        <div className="text-lg font-black text-white">{year}年</div>
      )}

      {/* ---- columns ---- */}
      <div className="flex gap-1 items-start">
        {/* === Assets === */}
        <div className="flex flex-col items-center w-24">
          <div
            className="flex flex-col w-full border-2 border-yellow-400/50 rounded-t overflow-hidden bg-slate-800/50 relative"
            style={{ height: assetColH }}
          >
            {/* 現金 */}
            <div
              className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
              style={{ height: cashH, backgroundColor: COLORS.cash }}
            >
              {cashH > 26 && (
                <span className="text-gray-900 text-center leading-tight px-1 pointer-events-none">
                  現金<br />{r(values.cash)}
                </span>
              )}
            </div>

            <InternalHandle handleId="cash-others" />

            {/* その他資産 */}
            <div
              className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
              style={{ height: othersH, backgroundColor: COLORS.others }}
            >
              {othersH > 26 && (
                <span className="text-gray-900 text-center leading-tight px-1 pointer-events-none">
                  その他<br />{r(values.others)}
                </span>
              )}
            </div>

            <InternalHandle handleId="others-goodwill" />

            {/* のれん */}
            <div
              className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
              style={{
                height: gwH,
                backgroundColor: COLORS.goodwill,
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 6px)",
              }}
            >
              {gwH > 26 && (
                <span className="text-gray-900 text-center leading-tight px-1 pointer-events-none">
                  のれん<br />{r(values.goodwill)}
                </span>
              )}
            </div>
          </div>
          <BottomHandle handleId="asset-total" />
          <div className="text-[10px] text-slate-400 text-center">
            資産 {r(assetTotal)}
          </div>
        </div>

        {/* === balance indicator === */}
        <div className="flex flex-col items-center justify-center self-center gap-1 px-1 min-w-[36px]">
          {isBalanced ? (
            <span className="text-green-400 text-lg font-bold">=</span>
          ) : (
            <span className="text-red-400 text-lg font-bold">≠</span>
          )}
          {!isBalanced && (
            <span className="text-[9px] text-red-400/80 text-center leading-tight">
              差{diff > 0 ? "+" : ""}
              {diff}
            </span>
          )}
        </div>

        {/* === Liabilities + Equity === */}
        <div className="flex flex-col items-center w-24">
          {/* 正の領域 */}
          <div
            className="flex flex-col w-full border-2 border-yellow-400/50 rounded-t bg-slate-800/50"
            style={{ height: rightPosH, overflow: "visible" }}
          >
            {/* 有利子負債 */}
            <div
              className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
              style={{ height: debtH, backgroundColor: COLORS.debt }}
            >
              {debtH > 38 && (
                <span className="text-gray-900 text-center leading-tight px-1 pointer-events-none">
                  有利子<br />負債<br />{r(values.debt)}
                </span>
              )}
            </div>

            <InternalHandle handleId="debt-otherliab" />

            {/* その他負債 */}
            <div
              className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
              style={{ height: otherLiabH, backgroundColor: COLORS.otherLiab }}
            >
              {otherLiabH > 26 && (
                <span className="text-gray-900 text-center leading-tight px-1 pointer-events-none">
                  その他<br />{r(values.otherLiab)}
                </span>
              )}
            </div>

            {!isNeg && (
              <>
                <InternalHandle handleId="otherliab-equity" />

                {/* 純資産 (正) */}
                <div
                  className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0"
                  style={{ height: equityH, backgroundColor: COLORS.equity }}
                >
                  {equityH > 26 && (
                    <span className="text-gray-900 text-center leading-tight px-1 pointer-events-none">
                      純資産<br />{r(values.equity)}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* 債務超過: 0ラインから下に突き抜け */}
          {isNeg && (
            <>
              <InternalHandle handleId="otherliab-equity" />
              <div className="w-full border-t-2 border-dashed border-white/70" />
              <div
                className="w-full flex items-center justify-center text-xs font-bold select-none border-2 border-t-0 border-yellow-400/50 rounded-b"
                style={{
                  height: negEquityH,
                  backgroundColor: COLORS.equityNeg,
                  backgroundImage:
                    "repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(0,0,0,0.15) 4px, rgba(0,0,0,0.15) 8px)",
                }}
              >
                {negEquityH > 20 && (
                  <span className="text-white text-center leading-tight px-1 pointer-events-none drop-shadow-md">
                    債務超過<br />{r(values.equity)}
                  </span>
                )}
              </div>
            </>
          )}

          <BottomHandle handleId="right-total" />
          <div className="text-[10px] text-slate-400 text-center">
            {isNeg ? (
              <>
                負債 {r(values.debt + values.otherLiab)}
                <br />
                <span className="text-red-400">
                  純資産 {r(values.equity)}
                </span>
              </>
            ) : (
              <>負債+純資産 {r(rightAccounting)}</>
            )}
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="flex flex-col items-center gap-2 mt-1">
        {!isBalanced && (
          <button
            onClick={handleAutoBalance}
            className="px-4 py-1.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer bg-orange-500/20 border-orange-400/50 text-orange-300 hover:bg-orange-500/40"
          >
            自動バランス (純資産で調整)
          </button>
        )}
        {isBalanced && (
          <div className="text-xs text-green-400 font-bold">バランスOK</div>
        )}
      </div>
    </div>
  );
}
