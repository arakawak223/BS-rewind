import { useState } from "react";
import { motion } from "framer-motion";
import { formatOku } from "../data/stages";

const SERIES = [
  { key: "cash", label: "現金", color: "#4ade80", get: (d) => d.assets.cash || 0 },
  { key: "others", label: "その他資産", color: "#60a5fa", get: (d) => d.assets.others || 0 },
  { key: "goodwill", label: "のれん", color: "#c084fc", get: (d) => d.assets.goodwill || 0 },
  { key: "debt", label: "有利子負債", color: "#f87171", get: (d) => d.liabilities.debt || 0 },
  { key: "otherLiab", label: "その他負債", color: "#fb923c", get: (d) => d.liabilities.others || 0 },
  { key: "equity", label: "純資産", color: "#facc15", get: (d) => d.equity },
];

const INSOLVENCY_COLOR = "#ef4444";

/**
 * SVG-based B/S comparison chart: Deal (left) vs Actual (right) with dotted connectors.
 */
function BSComparisonChart({ dealData, actualData }) {
  const W = 480;
  const H = 300;
  const BAR_W = 50;
  const GAP = 16;
  const PAD = { top: 30, bottom: 30, left: 40, right: 40 };

  const assetSeries = [
    { key: "cash", label: "現金", color: "#4ade80", get: (d) => d.assets.cash || 0 },
    { key: "others", label: "その他", color: "#60a5fa", get: (d) => d.assets.others || 0 },
    { key: "goodwill", label: "のれん", color: "#c084fc", get: (d) => d.assets.goodwill || 0 },
  ];
  const liabSeries = [
    { key: "debt", label: "有利子負債", color: "#f87171", get: (d) => d.liabilities.debt || 0 },
    { key: "otherLiab", label: "その他負債", color: "#fb923c", get: (d) => d.liabilities.others || 0 },
    { key: "equity", label: "純資産", color: "#facc15", get: (d) => d.equity },
  ];

  const totalAssets = (d) => assetSeries.reduce((s, sr) => s + Math.abs(sr.get(d)), 0);
  const totalLE = (d) => liabSeries.reduce((s, sr) => s + Math.abs(sr.get(d)), 0);
  const maxVal = Math.max(totalAssets(dealData), totalLE(dealData), totalAssets(actualData), totalLE(actualData), 1);

  const plotH = H - PAD.top - PAD.bottom;
  const scale = plotH / maxVal;

  // Group positions: Deal left, Actual right
  const dealAssetsX = PAD.left;
  const dealLEX = dealAssetsX + BAR_W + GAP;
  const actualAssetsX = W - PAD.right - BAR_W * 2 - GAP;
  const actualLEX = W - PAD.right - BAR_W;

  function buildStack(data, series) {
    const segments = [];
    let cumY = 0;
    for (const sr of series) {
      const val = sr.get(data);
      const h = Math.abs(val) * scale;
      segments.push({ ...sr, val, h, y: cumY, isNeg: val < 0 });
      cumY += h;
    }
    return segments;
  }

  const dealAssetStack = buildStack(dealData, assetSeries);
  const dealLEStack = buildStack(dealData, liabSeries);
  const actualAssetStack = buildStack(actualData, assetSeries);
  const actualLEStack = buildStack(actualData, liabSeries);

  const baseY = H - PAD.bottom;

  function renderBar(stack, x) {
    return stack.map((seg) => (
      <rect
        key={seg.key}
        x={x}
        y={baseY - seg.y - seg.h}
        width={BAR_W}
        height={Math.max(seg.h, 1)}
        fill={seg.isNeg ? INSOLVENCY_COLOR : seg.color}
        opacity={seg.isNeg ? 0.7 : 1}
        rx={2}
      />
    ));
  }

  // Dotted connectors between Deal L+E and Actual Assets (boundary points)
  function buildConnectors(leftStack, rightStack, leftX, rightX) {
    const lines = [];
    // Connect top of each segment
    let cumLeft = 0;
    let cumRight = 0;
    const len = Math.min(leftStack.length, rightStack.length);
    // Bottom connector
    lines.push({ y1: baseY, y2: baseY, key: "bottom" });
    for (let i = 0; i < len; i++) {
      cumLeft += leftStack[i].h;
      cumRight += rightStack[i].h;
      lines.push({
        y1: baseY - cumLeft,
        y2: baseY - cumRight,
        key: `seg-${i}`,
      });
    }
    return lines.map((l) => (
      <line
        key={l.key}
        x1={leftX + BAR_W}
        y1={l.y1}
        x2={rightX}
        y2={l.y2}
        stroke="#94a3b8"
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.5}
      />
    ));
  }

  // Connect Deal Assets ↔ Actual Assets and Deal L+E ↔ Actual L+E
  const assetConnectors = buildConnectors(dealAssetStack, actualAssetStack, dealAssetsX, actualAssetsX);
  const leConnectors = buildConnectors(dealLEStack, actualLEStack, dealLEX, actualLEX);

  // Labels
  function renderValues(stack, x) {
    return stack.map((seg) => {
      if (seg.h < 8) return null;
      return (
        <text
          key={`v-${seg.key}`}
          x={x + BAR_W / 2}
          y={baseY - seg.y - seg.h / 2 + 3}
          textAnchor="middle"
          fill="white"
          fontSize={9}
          fontWeight="bold"
        >
          {Math.round(seg.val * 10) / 10}
        </text>
      );
    });
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[480px] mx-auto" style={{ minWidth: 320 }}>
        {/* Labels */}
        <text x={dealAssetsX + BAR_W + GAP / 2} y={16} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold">Deal直後</text>
        <text x={actualAssetsX + BAR_W + GAP / 2} y={16} textAnchor="middle" fill="#94a3b8" fontSize={11} fontWeight="bold">実データ</text>

        {/* Column sub-labels */}
        <text x={dealAssetsX + BAR_W / 2} y={H - 10} textAnchor="middle" fill="#64748b" fontSize={8}>資産</text>
        <text x={dealLEX + BAR_W / 2} y={H - 10} textAnchor="middle" fill="#64748b" fontSize={8}>負債+純資産</text>
        <text x={actualAssetsX + BAR_W / 2} y={H - 10} textAnchor="middle" fill="#64748b" fontSize={8}>資産</text>
        <text x={actualLEX + BAR_W / 2} y={H - 10} textAnchor="middle" fill="#64748b" fontSize={8}>負債+純資産</text>

        {/* Bars */}
        {renderBar(dealAssetStack, dealAssetsX)}
        {renderBar(dealLEStack, dealLEX)}
        {renderBar(actualAssetStack, actualAssetsX)}
        {renderBar(actualLEStack, actualLEX)}

        {/* Values */}
        {renderValues(dealAssetStack, dealAssetsX)}
        {renderValues(dealLEStack, dealLEX)}
        {renderValues(actualAssetStack, actualAssetsX)}
        {renderValues(actualLEStack, actualLEX)}

        {/* Connectors */}
        {assetConnectors}
        {leConnectors}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
        {[...assetSeries, ...liabSeries].map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <div className="w-3 h-2 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-[10px] text-slate-400">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Non-linear interpolation for stock price (same as RewindAnimation).
 */
function interpolateStockPrice(deal, after, t, curve) {
  if (curve === "crash_early") {
    const ct = 1 - Math.pow(1 - t, 3);
    return deal + (after - deal) * ct;
  }
  if (curve === "surge_early") {
    const ct = 1 - Math.pow(1 - t, 3.5);
    return deal + (after - deal) * ct;
  }
  return deal + (after - deal) * t;
}

/**
 * Build year-by-year history by interpolating postDeal → afterActual.
 */
function buildHistory(postDeal, afterActual, beforeYear, afterYear, stockPrice) {
  const totalYears = afterYear - beforeYear;
  const lerp = (a, b, t) => a + (b - a) * t;
  const history = [];

  for (let year = beforeYear; year <= afterYear; year++) {
    const t = (year - beforeYear) / totalYears;
    const point = {};
    point.year = year;
    for (const s of SERIES) {
      point[s.key] = lerp(s.get(postDeal), s.get(afterActual), t);
    }
    if (stockPrice) {
      point.stockPrice = Math.round(interpolateStockPrice(stockPrice.deal, stockPrice.after, t, stockPrice.curve));
    }
    history.push(point);
  }
  return history;
}

const STOCK_COLOR = "#e879f9";

/**
 * SVG line chart showing B/S item changes over time.
 * Dual-axis: left axis for B/S items, right axis for stock price.
 */
function TimeSeriesChart({ history, stockPriceUnit }) {
  const hasStock = history[0]?.stockPrice != null;
  const W = 480;
  const H = 240;
  const PAD = { top: 16, right: hasStock ? 44 : 16, bottom: 32, left: 44 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // Left Y range (B/S items)
  let yMin = Infinity;
  let yMax = -Infinity;
  for (const p of history) {
    for (const s of SERIES) {
      const v = p[s.key];
      if (v < yMin) yMin = v;
      if (v > yMax) yMax = v;
    }
  }
  const yRange = yMax - yMin || 1;
  yMin -= yRange * 0.08;
  yMax += yRange * 0.08;

  // Right Y range (stock price)
  let spMin = Infinity;
  let spMax = -Infinity;
  if (hasStock) {
    for (const p of history) {
      if (p.stockPrice < spMin) spMin = p.stockPrice;
      if (p.stockPrice > spMax) spMax = p.stockPrice;
    }
    const spRange = spMax - spMin || 1;
    spMin -= spRange * 0.08;
    spMax += spRange * 0.08;
  }

  const xMin = history[0].year;
  const xMax = history[history.length - 1].year;
  const xRange = xMax - xMin || 1;

  const toX = (year) => PAD.left + ((year - xMin) / xRange) * plotW;
  const toY = (val) => PAD.top + ((yMax - val) / (yMax - yMin)) * plotH;
  const toYStock = (val) => PAD.top + ((spMax - val) / (spMax - spMin)) * plotH;

  // Left grid lines
  const yTicks = [];
  const yStep = Math.ceil((yMax - yMin) / 5);
  const yStart = Math.floor(yMin / yStep) * yStep;
  for (let v = yStart; v <= yMax; v += yStep) {
    if (v >= yMin) yTicks.push(v);
  }

  // Right grid ticks (stock price)
  const spTicks = [];
  if (hasStock) {
    const spStep = Math.ceil((spMax - spMin) / 5);
    const spStart = Math.floor(spMin / spStep) * spStep;
    for (let v = spStart; v <= spMax; v += spStep) {
      if (v >= spMin) spTicks.push(v);
    }
  }

  // X ticks
  const xStep = xRange > 15 ? 3 : xRange > 8 ? 2 : 1;
  const xTicks = [];
  for (let y = xMin; y <= xMax; y += xStep) {
    xTicks.push(y);
  }
  if (xTicks[xTicks.length - 1] !== xMax) xTicks.push(xMax);

  // Stock price line points
  const stockPoints = hasStock
    ? history.map((p) => `${toX(p.year)},${toYStock(p.stockPrice)}`).join(" ")
    : "";

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[480px] mx-auto"
        style={{ minWidth: 320 }}
      >
        {/* Left grid */}
        {yTicks.map((v) => (
          <g key={`yg-${v}`}>
            <line
              x1={PAD.left}
              y1={toY(v)}
              x2={W - PAD.right}
              y2={toY(v)}
              stroke="#334155"
              strokeWidth={v === 0 ? 1.5 : 0.5}
              strokeDasharray={v === 0 ? undefined : "4 4"}
            />
            <text
              x={PAD.left - 6}
              y={toY(v) + 3}
              textAnchor="end"
              fill="#94a3b8"
              fontSize={9}
            >
              {Math.round(v)}
            </text>
          </g>
        ))}

        {/* Right axis ticks (stock price) */}
        {spTicks.map((v) => (
          <text
            key={`sp-${v}`}
            x={W - PAD.right + 6}
            y={toYStock(v) + 3}
            textAnchor="start"
            fill={STOCK_COLOR}
            fontSize={9}
            opacity={0.7}
          >
            {Math.round(v)}
          </text>
        ))}

        {/* Right axis line */}
        {hasStock && (
          <line
            x1={W - PAD.right}
            y1={PAD.top}
            x2={W - PAD.right}
            y2={H - PAD.bottom}
            stroke={STOCK_COLOR}
            strokeWidth={0.5}
            opacity={0.3}
          />
        )}

        {/* X axis labels */}
        {xTicks.map((y) => (
          <text
            key={`xt-${y}`}
            x={toX(y)}
            y={H - 6}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize={9}
          >
            {y}
          </text>
        ))}

        {/* B/S Lines */}
        {SERIES.map((s) => {
          const points = history
            .map((p) => `${toX(p.year)},${toY(p[s.key])}`)
            .join(" ");
          return (
            <polyline
              key={s.key}
              points={points}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          );
        })}

        {/* Stock price line (dashed, thicker) */}
        {hasStock && (
          <polyline
            points={stockPoints}
            fill="none"
            stroke={STOCK_COLOR}
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeDasharray="6 3"
          />
        )}

        {/* End dots (B/S) */}
        {SERIES.map((s) => {
          const last = history[history.length - 1];
          return (
            <circle
              key={`dot-${s.key}`}
              cx={toX(last.year)}
              cy={toY(last[s.key])}
              r={3}
              fill={s.color}
            />
          );
        })}

        {/* End dot (stock price) */}
        {hasStock && (
          <circle
            cx={toX(history[history.length - 1].year)}
            cy={toYStock(history[history.length - 1].stockPrice)}
            r={4}
            fill={STOCK_COLOR}
          />
        )}

        {/* Zero line label */}
        {yMin < 0 && (
          <text
            x={PAD.left + 4}
            y={toY(0) - 4}
            fill="#64748b"
            fontSize={8}
          >
            0
          </text>
        )}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <div
              className="w-3 h-1 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-[10px] text-slate-400">{s.label}</span>
          </div>
        ))}
        {hasStock && (
          <div className="flex items-center gap-1">
            <div
              className="w-4 h-0 border-t-2 border-dashed"
              style={{ borderColor: STOCK_COLOR }}
            />
            <span className="text-[10px]" style={{ color: STOCK_COLOR }}>
              株価({stockPriceUnit})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Calculate sync rate between prediction and actual B/S data.
 */
function calcSyncRate(prediction, actual, stage) {
  const predSegments = [
    Math.abs(prediction.assets.cash || 0),
    Math.abs(prediction.assets.goodwill || 0),
    Math.abs(prediction.assets.others || 0),
    Math.abs(prediction.liabilities.debt || 0),
    Math.abs(prediction.liabilities.others || 0),
    prediction.equity,
  ];

  const actSegments = [
    Math.abs(actual.assets.cash || 0),
    Math.abs(actual.assets.goodwill || 0),
    Math.abs(actual.assets.others || 0),
    Math.abs(actual.liabilities.debt || 0),
    Math.abs(actual.liabilities.others || 0),
    actual.equity,
  ];

  let overlapSum = 0;
  let maxSum = 0;

  for (let i = 0; i < predSegments.length - 1; i++) {
    overlapSum += Math.min(predSegments[i], actSegments[i]);
    maxSum += Math.max(predSegments[i], actSegments[i]);
  }

  const predEquity = predSegments[5];
  const actEquity = actSegments[5];
  const sameDirection =
    (predEquity >= 0 && actEquity >= 0) ||
    (predEquity < 0 && actEquity < 0);

  const equityP = Math.abs(predEquity);
  const equityA = Math.abs(actEquity);
  if (sameDirection) {
    overlapSum += Math.min(equityP, equityA);
    maxSum += Math.max(equityP, equityA);
  } else {
    maxSum += equityP + equityA;
  }

  if (maxSum === 0) return 100;
  let rate = Math.round((overlapSum / maxSum) * 100);

  // GC penalty: if stage has going_concern and player predicted positive equity but actual is negative
  const hasGC = stage?.data?.news?.some((n) => n.subtype === "going_concern");
  if (hasGC && prediction.equity > 0 && actual.equity < 0) {
    rate = Math.round(rate * 0.7);
  }

  return rate;
}

function getRank(rate) {
  if (rate >= 90) return { label: "S", color: "text-yellow-300", desc: "天才アナリスト!" };
  if (rate >= 75) return { label: "A", color: "text-green-400", desc: "鋭い読み!" };
  if (rate >= 60) return { label: "B", color: "text-blue-400", desc: "なかなかの分析力" };
  if (rate >= 40) return { label: "C", color: "text-slate-300", desc: "まだまだこれから" };
  return { label: "D", color: "text-red-400", desc: "歴史は予想外の展開に..." };
}

/**
 * Calculate management eye score (経営眼スコア).
 * ①純資産予測精度(30%) + ②シンクロ率(30%) + ③方向性(20%) + ④減損予測精度(20%)
 */
function calcManagementEyeScore(prediction, actual, stage, syncRate) {
  // 1. Equity prediction accuracy (30%)
  const predEquity = prediction.equity;
  const actEquity = actual.equity;
  const equityDiff = Math.abs(predEquity - actEquity);
  const equityRef = Math.max(Math.abs(actEquity), 1);
  const equityRatio = equityDiff / equityRef;
  const equityAccuracy = equityRatio < 0.15 ? 100 : equityRatio < 0.3 ? 80 : equityRatio < 0.5 ? 60 : equityRatio < 1.0 ? 30 : 10;
  const equityComponent = equityAccuracy * 0.3;

  // 2. Sync rate component (30%)
  const syncComponent = syncRate * 0.3;

  // 3. Direction component (20%): equity sign match
  const sameSign =
    (predEquity >= 0 && actEquity >= 0) || (predEquity < 0 && actEquity < 0);
  const directionScore = sameSign ? 100 : 20;
  const directionComponent = directionScore * 0.2;

  // 4. Impairment prediction accuracy (20%)
  const totalImpairment = stage.data?.summary?.totalImpairment || 0;
  if (totalImpairment === 0) {
    const dealGW = stage.data?.deal?.assets?.goodwill || 0;
    const dealOthers = stage.data?.deal?.assets?.others || 0;
    const predGWLoss = Math.max(0, dealGW - (prediction.assets.goodwill || 0));
    const predOthersLoss = Math.max(0, dealOthers - (prediction.assets.others || 0));
    const predTotalLoss = predGWLoss + predOthersLoss;
    const maxRef = Math.max(dealGW + dealOthers, 1);
    const lossRatio = predTotalLoss / maxRef;
    const impairmentAccuracy = lossRatio < 0.1 ? 100 : lossRatio < 0.3 ? 70 : 40;
    return Math.round(equityComponent + syncComponent + directionComponent + impairmentAccuracy * 0.2);
  }

  const dealGW = stage.data?.deal?.assets?.goodwill || 0;
  const dealOthers = stage.data?.deal?.assets?.others || 0;
  const predGWLoss = Math.max(0, dealGW - (prediction.assets.goodwill || 0));
  const predOthersLoss = Math.max(0, dealOthers - (prediction.assets.others || 0));
  const predImpairment = predGWLoss + predOthersLoss;

  const diff = Math.abs(predImpairment - totalImpairment);
  const ref = Math.max(totalImpairment, 1);
  const ratio = diff / ref;
  const impairmentAccuracy = ratio < 0.2 ? 100 : ratio < 0.5 ? 70 : ratio < 1.0 ? 40 : 20;

  return Math.round(equityComponent + syncComponent + directionComponent + impairmentAccuracy * 0.2);
}

function getManagementEyeRank(score) {
  if (score >= 90) return { label: "S", color: "text-yellow-300", desc: "卓越した経営眼!" };
  if (score >= 75) return { label: "A", color: "text-green-400", desc: "優れた分析力!" };
  if (score >= 50) return { label: "B", color: "text-blue-400", desc: "基礎は押さえている" };
  if (score >= 30) return { label: "C", color: "text-slate-300", desc: "まだまだこれから" };
  return { label: "D", color: "text-red-400", desc: "まだ伸びしろあり" };
}

/**
 * Reusable stamp component.
 */
function StampMark({ text, delay = 1.2, rotate = -12, top = "8%", scale: initScale = 4 }) {
  return (
    <motion.div
      initial={{ scale: initScale, opacity: 0, rotate: rotate - 3 }}
      animate={{ scale: 1, opacity: 1, rotate }}
      transition={{ delay, duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
      className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      style={{ top }}
    >
      <div
        className="border-[3px] border-red-500 px-5 py-2.5 font-black text-lg whitespace-nowrap tracking-wider"
        style={{
          color: "#ef4444",
          textShadow: "0 0 12px rgba(239,68,68,0.6)",
          boxShadow: "0 0 20px rgba(239,68,68,0.3), inset 0 0 20px rgba(239,68,68,0.1)",
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

/**
 * Scanline noise overlay + stamp(s).
 */
function NoiseStampOverlay({ stamps }) {
  return (
    <>
      {/* Scanline noise — fades out after 3s */}
      <motion.div
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.5, delay: 1.5 }}
        className="absolute inset-0 pointer-events-none z-10 rounded-xl overflow-hidden"
      >
        <motion.div
          animate={{ opacity: [0.06, 0.18, 0.06] }}
          transition={{ duration: 0.12, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,100,0.07) 2px, rgba(0,255,100,0.07) 4px)",
          }}
        />
      </motion.div>

      {/* Color glitch flash */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none z-10 rounded-xl"
        style={{ background: "linear-gradient(180deg, rgba(239,68,68,0.08) 0%, transparent 50%, rgba(239,68,68,0.05) 100%)" }}
      />

      {stamps.map((s, i) => (
        <StampMark key={i} {...s} />
      ))}
    </>
  );
}

export default function ResultSummary({ prediction, actual, stage, postDeal, onRetry, onSelectStage }) {
  const [showChart, setShowChart] = useState(false);
  const isOlympusPart1 = stage.stage_id === "olympus_part1";
  const isJalPart1 = stage.stage_id === "jal_part1";
  const syncRate = calcSyncRate(prediction, actual, stage);
  const rank = getRank(syncRate);
  const isFailure = actual.equity < 0;

  const r = (v) => Math.round((v || 0) * 10) / 10;

  const yearDiff = stage.after_year - stage.before_year;

  const details = [
    { label: "現金", deal: r(postDeal.assets.cash), pred: r(prediction.assets.cash), act: r(actual.assets.cash) },
    { label: "その他資産", deal: r(postDeal.assets.others), pred: r(prediction.assets.others), act: r(actual.assets.others) },
    { label: "のれん", deal: r(postDeal.assets.goodwill), pred: r(prediction.assets.goodwill), act: r(actual.assets.goodwill) },
    { label: "有利子負債", deal: r(postDeal.liabilities.debt), pred: r(prediction.liabilities.debt), act: r(actual.liabilities.debt) },
    { label: "その他負債", deal: r(postDeal.liabilities.others), pred: r(prediction.liabilities.others), act: r(actual.liabilities.others) },
    { label: "純資産", deal: r(postDeal.equity), pred: r(prediction.equity), act: r(actual.equity) },
  ];

  const history = postDeal
    ? buildHistory(postDeal, actual, stage.before_year, stage.after_year, stage.data.stockPrice)
    : null;

  const totalImpairment = stage.data.summary?.totalImpairment || 0;
  const hasGC = stage.data.news?.some((n) => n.subtype === "going_concern");
  const managementEyeScore = calcManagementEyeScore(prediction, actual, stage, syncRate);
  const managementEyeRank = getManagementEyeRank(managementEyeScore);

  // Delay offset for impairment card
  const impairmentDelay = totalImpairment > 0 ? 0.3 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-6 max-w-lg mx-auto relative"
    >
      {/* Olympus Part1: noise + stamp overlay */}
      {isOlympusPart1 && (
        <NoiseStampOverlay stamps={[{ text: "特設注意市場銘柄", top: "8%" }]} />
      )}

      {/* JAL Part1: GC + delisting stamps */}
      {isJalPart1 && (
        <NoiseStampOverlay
          stamps={[
            { text: "Going Concern注記", top: "6%", delay: 1.0, rotate: -8 },
            { text: "上場廃止", top: "18%", delay: 1.5, rotate: 10 },
          ]}
        />
      )}

      {/* === Primary: Management Eye Score === */}
      <div className="text-center">
        <div className="text-sm text-slate-400 mb-2">経営眼スコア</div>
        <motion.div
          className="text-7xl font-black tabular-nums"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            color: managementEyeScore >= 75 ? "#4ade80" : managementEyeScore >= 50 ? "#facc15" : "#f87171",
            textShadow: `0 0 24px ${managementEyeScore >= 75 ? "rgba(74,222,128,0.5)" : managementEyeScore >= 50 ? "rgba(250,204,21,0.5)" : "rgba(248,113,113,0.5)"}`,
          }}
        >
          {managementEyeScore}
          <span className="text-3xl text-slate-400">/100</span>
        </motion.div>
      </div>

      {/* Management Eye Rank (hero) */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.6 }}
        className="text-center"
      >
        <div
          className={`text-8xl font-black ${managementEyeRank.color}`}
          style={{ textShadow: "0 0 30px currentColor" }}
        >
          {managementEyeRank.label}
        </div>
        <div className="text-lg text-slate-300 mt-2">{managementEyeRank.desc}</div>
      </motion.div>

      {/* === Secondary: Sync Rate (compact card) === */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="w-full bg-slate-800/80 rounded-xl p-4 border border-slate-600"
      >
        <div className="text-[11px] text-slate-500 mb-1.5">参考指標</div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">シンクロ率</div>
          <span
            className="text-3xl font-black tabular-nums"
            style={{ color: syncRate >= 60 ? "#4ade80" : "#f87171" }}
          >
            {syncRate}<span className="text-lg">%</span>
          </span>
        </div>
      </motion.div>

      {/* Scoring Formula Explainer (collapsible) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
        className="w-full"
      >
        <details className="group bg-slate-800/60 rounded-xl border border-slate-700/50">
          <summary className="px-4 py-2.5 cursor-pointer text-[11px] text-slate-400 hover:text-slate-300 transition-colors select-none flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="transition-transform group-open:rotate-90 shrink-0">
              <polygon points="2,0 10,5 2,10" />
            </svg>
            スコア計算式
          </summary>
          <div className="px-4 pb-3 pt-1 text-[10px] leading-relaxed text-slate-400 space-y-3 border-t border-slate-700/40">
            {/* Sync Rate */}
            <div>
              <div className="text-slate-300 font-bold mb-0.5">シンクロ率（参考指標）</div>
              <div className="bg-slate-900/50 rounded px-2 py-1.5 font-mono text-[9px] space-y-0.5">
                <div>各科目(現金,その他資産,のれん,有利子負債,その他負債,純資産)について:</div>
                <div className="pl-2 text-yellow-300/80">overlap += min(予測値, 実績値)</div>
                <div className="pl-2 text-yellow-300/80">max &nbsp;&nbsp;&nbsp;+= max(予測値, 実績値)</div>
                <div className="mt-1 text-green-300/80 font-bold">シンクロ率 = (overlap / max) × 100%</div>
                <div className="mt-0.5 text-red-300/70">※ GC該当 + 純資産の符号を外した場合 → ×0.7 ペナルティ</div>
              </div>
            </div>

            {/* Management Eye Score */}
            <div>
              <div className="text-slate-300 font-bold mb-0.5">経営眼スコア (0〜100)</div>
              <div className="bg-slate-900/50 rounded px-2 py-1.5 font-mono text-[9px] space-y-1">
                <div className="text-cyan-300/80">① 純資産予測精度 × <span className="text-white font-bold">30%</span></div>
                <div className="pl-3 text-slate-500">
                  誤差率&lt;15%→100 / &lt;30%→80 / &lt;50%→60 / &lt;100%→30 / else→10
                </div>
                <div className="text-cyan-300/80">② シンクロ率 × <span className="text-white font-bold">30%</span></div>
                <div className="text-cyan-300/80">③ 方向性スコア × <span className="text-white font-bold">20%</span></div>
                <div className="pl-3 text-slate-500">純資産の符号が一致 → 100点 / 不一致 → 20点</div>
                <div className="text-cyan-300/80">④ 減損予測精度 × <span className="text-white font-bold">20%</span></div>
                <div className="pl-3 text-slate-500">
                  予測減損 ≒ 実績: 誤差率&lt;20%→100 / &lt;50%→70 / &lt;100%→40 / else→20
                </div>
                <div className="mt-1 text-green-300/80 font-bold">経営眼 = ① + ② + ③ + ④</div>
              </div>
            </div>

            {/* Management Eye Rank */}
            <div>
              <div className="text-slate-300 font-bold mb-0.5">経営眼 SABCD評価</div>
              <div className="flex gap-3 text-[9px]">
                <span className="text-yellow-300">S: ≥90</span>
                <span className="text-green-400">A: ≥75</span>
                <span className="text-blue-400">B: ≥50</span>
                <span className="text-slate-300">C: ≥30</span>
                <span className="text-red-400">D: &lt;30</span>
              </div>
            </div>
          </div>
        </details>
      </motion.div>

      {/* Stock Price Change */}
      {stage.data.stockPrice && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full bg-slate-800/80 rounded-xl p-4 border border-slate-600"
        >
          <div className="text-sm font-bold text-slate-300 mb-2">株価変化</div>
          {(() => {
            const sp = stage.data.stockPrice;
            const changeRate = ((sp.after - sp.deal) / sp.deal * 100).toFixed(1);
            const isNeg = Number(changeRate) < 0;
            const fmt = (v) => sp.unit === "円"
              ? `${v.toLocaleString()}${sp.unit}`
              : `${sp.unit}${v.toLocaleString()}`;
            return (
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  {fmt(sp.deal)} → {fmt(sp.after)}
                </div>
                <div
                  className="text-2xl font-black tabular-nums"
                  style={{
                    color: isNeg ? "#f87171" : "#4ade80",
                    textShadow: `0 0 16px ${isNeg ? "rgba(248,113,113,0.5)" : "rgba(74,222,128,0.5)"}`,
                  }}
                >
                  {isNeg ? "" : "+"}{changeRate}%
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Impairment Card */}
      {totalImpairment > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="w-full bg-red-950/40 rounded-xl p-4 border border-red-800/60"
        >
          <div className="text-sm font-bold text-red-300 mb-2">累計減損損失</div>
          <div
            className="text-4xl font-black text-red-400 text-center tabular-nums"
            style={{ textShadow: "0 0 20px rgba(248,113,113,0.5)" }}
          >
            {formatOku(totalImpairment * 1000)}
          </div>
        </motion.div>
      )}

      {/* Chart toggle + comparison chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + impairmentDelay }}
        className="w-full"
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowChart((v) => !v)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              showChart
                ? "bg-yellow-500/20 border-yellow-500/60 text-yellow-300"
                : "bg-slate-800/60 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300"
            }`}
          >
            {showChart ? "テーブル表示" : "チャート表示"}
          </button>
        </div>

        {showChart && (
          <div className="w-full bg-slate-800/80 rounded-xl p-4 border border-slate-600 mb-4">
            <div className="text-sm font-bold text-slate-300 mb-3">
              B/S比較チャート (Deal直後 vs 実データ)
            </div>
            <BSComparisonChart dealData={postDeal} actualData={actual} />
            <div className="text-[10px] text-slate-500 mt-2 text-right">
              単位: {stage.unit}
            </div>
          </div>
        )}
      </motion.div>

      {/* Detail table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + impairmentDelay }}
        className="w-full bg-slate-800/80 rounded-xl p-4 border border-slate-600"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-1" rowSpan={2}>項目</th>
              <th className="text-right py-1 border-b border-slate-700/50" rowSpan={2}>
                <span className="text-slate-500 text-xs">Decision</span>
                <br />
                <span className="text-slate-400">実行直後</span>
              </th>
              <th className="text-center py-1 border-b border-slate-700/50" colSpan={3}>
                <span className="text-orange-400 text-xs">{yearDiff}年後</span>
              </th>
            </tr>
            <tr className="text-slate-400">
              <th className="text-right py-1">あなた</th>
              <th className="text-right py-1">実データ</th>
              <th className="text-right py-1">差</th>
            </tr>
          </thead>
          <tbody>
            {details.map((d) => {
              const diff = Math.round((d.pred - d.act) * 10) / 10;
              return (
                <tr key={d.label} className="border-t border-slate-700">
                  <td className="py-2 text-slate-300">{d.label}</td>
                  <td className="py-2 text-right text-slate-400">{d.deal}</td>
                  <td className="py-2 text-right text-yellow-300">
                    {d.pred}
                  </td>
                  <td className="py-2 text-right text-white">{d.act}</td>
                  <td
                    className={`py-2 text-right font-bold ${
                      Math.abs(diff) < 1
                        ? "text-green-400"
                        : Math.abs(diff) < 5
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {diff > 0 ? "+" : ""}
                    {diff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="text-[10px] text-slate-500 mt-2 text-right">
          単位: {stage.unit}
        </div>
      </motion.div>

      {/* Time-series chart */}
      {history && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 + impairmentDelay }}
          className="w-full bg-slate-800/80 rounded-xl p-4 border border-slate-600"
        >
          <div className="text-sm font-bold text-slate-300 mb-3">
            B/S項目の経時変化 ({stage.before_year}→{stage.after_year})
          </div>
          <TimeSeriesChart history={history} stockPriceUnit={stage.data.stockPrice?.unit} />
        </motion.div>
      )}

      {/* Historical context */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 + impairmentDelay }}
        className={`w-full rounded-xl p-4 border text-sm leading-relaxed ${
          isFailure
            ? "bg-red-950/30 border-red-800/50 text-red-200"
            : "bg-green-950/30 border-green-800/50 text-green-200"
        }`}
      >
        <div className="font-bold mb-1">
          {stage.company_name}の{stage.after_year}年
        </div>
        {stage.description}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 + impairmentDelay }}
        className="flex gap-3"
      >
        <button
          onClick={onRetry}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl border border-slate-500 transition-colors cursor-pointer"
        >
          もう一度挑戦する
        </button>
        {onSelectStage && (
          <button
            onClick={onSelectStage}
            className="px-8 py-3 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-300 font-bold rounded-xl border border-yellow-600/50 transition-colors cursor-pointer"
          >
            別のステージへ
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
