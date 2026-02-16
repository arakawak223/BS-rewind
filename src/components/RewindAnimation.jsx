import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bsTotal } from "../data/stages";
import StockPriceTicker from "./StockPriceTicker";
import NewsTicker from "./NewsTicker";

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
 * Non-linear interpolation for stock price.
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

// ── Particle generators ──

function spawnShatterParticles(idRef, blockType, count = 6) {
  const color = blockType === "goodwill" ? "#c084fc" : "#60a5fa";
  const baseY = blockType === "goodwill" ? 80 : 50;
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 25 + Math.random() * 50;
    particles.push({
      id: idRef.current++,
      type: "shatter",
      color,
      left: 15 + Math.random() * 10,
      top: baseY + (Math.random() - 0.5) * 20,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      rot: Math.random() * 360 - 180,
      duration: 0.7 + Math.random() * 0.6,
      born: Date.now(),
    });
  }
  return particles;
}

function spawnGlowParticles(idRef, count = 5) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: idRef.current++,
      type: "glow",
      left: 55 + Math.random() * 20,
      top: 85 + Math.random() * 10,
      ty: -(20 + Math.random() * 30),
      ty2: -(50 + Math.random() * 40),
      duration: 1.0 + Math.random() * 0.5,
      born: Date.now(),
    });
  }
  return particles;
}

// ── Stakeholder voice messages ──

const NEGATIVE_MESSAGES = [
  "銀行の督促が来ている...",
  "株主の怒号が聞こえる",
  "格下げ警告",
  "取引先が離反...",
  "リストラの噂が...",
  "空売り残が増加中",
  "決算に重大な懸念",
  "社債が格下げ",
];
const POSITIVE_MESSAGES = [
  "投資家の喝采!",
  "アナリストが推奨!",
  "増配期待の声",
  "業績上方修正か",
  "機関投資家が注目",
  "市場が好感",
  "格上げ期待",
  "成長期待が高まる",
];

function spawnVoice(idRef, sentiment) {
  const msgs = sentiment === "positive" ? POSITIVE_MESSAGES : NEGATIVE_MESSAGES;
  return {
    id: idRef.current++,
    text: msgs[Math.floor(Math.random() * msgs.length)],
    sentiment,
    side: Math.random() > 0.5 ? "right" : "left",
    yPct: 20 + Math.random() * 60,
    born: Date.now(),
  };
}

// ── Sub-components ──

function ParticleLayer({ particles }) {
  return (
    <>
      {particles.map((p) =>
        p.type === "shatter" ? (
          <div
            key={p.id}
            className="shatter-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              backgroundColor: p.color,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rot}deg`,
              "--duration": `${p.duration}s`,
            }}
          />
        ) : (
          <div
            key={p.id}
            className="glow-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              "--ty": `${p.ty}px`,
              "--ty2": `${p.ty2}px`,
              "--duration": `${p.duration}s`,
            }}
          />
        )
      )}
    </>
  );
}

function VoiceLayer({ voices }) {
  return (
    <AnimatePresence>
      {voices.map((v) => (
        <motion.div
          key={v.id}
          className={`voice-bubble voice-bubble--${v.sentiment}`}
          style={{
            top: `${v.yPct}%`,
            ...(v.side === "left" ? { left: -10 } : { right: -10 }),
          }}
          initial={{ opacity: 0, x: v.side === "left" ? -30 : 30, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.35 }}
        >
          {v.text}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

/** SVG crack pattern for overlay */
function CrackSVG() {
  return (
    <svg viewBox="0 0 80 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 0 L38 30 L28 50 L35 70 L25 100 L30 130 L20 160 L35 200"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M28 50 L15 65"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M25 100 L40 115 L38 130"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Animated B/S bar with framer-motion dynamic scaling.
 */
function BSBarAnimated({ data, barHeight, maxTotal, opacity = 1, borderColorHex = "#475569", showCrack, showSmoke }) {
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

  // Determine which block gets the crack overlay
  const crackOnGoodwill = showCrack && goodwill > 0.1;
  const crackOnOthers = showCrack && !crackOnGoodwill;

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
          className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0 relative"
          style={{ backgroundColor: COLORS.cash, opacity, minHeight: cash > 0.1 ? 2 : 0 }}
          animate={{ height: cashH }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {cashH > 24 && (
            <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
              現金<br />{r(cash)}
            </span>
          )}
          {/* Smoke particles on cash block */}
          {showSmoke && (
            <>
              <div className="smoke-particle" />
              <div className="smoke-particle" />
              <div className="smoke-particle" />
            </>
          )}
        </motion.div>
        <motion.div
          className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0 relative"
          style={{ backgroundColor: COLORS.others, opacity, minHeight: others > 0.1 ? 2 : 0 }}
          animate={{ height: othersH }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {othersH > 24 && (
            <span className="text-gray-900 drop-shadow-sm text-center leading-tight px-1">
              その他<br />{r(others)}
            </span>
          )}
          {crackOnOthers && (
            <div className="crack-overlay">
              <CrackSVG />
            </div>
          )}
        </motion.div>
        {goodwill > 0.1 && (
          <motion.div
            className="w-full flex items-center justify-center text-xs font-bold select-none shrink-0 relative"
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
            {crackOnGoodwill && (
              <div className="crack-overlay">
                <CrackSVG />
              </div>
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
  const sp = data.stockPrice;
  const newsItems = data.news || [];
  const [currentYear, setCurrentYear] = useState(before_year);
  const [currentBS, setCurrentBS] = useState(startBS);
  const [currentStockPrice, setCurrentStockPrice] = useState(sp ? sp.deal : null);
  const [prevStockPrice, setPrevStockPrice] = useState(sp ? sp.deal : null);
  const [phase, setPhase] = useState("counting");
  const [bgColor, setBgColor] = useState("transparent");
  const [currentNews, setCurrentNews] = useState(null);

  // Effect states
  const [showNoise, setShowNoise] = useState(false);
  const [showCrack, setShowCrack] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  // Feature 1: Vital sign (visual pulse)
  const [vitalCritical, setVitalCritical] = useState(false);

  // Feature 2: Particles
  const [particles, setParticles] = useState([]);
  const prevBSRef = useRef(null);
  const particleIdRef = useRef(0);

  // Feature 3: Stakeholder voices
  const [voices, setVoices] = useState([]);
  const voiceIdRef = useRef(0);

  const intervalRef = useRef(null);
  const yearRef = useRef(before_year);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const totalYears = after_year - before_year;

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

  const tick = useCallback(() => {
    yearRef.current++;
    const year = yearRef.current;
    const t = (year - before_year) / totalYears;
    setCurrentYear(year);
    const newBS = interpolateBS(startBS, actualAfter, t);
    setCurrentBS(newBS);

    // ── Vital sign: check cash ratio & equity ratio ──
    const totalAssets = (newBS.assets.cash || 0) + (newBS.assets.goodwill || 0) + (newBS.assets.others || 0);
    const cashRatio = totalAssets > 0 ? (newBS.assets.cash || 0) / totalAssets : 0;
    const totalLiab = (newBS.liabilities.debt || 0) + (newBS.liabilities.others || 0);
    const equityRatio = totalAssets > 0 ? newBS.equity / totalAssets : 0;
    setVitalCritical(cashRatio < 0.10 || equityRatio < 0.05);

    // ── Particles: compare with previous B/S ──
    if (prevBSRef.current && totalAssets > 0) {
      const prev = prevBSRef.current;
      const gwDrop = (prev.assets.goodwill || 0) - (newBS.assets.goodwill || 0);
      const othersDrop = (prev.assets.others || 0) - (newBS.assets.others || 0);
      const eqGain = newBS.equity - prev.equity;
      const threshold = totalAssets * 0.03;

      if (gwDrop > threshold) {
        setParticles((p) => [...p, ...spawnShatterParticles(particleIdRef, "goodwill", 5)].slice(-20));
      }
      if (othersDrop > threshold) {
        setParticles((p) => [...p, ...spawnShatterParticles(particleIdRef, "others", 4)].slice(-20));
      }
      if (eqGain > threshold) {
        setParticles((p) => [...p, ...spawnGlowParticles(particleIdRef, 4)].slice(-20));
      }
    }
    prevBSRef.current = newBS;

    // ── Stakeholder voices: 35% chance per tick ──
    if (Math.random() < 0.35) {
      const healthScore = equityRatio + cashRatio;
      const sentiment = healthScore < 0.2 ? "negative" : healthScore > 0.6 ? "positive"
        : Math.random() > 0.5 ? "negative" : "positive";
      setVoices((v) => [...v, spawnVoice(voiceIdRef, sentiment)].slice(-3));
    }

    if (sp) {
      setCurrentStockPrice((prev) => {
        setPrevStockPrice(prev);
        return Math.round(interpolateStockPrice(sp.deal, sp.after, t, sp.curve));
      });
    }

    // Get all news for this year, sort by priority
    const newsHits = newsItems
      .filter((n) => n.year === year)
      .sort((a, b) => {
        const p = (x) => (x.isCritical ? 3 : x.isBreaking ? 2 : 1);
        return p(b) - p(a);
      });
    const newsHit = newsHits[0] || null;

    if (newsHit) {
      setCurrentNews(newsHit);
    } else {
      setCurrentNews(null);
    }

    if (year >= after_year) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCurrentNews(null);
      const isFailure = actualAfter.equity < 0;
      setBgColor(isFailure ? "rgba(220, 38, 38, 0.15)" : "rgba(255, 215, 0, 0.1)");
      setVitalCritical(false);
      setParticles([]);
      setVoices([]);
      setPhase("done");
      setTimeout(() => onCompleteRef.current?.(), 1500);
      return;
    }

    // Critical news: noise + beep + crack, pause longer
    if (newsHit?.isCritical) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setShowNoise(true);
      setShowCrack(true); // permanent
      if (newsHit.subtype === "going_concern") {
        setShowCaution(true); // permanent
        setShowSmoke(true);   // permanent
      }
      setTimeout(() => {
        setShowNoise(false);
        setCurrentNews(null);
        intervalRef.current = setInterval(tick, 2000);
      }, 5000);
      return;
    }

    // Breaking news: pause then resume
    if (newsHit?.isBreaking) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeout(() => {
        setCurrentNews(null);
        intervalRef.current = setInterval(tick, 2000);
      }, 4000);
    }
  }, [before_year, after_year, totalYears, startBS, actualAfter, sp, newsItems]);

  useEffect(() => {
    if (phase !== "counting") return;

    yearRef.current = before_year;
    intervalRef.current = setInterval(tick, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [phase, before_year, tick]);

  // Auto-cleanup expired particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      const now = Date.now();
      setParticles((p) => p.filter((pt) => now - pt.born < 1500));
    }, 1600);
    return () => clearTimeout(timer);
  }, [particles]);

  // Auto-cleanup expired voices
  useEffect(() => {
    if (voices.length === 0) return;
    const timer = setTimeout(() => {
      const now = Date.now();
      setVoices((v) => v.filter((vc) => now - vc.born < 1500));
    }, 1600);
    return () => clearTimeout(timer);
  }, [voices]);

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
        {phase === "done" && actualAfter.equity < 0 && "債務超過に転落..."}
      </div>

      {/* Stock Price Ticker */}
      {sp && currentStockPrice != null && (
        <StockPriceTicker
          price={currentStockPrice}
          previousPrice={prevStockPrice}
          unit={sp.unit}
          label={`${stage.company_name} 株価`}
          animate={phase === "counting"}
        />
      )}

      {/* Side-by-side B/S bars: Actual (left) + Prediction (right) */}
      <div className="relative">
        <div className="flex items-end gap-6">
          {/* Actual data */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-slate-300 mb-1">実データ</div>
            <BSBarAnimated
              data={currentBS}
              barHeight={barHeight}
              maxTotal={rewindMax}
              opacity={0.85}
              showCrack={showCrack}
              showSmoke={showSmoke}
            />
          </div>

          {/* Player prediction */}
          {predictionBS && (
            <div className="flex flex-col items-center">
              <div className="text-xs text-yellow-400 mb-1">あなたの予測</div>
              <BSBarAnimated
                data={predictionBS}
                barHeight={barHeight}
                maxTotal={rewindMax}
                opacity={0.5}
                borderColorHex="rgba(250, 204, 21, 0.4)"
              />
            </div>
          )}
        </div>

        {/* Vital pulse overlay */}
        {vitalCritical && phase === "counting" && <div className="vital-pulse-overlay" />}

        {/* Particles */}
        {particles.length > 0 && <ParticleLayer particles={particles} />}

        {/* Stakeholder voices */}
        {voices.length > 0 && <VoiceLayer voices={voices} />}

        {/* CAUTION tape */}
        {showCaution && <div className="caution-tape" />}

        {/* Noise overlay */}
        <div className={`noise-overlay ${showNoise ? "active" : ""}`} />

        {/* Breaking / Critical news overlay - covers the B/S area */}
        <AnimatePresence>
          {currentNews && (currentNews.isBreaking || currentNews.isCritical) && (
            <NewsTicker
              headline={currentNews.headline}
              year={currentNews.year}
              isBreaking={currentNews.isBreaking}
              isCritical={currentNews.isCritical}
              type={currentNews.type}
              subtype={currentNews.subtype}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Normal news ticker - below B/S bars */}
      <div className="h-12 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {currentNews && !currentNews.isBreaking && !currentNews.isCritical && (
            <NewsTicker
              headline={currentNews.headline}
              year={currentNews.year}
              isBreaking={false}
              isCritical={false}
              type={currentNews.type}
              subtype={currentNews.subtype}
            />
          )}
        </AnimatePresence>
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
