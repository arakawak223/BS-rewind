import { motion, AnimatePresence } from "framer-motion";

function DiagramBoundary() {
  return (
    <svg width="44" height="60" viewBox="0 0 44 60" className="shrink-0 mx-auto">
      <rect x="2" y="2" width="24" height="22" rx="3" fill="#4ade80" />
      <text x="14" y="16" textAnchor="middle" fill="#1e293b" fontSize="7" fontWeight="700">
        現金
      </text>
      <rect x="6" y="25.5" width="16" height="2.5" rx="1" fill="white">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" />
      </rect>
      <rect x="2" y="30" width="24" height="22" rx="3" fill="#60a5fa" />
      <text x="14" y="44" textAnchor="middle" fill="#1e293b" fontSize="7" fontWeight="700">
        その他
      </text>
      <polygon points="34,22 38,27 30,27" fill="#facc15">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="1s" repeatCount="indefinite" />
      </polygon>
      <polygon points="34,34 38,29 30,29" fill="#facc15">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,3;0,0" dur="1s" repeatCount="indefinite" />
      </polygon>
    </svg>
  );
}

function DiagramTotal() {
  return (
    <svg width="44" height="60" viewBox="0 0 44 60" className="shrink-0 mx-auto">
      <rect x="2" y="2" width="24" height="13" rx="3" fill="#4ade80" />
      <rect x="2" y="16" width="24" height="13" fill="#60a5fa" />
      <rect x="2" y="30" width="24" height="13" rx="3" fill="#c084fc" />
      <rect x="2" y="45" width="24" height="8" rx="3" fill="#fb923c" opacity="0.7">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.4s" repeatCount="indefinite" />
      </rect>
      <text x="14" y="51.5" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">▲▼</text>
      <polygon points="34,42 38,47 30,47" fill="#fb923c">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="1s" repeatCount="indefinite" />
      </polygon>
      <polygon points="34,56 38,51 30,51" fill="#fb923c">
        <animateTransform attributeName="transform" type="translate" values="0,0;0,3;0,0" dur="1s" repeatCount="indefinite" />
      </polygon>
    </svg>
  );
}

function DiagramBalance() {
  return (
    <svg width="44" height="60" viewBox="0 0 44 60" className="shrink-0 mx-auto">
      <rect x="2" y="6" width="14" height="18" rx="2" fill="#4ade80" />
      <rect x="2" y="25" width="14" height="22" rx="2" fill="#60a5fa" />
      <text x="22" y="30" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="700">≠</text>
      <rect x="28" y="6" width="14" height="16" rx="2" fill="#f87171" />
      <rect x="28" y="23" width="14" height="26" rx="2" fill="#facc15" />
      <rect x="2" y="51" width="40" height="8" rx="3" fill="#f97316" opacity="0.25" stroke="#f97316" strokeWidth="0.8" />
      <text x="22" y="57" textAnchor="middle" fill="#fdba74" fontSize="5.5" fontWeight="700">自動バランス</text>
    </svg>
  );
}

/** Sidebar version of guide (vertical stack, compact) */
export default function HowToPlayGuide({ visible, onDismiss }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-slate-800/70 border border-slate-600/40 rounded-xl p-3 backdrop-blur-sm w-[170px] shrink-0"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] font-bold text-yellow-300 flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="shrink-0">
                <circle cx="8" cy="8" r="7" stroke="#facc15" strokeWidth="1.5" />
                <text x="8" y="12" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">?</text>
              </svg>
              操作ガイド
            </div>
            <button
              onClick={onDismiss}
              className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors cursor-pointer leading-none"
            >
              ×
            </button>
          </div>

          {/* Steps stacked vertically */}
          <div className="flex flex-col gap-2.5">
            {/* Step 1 */}
            <div className="bg-slate-700/30 rounded-lg p-2">
              <DiagramBoundary />
              <div className="text-[10px] text-slate-300 leading-snug mt-1.5 text-center">
                <span className="text-white font-bold">白い線</span>をドラッグ
                <br />
                <span className="text-yellow-300">配分</span>を調整
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-700/30 rounded-lg p-2">
              <DiagramTotal />
              <div className="text-[10px] text-slate-300 leading-snug mt-1.5 text-center">
                <span className="text-orange-300 font-bold">▲▼</span>をドラッグ
                <br />
                <span className="text-yellow-300">合計額</span>を増減
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-700/30 rounded-lg p-2">
              <DiagramBalance />
              <div className="text-[10px] text-slate-300 leading-snug mt-1.5 text-center">
                <span className="text-red-400 font-bold">≠</span>なら
                <span className="text-orange-300 font-bold">自動バランス</span>
                <br />
                で純資産を調整
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
