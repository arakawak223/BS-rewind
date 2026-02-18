import { motion, AnimatePresence } from "framer-motion";

/** Vertical slider with animated thumb + up/down arrows */
function DiagramVerticalSlider() {
  return (
    <svg width="44" height="56" viewBox="0 0 44 56" className="shrink-0 mx-auto">
      {/* Track */}
      <rect x="17" y="6" width="10" height="36" rx="5" fill="rgba(100,116,139,0.3)" />
      {/* Thumb */}
      <circle cx="22" cy="22" r="6" fill="#4ade80" stroke="white" strokeWidth="1.5">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,10;0,0"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Up arrow */}
      <polygon points="22,2 18,7 26,7" fill="#facc15">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </polygon>
      {/* Down arrow */}
      <polygon points="22,48 18,43 26,43" fill="#facc15">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
      </polygon>
    </svg>
  );
}

/** Multiple colored sliders (asset + liability groups) */
function DiagramMultiSliders() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="shrink-0 mx-auto">
      {/* Asset tracks */}
      <rect x="4" y="6" width="6" height="32" rx="3" fill="rgba(100,116,139,0.3)" />
      <circle cx="7" cy="14" r="3.5" fill="#4ade80" />
      <rect x="14" y="6" width="6" height="32" rx="3" fill="rgba(100,116,139,0.3)" />
      <circle cx="17" cy="24" r="3.5" fill="#60a5fa" />
      <rect x="24" y="6" width="6" height="32" rx="3" fill="rgba(100,116,139,0.3)" />
      <circle cx="27" cy="28" r="3.5" fill="#c084fc" />
      {/* Divider */}
      <line x1="34" y1="6" x2="34" y2="38" stroke="#475569" strokeWidth="1" />
      {/* Liability tracks */}
      <rect x="38" y="6" width="6" height="32" rx="3" fill="rgba(100,116,139,0.3)" />
      <circle cx="41" cy="18" r="3.5" fill="#f87171" />
      <rect x="48" y="6" width="6" height="32" rx="3" fill="rgba(100,116,139,0.3)" />
      <circle cx="51" cy="26" r="3.5" fill="#fb923c" />
      {/* Group labels */}
      <text x="17" y="50" textAnchor="middle" fill="#94a3b8" fontSize="6">資産</text>
      <text x="44" y="50" textAnchor="middle" fill="#94a3b8" fontSize="6">負債</text>
    </svg>
  );
}

/** Auto-calculated equity diagram */
function DiagramAutoEquity() {
  return (
    <svg width="44" height="56" viewBox="0 0 44 56" className="shrink-0 mx-auto">
      {/* Asset column */}
      <rect x="2" y="4" width="14" height="11" rx="2" fill="#4ade80" />
      <rect x="2" y="16" width="14" height="14" rx="2" fill="#60a5fa" />
      <rect x="2" y="31" width="14" height="7" rx="2" fill="#c084fc" />
      {/* Liab + equity column */}
      <rect x="28" y="4" width="14" height="14" rx="2" fill="#f87171" />
      <rect x="28" y="19" width="14" height="10" rx="2" fill="#fb923c" />
      <rect x="28" y="30" width="14" height="8" rx="2" fill="#facc15">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
      </rect>
      {/* Equals sign */}
      <text x="22" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">=</text>
      {/* Auto label */}
      <rect x="2" y="44" width="40" height="8" rx="3" fill="#f97316" opacity="0.25" stroke="#f97316" strokeWidth="0.8" />
      <text x="22" y="50" textAnchor="middle" fill="#fdba74" fontSize="5.5" fontWeight="700">自動計算</text>
    </svg>
  );
}

/**
 * 操作ガイド — desktop sidebar or mobile overlay
 * overlay=true: fixed position overlay with backdrop (for mobile)
 */
export default function HowToPlayGuide({ visible, onDismiss, overlay = false }) {
  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Mobile backdrop */}
          {overlay && (
            <motion.div
              key="guide-backdrop"
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onDismiss}
            />
          )}

          <motion.div
            key="guide-content"
            initial={{ opacity: 0, ...(overlay ? { y: 30 } : { x: 20 }) }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...(overlay ? { y: 30 } : { x: 20 }) }}
            transition={{ duration: 0.25 }}
            className={
              overlay
                ? "fixed z-50 bottom-16 left-1/2 -translate-x-1/2 w-[300px] bg-slate-800/95 border border-slate-600/40 rounded-xl p-4 backdrop-blur-sm shadow-2xl"
                : "bg-slate-800/70 border border-slate-600/40 rounded-xl p-3 backdrop-blur-sm w-[170px] shrink-0"
            }
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

            {/* Steps — horizontal on overlay, vertical on sidebar */}
            <div className={overlay ? "flex gap-2" : "flex flex-col gap-2.5"}>
              {/* Step 1 */}
              <div className="bg-slate-700/30 rounded-lg p-2 flex-1">
                <DiagramVerticalSlider />
                <div className="text-[10px] text-slate-300 leading-snug mt-1.5 text-center">
                  スライダーを<br />
                  <span className="text-yellow-300 font-bold">上下</span>に動かす
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-700/30 rounded-lg p-2 flex-1">
                <DiagramMultiSliders />
                <div className="text-[10px] text-slate-300 leading-snug mt-1.5 text-center">
                  各科目の<br />
                  <span className="text-yellow-300 font-bold">金額</span>を調整
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-700/30 rounded-lg p-2 flex-1">
                <DiagramAutoEquity />
                <div className="text-[10px] text-slate-300 leading-snug mt-1.5 text-center">
                  <span className="text-yellow-300 font-bold">純資産</span>は<br />
                  自動計算
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
