import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BSBar from "./components/BSBar";
import DraggableBSBar from "./components/DraggableBSBar";
import InvestmentCard from "./components/InvestmentCard";
import RewindAnimation from "./components/RewindAnimation";
import ResultSummary from "./components/ResultSummary";
import StockPriceTicker from "./components/StockPriceTicker";
import HowToPlayGuide from "./components/HowToPlayGuide";
import { stages, bsTotal } from "./data/stages";

const BAR_HEIGHT = 320;

const CATEGORY_COLORS = {
  "買収": { bg: "bg-blue-900/60", text: "text-blue-300" },
  "設備投資": { bg: "bg-cyan-900/60", text: "text-cyan-300" },
  "構造改革": { bg: "bg-purple-900/60", text: "text-purple-300" },
  "資本政策": { bg: "bg-emerald-900/60", text: "text-emerald-300" },
  "事業進出": { bg: "bg-orange-900/60", text: "text-orange-300" },
  "投資": { bg: "bg-pink-900/60", text: "text-pink-300" },
  "利益操作": { bg: "bg-amber-900/60", text: "text-amber-300" },
};

const CATEGORIES = ["all", ...Object.keys(CATEGORY_COLORS)];

/**
 * Intro animation for olympus_part2: Sony equity injection.
 */
function OlympusIntro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Bar proportions based on olympus_part1 after_actual (the devastated state)
  // Total assets = 9.6, debt = 6.5, othersLiab = 3.1, equity = 0.0
  const BAR_H = 200;
  const debtPct = 67.7; // 6.5 / 9.6
  const othLiabPct = 32.3; // 3.1 / 9.6
  const equityTarget = 5.1; // 0.5 / 9.9 * 100 ≈ after injection

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 gap-8 cursor-pointer"
      onClick={onComplete}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <div className="text-xs text-slate-500 mb-1">2012年</div>
        <div className="text-xl font-bold text-slate-300">
          上場廃止の瀬戸際
        </div>
        <div className="text-sm text-red-400 mt-1">純資産 = 0</div>
      </motion.div>

      {/* B/S + Sony injection visualization */}
      <div className="relative flex items-end justify-center gap-6" style={{ height: BAR_H + 40 }}>
        {/* Assets bar */}
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 rounded-t overflow-hidden flex flex-col justify-end"
            initial={{ height: 0 }}
            animate={{ height: BAR_H }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-[#4ade80]/60" style={{ height: "17%" }} />
            <div className="bg-[#60a5fa]/60" style={{ height: "78%" }} />
            <div className="bg-[#c084fc]/60" style={{ height: "5%" }} />
          </motion.div>
          <div className="text-[10px] text-slate-500 mt-2">資産</div>
        </div>

        {/* L+E bar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              className="w-16 rounded-t overflow-hidden flex flex-col justify-end"
              initial={{ height: 0 }}
              animate={{ height: BAR_H }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="bg-[#f87171]/60" style={{ height: `${debtPct}%` }} />
              <div className="bg-[#fb923c]/60" style={{ height: `${othLiabPct}%` }} />
            </motion.div>

            {/* Equity injection block */}
            <motion.div
              className="absolute bottom-0 left-0 w-16 rounded-b"
              initial={{ height: 0 }}
              animate={{ height: `${equityTarget}%` }}
              transition={{ delay: 3.0, duration: 1.0, ease: "easeOut" }}
              style={{
                background: "#facc15",
                boxShadow: "0 0 24px rgba(250,204,21,0.7), 0 0 48px rgba(250,204,21,0.3)",
                transform: "translateY(100%)",
              }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-2">負債+純資産</div>
        </div>

        {/* SONY label with arrow */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.0, duration: 0.6, ease: "easeOut" }}
          className="absolute -right-4 bottom-12 flex flex-col items-center"
        >
          <div
            className="text-2xl font-black text-white tracking-widest"
            style={{ textShadow: "0 0 20px rgba(250,204,21,0.6)" }}
          >
            SONY
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="text-[11px] text-yellow-300 font-bold mt-1"
          >
            500億円出資
          </motion.div>
          {/* Arrow pointing to equity */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.5 }}
            width="40" height="20" viewBox="0 0 40 20" className="mt-1"
          >
            <line x1="30" y1="10" x2="5" y2="10" stroke="#facc15" strokeWidth="2" />
            <polygon points="5,5 5,15 0,10" fill="#facc15" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Narrative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="text-center"
      >
        <div className="text-yellow-300 font-bold text-lg mb-1">純資産の注入</div>
        <div className="text-slate-500 text-xs">タップして予測を開始</div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [phase, setPhase] = useState("select"); // select | intro | build | rewind | result
  const [stage, setStage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [showGuide, setShowGuide] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const postDeal = stage?.data.deal ?? null;

  // Build phase scale for Before bar
  const beforeMaxTotal = stage ? bsTotal(stage.data.before) : 1;

  const handleStageSelect = (s) => {
    setStage(s);
    setPrediction(null);
    if (s.stage_id === "olympus_part2") {
      setPhase("intro");
    } else {
      setPhase("build");
    }
  };

  const handleIntroComplete = useCallback(() => {
    setPhase("build");
  }, []);

  const handleDataChange = useCallback((data) => {
    setPrediction(data);
  }, []);

  const handleDecision = () => {
    if (!prediction) return;
    setPhase("rewind");
  };

  const handleRewindComplete = () => {
    setPhase("result");
  };

  const handleRetry = () => {
    setPrediction(null);
    setPhase("build");
  };

  const handleBackToSelect = () => {
    setStage(null);
    setPrediction(null);
    setPhase("select");
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1
              className="text-xl font-black text-white tracking-tight cursor-pointer hover:text-yellow-300 transition-colors"
              onClick={handleBackToSelect}
            >
              One Decision
            </h1>
            <span className="text-xs text-slate-500 hidden sm:inline">
              財務シミュレーションゲーム
            </span>
          </div>
          {stage && phase !== "select" && (
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-400">
                {stage.company_name} / {stage.before_year}-{stage.after_year}
              </div>
              <button
                onClick={handleBackToSelect}
                className="text-xs text-slate-500 hover:text-slate-300 border border-slate-600 px-2 py-1 rounded transition-colors cursor-pointer"
              >
                ステージ選択
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ====== SELECT PHASE ====== */}
          {phase === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-10">
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-black text-white mb-3"
                >
                  One Decision
                </motion.h2>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-400"
                >
                  歴史的な投資判断のその後を予測せよ
                </motion.p>
              </div>

              {/* Category filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-4xl mx-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                      categoryFilter === cat
                        ? "bg-yellow-500/20 border-yellow-500/60 text-yellow-300"
                        : "bg-slate-800/60 border-slate-600/50 text-slate-400 hover:border-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {cat === "all" ? "全表示" : cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {stages.filter((s) => categoryFilter === "all" || s.category === categoryFilter).map((s, i) => {
                  const isFailure = s.data.after_actual.equity < 0;
                  return (
                    <motion.button
                      key={s.stage_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleStageSelect(s)}
                      className={`p-5 rounded-xl border text-left cursor-pointer transition-colors ${
                        isFailure
                          ? "bg-red-950/30 border-red-800/50 hover:bg-red-950/50 hover:border-red-700/70"
                          : "bg-green-950/30 border-green-800/50 hover:bg-green-950/50 hover:border-green-700/70"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isFailure
                              ? "bg-red-900/60 text-red-300"
                              : "bg-green-900/60 text-green-300"
                          }`}
                        >
                          {s.before_year}-{s.after_year}
                        </span>
                        {s.category && CATEGORY_COLORS[s.category] && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${CATEGORY_COLORS[s.category].bg} ${CATEGORY_COLORS[s.category].text}`}
                          >
                            {s.category}
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-bold text-white mb-1">
                        {s.stage_name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {s.description}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ====== INTRO PHASE (Olympus Part 2) ====== */}
          {phase === "intro" && stage && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <OlympusIntro onComplete={handleIntroComplete} />
            </motion.div>
          )}

          {/* ====== BUILD PHASE ====== */}
          {phase === "build" && stage && (
            <motion.div
              key="build"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stage title */}
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-black text-white mb-2"
                >
                  {stage.company_name}の{stage.after_year}年を予測せよ
                </motion.h2>
                <p className="text-slate-400 text-sm">
                  投資直後のB/Sから、
                  {stage.after_year - stage.before_year}
                  年後のB/Sを予測してください
                </p>
              </div>

              {/* Investment info */}
              <div className="flex justify-center mb-8">
                <InvestmentCard stage={stage} />
              </div>

              {/* 3-stage layout + side guide */}
              <div className="flex items-start justify-center gap-4">
              <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-4">
                {/* Before B/S */}
                <div className="flex flex-col items-center">
                  {stage.data.stockPrice && (
                    <div className="mb-2">
                      <StockPriceTicker
                        price={stage.data.stockPrice.before}
                        previousPrice={stage.data.stockPrice.before}
                        unit={stage.data.stockPrice.unit}
                        label={`${stage.company_name} 株価`}
                        animate={false}
                      />
                    </div>
                  )}
                  <BSBar
                    data={stage.data.before}
                    barHeight={BAR_HEIGHT}
                    maxTotal={beforeMaxTotal}
                    label="投資前"
                    year={stage.before_year}
                    animate
                    unit={stage.unit}
                  />
                </div>

                {/* Arrow 1 */}
                <div className="hidden lg:flex flex-col items-center self-center mt-16 gap-1">
                  <span className="text-3xl text-slate-500 font-bold">→</span>
                  <span className="text-[10px] text-slate-500">
                    {stage.investment_target}
                  </span>
                </div>
                <div className="lg:hidden flex justify-center text-2xl text-slate-500 font-bold">
                  ↓ {stage.investment_target}
                </div>

                {/* Deal + Prediction side by side */}
                <div className="flex flex-col items-center">
                  <DraggableBSBar
                    initialData={postDeal}
                    dealData={postDeal}
                    barHeight={BAR_HEIGHT}
                    onDataChange={handleDataChange}
                    year={stage.after_year}
                    dealYear={stage.before_year}
                    unit={stage.unit}
                    stockPrice={stage.data.stockPrice}
                    companyName={stage.company_name}
                  />
                  <div className="text-[10px] text-slate-500 mt-1">
                    スライダーで予測B/Sを作成
                  </div>
                </div>
              </div>

              {/* Side guide — lg+ only */}
              <div className="hidden lg:block self-center">
                <HowToPlayGuide
                  visible={showGuide}
                  onDismiss={() => setShowGuide(false)}
                />
                {!showGuide && (
                  <button
                    onClick={() => setShowGuide(true)}
                    className="text-slate-500 hover:text-yellow-300 border border-slate-600 hover:border-yellow-400/50 p-2 rounded-lg transition-colors cursor-pointer"
                    title="操作ガイド"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <text x="8" y="12" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="bold">?</text>
                    </svg>
                  </button>
                )}
              </div>
              </div>

              {/* DECISION button */}
              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDecision}
                  disabled={!prediction}
                  className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-black text-xl rounded-2xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  RESULT
                </motion.button>
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">
                予測を確定して歴史を再生する
              </p>
            </motion.div>
          )}

          {/* ====== REWIND PHASE ====== */}
          {phase === "rewind" && stage && (
            <motion.div
              key="rewind"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-8"
            >
              <RewindAnimation
                stage={stage}
                postDeal={postDeal}
                prediction={prediction}
                barHeight={BAR_HEIGHT}
                onComplete={handleRewindComplete}
              />
            </motion.div>
          )}

          {/* ====== RESULT PHASE ====== */}
          {phase === "result" && stage && prediction && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8"
            >
              <ResultSummary
                prediction={prediction}
                actual={stage.data.after_actual}
                stage={stage}
                postDeal={postDeal}
                onRetry={handleRetry}
                onSelectStage={handleBackToSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16 py-6 text-center text-xs text-slate-600">
        One Decision - 歴史から学ぶ財務シミュレーション
      </footer>
    </div>
  );
}

export default App;
