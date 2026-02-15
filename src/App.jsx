import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BSBar from "./components/BSBar";
import DraggableBSBar from "./components/DraggableBSBar";
import InvestmentCard from "./components/InvestmentCard";
import RewindAnimation from "./components/RewindAnimation";
import ResultSummary from "./components/ResultSummary";
import { getStage, calcPostDeal } from "./data/stages";

const STAGE = getStage("toshiba_2006");
const BAR_HEIGHT = 380;

function App() {
  const [phase, setPhase] = useState("build"); // build | rewind | result
  const [prediction, setPrediction] = useState(null);

  const postDeal = useMemo(() => calcPostDeal(STAGE), []);

  const handleDataChange = useCallback((data) => {
    setPrediction(data);
  }, []);

  const handleDecision = () => {
    if (!prediction) return;

    // 未バランスなら純資産で自動調整
    const at =
      (prediction.assets.cash || 0) +
      (prediction.assets.goodwill || 0) +
      (prediction.assets.others || 0);
    const rt =
      (prediction.liabilities.debt || 0) +
      (prediction.liabilities.others || 0) +
      prediction.equity;

    if (Math.abs(at - rt) >= 0.5) {
      const newEq =
        at -
        (prediction.liabilities.debt || 0) -
        (prediction.liabilities.others || 0);
      setPrediction((prev) => ({ ...prev, equity: newEq }));
    }

    setPhase("rewind");
  };

  const handleRewindComplete = () => {
    setPhase("result");
  };

  const handleRetry = () => {
    setPrediction(null);
    setPhase("build");
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black text-white tracking-tight">
              B/S Rewind
            </h1>
            <span className="text-xs text-slate-500 hidden sm:inline">
              財務シミュレーションゲーム
            </span>
          </div>
          <div className="text-sm text-slate-400">
            {STAGE.company_name} / {STAGE.before_year}-{STAGE.after_year}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ====== BUILD PHASE ====== */}
          {phase === "build" && (
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
                  {STAGE.company_name}の{STAGE.after_year}年を予測せよ
                </motion.h2>
                <p className="text-slate-400 text-sm">
                  投資直後のB/Sから、
                  {STAGE.after_year - STAGE.before_year}
                  年後のB/Sを予測してください
                </p>
              </div>

              {/* Investment info */}
              <div className="flex justify-center mb-8">
                <InvestmentCard stage={STAGE} />
              </div>

              {/* 3-stage layout */}
              <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-4">
                {/* ① Before B/S */}
                <div className="flex flex-col items-center">
                  <BSBar
                    data={STAGE.data.before}
                    barHeight={BAR_HEIGHT}
                    label="投資前"
                    year={STAGE.before_year}
                    animate
                    unit={STAGE.unit}
                  />
                </div>

                {/* Arrow 1 */}
                <div className="hidden lg:flex flex-col items-center self-center mt-16 gap-1">
                  <span className="text-3xl text-slate-500 font-bold">→</span>
                  <span className="text-[10px] text-slate-500">
                    {STAGE.investment_target}
                  </span>
                </div>
                <div className="lg:hidden flex justify-center text-2xl text-slate-500 font-bold">
                  ↓ {STAGE.investment_target}
                </div>

                {/* ② 投資直後 B/S */}
                <div className="flex flex-col items-center">
                  <BSBar
                    data={postDeal}
                    barHeight={BAR_HEIGHT}
                    label="Deal直後"
                    year={STAGE.before_year}
                    animate
                    unit={STAGE.unit}
                  />
                </div>

                {/* Arrow 2 */}
                <div className="hidden lg:flex flex-col items-center self-center mt-16 gap-1">
                  <span className="text-3xl text-orange-400 font-bold">→</span>
                  <span className="text-[10px] text-orange-400/70">
                    {STAGE.after_year - STAGE.before_year}年後は？
                  </span>
                </div>
                <div className="lg:hidden flex justify-center text-2xl text-orange-400 font-bold">
                  ↓ {STAGE.after_year - STAGE.before_year}年後は？
                </div>

                {/* ③ あなたの予測 */}
                <div className="flex flex-col items-center">
                  <DraggableBSBar
                    initialData={postDeal}
                    barHeight={BAR_HEIGHT}
                    onDataChange={handleDataChange}
                    year={STAGE.after_year}
                  />
                  <div className="text-[10px] text-slate-500 mt-1">
                    境界線 / 底辺▲▼をドラッグして調整
                  </div>
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
                {prediction?._balanced === false
                  ? "※ 未バランスの場合、純資産で自動調整されます"
                  : "予測を確定して歴史を再生する"}
              </p>
            </motion.div>
          )}

          {/* ====== REWIND PHASE ====== */}
          {phase === "rewind" && (
            <motion.div
              key="rewind"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-8"
            >
              <RewindAnimation
                stage={STAGE}
                postDeal={postDeal}
                prediction={prediction}
                barHeight={BAR_HEIGHT}
                onComplete={handleRewindComplete}
              />
            </motion.div>
          )}

          {/* ====== RESULT PHASE ====== */}
          {phase === "result" && prediction && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8"
            >
              <ResultSummary
                prediction={prediction}
                actual={STAGE.data.after_actual}
                stage={STAGE}
                postDeal={postDeal}
                onRetry={handleRetry}
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
