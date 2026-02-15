import { motion, AnimatePresence } from "framer-motion";

function DiagramBoundary() {
  return (
    <svg width="56" height="76" viewBox="0 0 56 76" className="shrink-0">
      {/* Cash block */}
      <rect x="4" y="4" width="30" height="28" rx="3" fill="#4ade80" />
      <text x="19" y="22" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="700">
        現金
      </text>
      {/* Handle — pulsing white bar */}
      <rect x="8" y="33.5" width="22" height="3" rx="1.5" fill="white">
        <animate
          attributeName="opacity"
          values="0.4;1;0.4"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>
      {/* Others block */}
      <rect x="4" y="38" width="30" height="28" rx="3" fill="#60a5fa" />
      <text x="19" y="56" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="700">
        その他
      </text>
      {/* Animated arrows */}
      <polygon points="44,28 48,33 40,33" fill="#facc15">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-4;0,0"
          dur="1s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon points="44,42 48,37 40,37" fill="#facc15">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,4;0,0"
          dur="1s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>
  );
}

function DiagramTotal() {
  return (
    <svg width="56" height="76" viewBox="0 0 56 76" className="shrink-0">
      {/* Stacked blocks */}
      <rect x="4" y="4" width="30" height="16" rx="3" fill="#4ade80" />
      <rect x="4" y="21" width="30" height="16" fill="#60a5fa" />
      <rect x="4" y="38" width="30" height="16" rx="3" fill="#c084fc" />
      {/* Orange bottom handle */}
      <rect x="4" y="56" width="30" height="10" rx="3" fill="#fb923c" opacity="0.7">
        <animate
          attributeName="opacity"
          values="0.4;0.9;0.4"
          dur="1.4s"
          repeatCount="indefinite"
        />
      </rect>
      <text
        x="19"
        y="64"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="700"
      >
        ▲▼
      </text>
      {/* Animated arrows */}
      <polygon points="44,52 48,57 40,57" fill="#fb923c">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,-4;0,0"
          dur="1s"
          repeatCount="indefinite"
        />
      </polygon>
      <polygon points="44,70 48,65 40,65" fill="#fb923c">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0;0,4;0,0"
          dur="1s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>
  );
}

function DiagramBalance() {
  return (
    <svg width="56" height="76" viewBox="0 0 56 76" className="shrink-0">
      {/* Left bar (assets) */}
      <rect x="2" y="8" width="18" height="22" rx="2" fill="#4ade80" />
      <rect x="2" y="31" width="18" height="28" rx="2" fill="#60a5fa" />
      {/* "not equal" sign */}
      <text
        x="28"
        y="38"
        textAnchor="middle"
        fill="#f87171"
        fontSize="16"
        fontWeight="700"
      >
        ≠
      </text>
      {/* Right bar (liabilities + equity) */}
      <rect x="36" y="8" width="18" height="20" rx="2" fill="#f87171" />
      <rect x="36" y="29" width="18" height="34" rx="2" fill="#facc15" />
      {/* Auto-balance button */}
      <rect
        x="2"
        y="64"
        width="52"
        height="10"
        rx="4"
        fill="#f97316"
        opacity="0.25"
        stroke="#f97316"
        strokeWidth="0.8"
      />
      <text
        x="28"
        y="71.5"
        textAnchor="middle"
        fill="#fdba74"
        fontSize="6"
        fontWeight="700"
      >
        自動バランス
      </text>
    </svg>
  );
}

export default function HowToPlayGuide({ visible, onDismiss }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="bg-slate-800/70 border border-slate-600/40 rounded-xl p-4 mb-6 max-w-2xl mx-auto backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-yellow-300 flex items-center gap-1.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0"
                >
                  <circle cx="8" cy="8" r="7" stroke="#facc15" strokeWidth="1.5" />
                  <text
                    x="8"
                    y="12"
                    textAnchor="middle"
                    fill="#facc15"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    ?
                  </text>
                </svg>
                操作ガイド
              </div>
              <button
                onClick={onDismiss}
                className="text-xs text-slate-500 hover:text-slate-300 px-2 py-0.5 rounded transition-colors cursor-pointer"
              >
                閉じる
              </button>
            </div>

            {/* 3 steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="flex items-start gap-2.5 bg-slate-700/30 rounded-lg p-3">
                <DiagramBoundary />
                <div className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  <div className="text-white font-bold text-xs mb-1">
                    1. 配分を変える
                  </div>
                  ブロック間の
                  <span className="text-white font-semibold">白い境界線</span>
                  を上下にドラッグして、項目ごとの
                  <span className="text-yellow-300 font-semibold">比率</span>
                  を調整
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-2.5 bg-slate-700/30 rounded-lg p-3">
                <DiagramTotal />
                <div className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  <div className="text-white font-bold text-xs mb-1">
                    2. 全体を増減
                  </div>
                  底辺の
                  <span className="text-orange-300 font-semibold">▲▼ ハンドル</span>
                  をドラッグすると、資産・負債の
                  <span className="text-yellow-300 font-semibold">合計額</span>
                  が変わる
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-2.5 bg-slate-700/30 rounded-lg p-3">
                <DiagramBalance />
                <div className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  <div className="text-white font-bold text-xs mb-1">
                    3. バランス調整
                  </div>
                  左右が
                  <span className="text-red-400 font-semibold">≠</span>
                  なら
                  <span className="text-orange-300 font-semibold">
                    自動バランス
                  </span>
                  ボタンで純資産を自動で合わせる
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
