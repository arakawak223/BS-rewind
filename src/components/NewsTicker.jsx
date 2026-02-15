import { motion, AnimatePresence } from "framer-motion";

const SERIF = "'Noto Serif JP', serif";

/**
 * Normal ticker: slides in from left below the B/S bar.
 */
function Ticker({ headline, year, type }) {
  return (
    <motion.div
      key={`${year}-${headline}`}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 60, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md border border-slate-600/60 rounded-lg px-4 py-2 bg-slate-800/70 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-500 font-mono shrink-0">{year}</span>
        {type === "financial" && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-300 font-bold shrink-0">
            銀行
          </span>
        )}
        <span
          className="text-sm text-slate-200 leading-snug"
          style={{ fontFamily: SERIF }}
        >
          {headline}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Breaking news: full overlay with red badge, spring animation.
 */
function BreakingOverlay({ headline, year }) {
  return (
    <motion.div
      key={`breaking-${year}`}
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop glow */}
      <div className="absolute inset-0 rounded-2xl bg-red-950/40 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center gap-3 px-6 py-5 max-w-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Red/gold glow behind */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(220,38,38,0.25) 0%, rgba(234,179,8,0.08) 60%, transparent 80%)",
          }}
        />

        {/* 号外 badge */}
        <motion.div
          className="relative px-4 py-1 bg-red-600 rounded shadow-lg shadow-red-600/40"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
        >
          <span
            className="text-white text-lg font-bold tracking-widest"
            style={{ fontFamily: SERIF }}
          >
            号外
          </span>
        </motion.div>

        {/* Year */}
        <span className="relative text-xs text-red-300/80 font-mono">{year}</span>

        {/* Headline */}
        <motion.p
          className="relative text-center text-lg text-white leading-relaxed font-bold"
          style={{ fontFamily: SERIF }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {headline}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

/**
 * Critical overlay: audit/bank warnings with distinct badge colors.
 */
function CriticalOverlay({ headline, year, type, subtype }) {
  let badgeText, badgeClass;
  if (subtype === "going_concern") {
    badgeText = "継続企業の前提";
    badgeClass = "bg-red-700 shadow-red-700/40";
  } else if (type === "official") {
    badgeText = "重要決算情報";
    badgeClass = "bg-amber-600 shadow-amber-600/40";
  } else {
    badgeText = "銀行通告";
    badgeClass = "bg-blue-600 shadow-blue-600/40";
  }

  return (
    <motion.div
      key={`critical-${year}-${type}`}
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Dark backdrop with amber glow */}
      <div className="absolute inset-0 rounded-2xl bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        className="relative flex flex-col items-center gap-3 px-6 py-5 max-w-sm"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Amber glow behind */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(217,119,6,0.25) 0%, rgba(234,179,8,0.08) 60%, transparent 80%)",
          }}
        />

        {/* Badge */}
        <motion.div
          className={`relative px-4 py-1 rounded shadow-lg ${badgeClass}`}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.15, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1] }}
        >
          <span
            className="text-white text-lg font-bold tracking-widest"
            style={{ fontFamily: SERIF }}
          >
            {badgeText}
          </span>
        </motion.div>

        {/* Year */}
        <span className="relative text-xs text-amber-300/80 font-mono">{year}</span>

        {/* Headline */}
        <motion.p
          className="relative text-center text-lg text-white leading-relaxed font-bold"
          style={{ fontFamily: SERIF }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {headline}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function NewsTicker({ headline, year, isBreaking, isCritical, type, subtype }) {
  if (!headline) return null;

  return (
    <AnimatePresence mode="wait">
      {isCritical ? (
        <CriticalOverlay headline={headline} year={year} type={type} subtype={subtype} />
      ) : isBreaking ? (
        <BreakingOverlay headline={headline} year={year} />
      ) : (
        <Ticker headline={headline} year={year} type={type} />
      )}
    </AnimatePresence>
  );
}
