import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BSBar from "./components/BSBar";
import DraggableBSBar from "./components/DraggableBSBar";
import InvestmentCard from "./components/InvestmentCard";
import RewindAnimation from "./components/RewindAnimation";
import ResultSummary from "./components/ResultSummary";
import StockPriceTicker from "./components/StockPriceTicker";
import HowToPlayGuide from "./components/HowToPlayGuide";
import { stages, bsTotal } from "./data/stages";

const BAR_HEIGHT = 480;

function App() {
  const [phase, setPhase] = useState("select"); // select | build | rewind | result
  const [stage, setStage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [showGuide, setShowGuide] = useState(true);

  const postDeal = stage?.data.deal ?? null;

  // Build phase scale: max of before and deal for consistent sizing
  const buildMaxTotal = stage
    ? Math.max(bsTotal(stage.data.before), bsTotal(stage.data.deal))
    : 1;

  const handleStageSelect = (s) => {
    setStage(s);
    setPrediction(null);
    setPhase("build");
  };

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
              B/S Rewind
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
                  B/S Rewind
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {stages.map((s, i) => {
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
                    maxTotal={buildMaxTotal}
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

                {/* Deal B/S */}
                <div className="flex flex-col items-center">
                  {stage.data.stockPrice && (
                    <div className="mb-2">
                      <StockPriceTicker
                        price={stage.data.stockPrice.deal}
                        previousPrice={stage.data.stockPrice.before}
                        unit={stage.data.stockPrice.unit}
                        label={`${stage.company_name} 株価`}
                        animate={false}
                      />
                    </div>
                  )}
                  <BSBar
                    data={postDeal}
                    barHeight={BAR_HEIGHT}
                    maxTotal={buildMaxTotal}
                    label="Deal直後"
                    year={stage.before_year}
                    animate
                    unit={stage.unit}
                  />
                </div>

                {/* Arrow 2 */}
                <div className="hidden lg:flex flex-col items-center self-center mt-16 gap-1">
                  <span className="text-3xl text-orange-400 font-bold">→</span>
                  <span className="text-[10px] text-orange-400/70">
                    {stage.after_year - stage.before_year}年後は？
                  </span>
                </div>
                <div className="lg:hidden flex justify-center text-2xl text-orange-400 font-bold">
                  ↓ {stage.after_year - stage.before_year}年後は？
                </div>

                {/* Prediction */}
                <div className="flex flex-col items-center">
                  {stage.data.stockPrice && (
                    <div className="mb-2 invisible" aria-hidden="true">
                      <StockPriceTicker
                        price={0}
                        previousPrice={0}
                        unit={stage.data.stockPrice.unit}
                        label={`${stage.company_name} 株価`}
                        animate={false}
                      />
                    </div>
                  )}
                  <DraggableBSBar
                    initialData={postDeal}
                    barHeight={BAR_HEIGHT}
                    onDataChange={handleDataChange}
                    year={stage.after_year}
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
                  DECISION
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
        B/S Rewind - 歴史から学ぶ財務シミュレーション
      </footer>
    </div>
  );
}

export default App;
