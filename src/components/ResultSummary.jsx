import { motion } from "framer-motion";

const SERIES = [
  { key: "cash", label: "現金", color: "#4ade80", get: (d) => d.assets.cash || 0 },
  { key: "others", label: "その他資産", color: "#60a5fa", get: (d) => d.assets.others || 0 },
  { key: "goodwill", label: "のれん", color: "#c084fc", get: (d) => d.assets.goodwill || 0 },
  { key: "debt", label: "有利子負債", color: "#f87171", get: (d) => d.liabilities.debt || 0 },
  { key: "otherLiab", label: "その他負債", color: "#fb923c", get: (d) => d.liabilities.others || 0 },
  { key: "equity", label: "純資産", color: "#facc15", get: (d) => d.equity },
];

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
              className="w-3 h-1 rounded-full"
              style={{ backgroundColor: STOCK_COLOR }}
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

export default function ResultSummary({ prediction, actual, stage, postDeal, onRetry, onSelectStage }) {
  const syncRate = calcSyncRate(prediction, actual, stage);
  const rank = getRank(syncRate);
  const isFailure = actual.equity < 0;

  const r = (v) => Math.round((v || 0) * 10) / 10;

  const details = [
    { label: "現金", pred: r(prediction.assets.cash), act: r(actual.assets.cash) },
    { label: "その他資産", pred: r(prediction.assets.others), act: r(actual.assets.others) },
    { label: "のれん", pred: r(prediction.assets.goodwill), act: r(actual.assets.goodwill) },
    { label: "有利子負債", pred: r(prediction.liabilities.debt), act: r(actual.liabilities.debt) },
    { label: "その他負債", pred: r(prediction.liabilities.others), act: r(actual.liabilities.others) },
    { label: "純資産", pred: r(prediction.equity), act: r(actual.equity) },
  ];

  const history = postDeal
    ? buildHistory(postDeal, actual, stage.before_year, stage.after_year, stage.data.stockPrice)
    : null;

  const totalImpairment = stage.data.summary?.totalImpairment || 0;
  const hasGC = stage.data.news?.some((n) => n.subtype === "going_concern");
  const gcPenaltyApplied = hasGC && prediction.equity > 0 && actual.equity < 0;

  // Auditor feedback conditions
  const goodwillDiff = Math.abs((prediction.assets.goodwill || 0) - (actual.assets.goodwill || 0));
  const equityDiff = Math.abs(prediction.equity - actual.equity);
  const showAuditorFeedback = totalImpairment > 0 && (goodwillDiff > 2.0 || equityDiff > 5.0);

  // Delay offset for impairment/feedback cards
  const impairmentDelay = totalImpairment > 0 ? 0.3 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-6 max-w-lg mx-auto"
    >
      {/* Sync Rate */}
      <div className="text-center">
        <div className="text-sm text-slate-400 mb-2">シンクロ率</div>
        <motion.div
          className="text-7xl font-black tabular-nums"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            color: syncRate >= 60 ? "#4ade80" : "#f87171",
          }}
        >
          {syncRate}
          <span className="text-3xl">%</span>
        </motion.div>
      </div>

      {/* Rank */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", delay: 0.6 }}
        className="text-center"
      >
        <div
          className={`text-8xl font-black ${rank.color}`}
          style={{ textShadow: "0 0 30px currentColor" }}
        >
          {rank.label}
        </div>
        <div className="text-lg text-slate-300 mt-2">{rank.desc}</div>
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
            {(totalImpairment * 1000).toLocaleString()}
            <span className="text-lg ml-1">億円</span>
          </div>
        </motion.div>
      )}

      {/* Auditor Feedback Card */}
      {showAuditorFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="w-full bg-amber-950/40 rounded-xl p-4 border border-amber-700/50"
        >
          <div className="mb-2">
            <span className="text-xs px-2 py-1 rounded bg-amber-600/40 text-amber-200 font-bold">
              監査法人コメント
            </span>
          </div>
          <div className="text-sm text-amber-100 leading-relaxed space-y-1">
            {goodwillDiff > 2.0 && (
              <p>のれんの減損リスクを見逃しています。</p>
            )}
            {equityDiff > 5.0 && (
              <p>債務超過への転落を織り込めていません。</p>
            )}
            {gcPenaltyApplied && (
              <p className="text-red-300 font-bold">
                継続企業の前提に関する重大な疑義を見落としていました。（シンクロ率 30%減点）
              </p>
            )}
            <p className="text-amber-400/70 text-xs mt-2">
              ※ 減損テストの結果、回収可能価額は大幅に低下していました
            </p>
          </div>
        </motion.div>
      )}

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
              <th className="text-left py-1">項目</th>
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
