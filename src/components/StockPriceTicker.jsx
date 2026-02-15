import { motion, AnimatePresence } from "framer-motion";

export default function StockPriceTicker({ price, previousPrice, unit, label, animate }) {
  const direction = price > previousPrice ? "up" : price < previousPrice ? "down" : "flat";
  const isUp = direction === "up";
  const isDown = direction === "down";

  const color = isDown ? "#f87171" : isUp ? "#4ade80" : "#94a3b8";
  const glowColor = isDown ? "rgba(248, 113, 113, 0.4)" : isUp ? "rgba(74, 222, 128, 0.4)" : "transparent";
  const arrow = isDown ? "▼" : isUp ? "▲" : "";

  const formatted = Number.isInteger(price) ? price.toLocaleString() : price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-slate-900/80 backdrop-blur-sm"
      style={{
        borderColor: color,
        boxShadow: `0 0 12px ${glowColor}`,
      }}
      animate={animate ? {
        boxShadow: [
          `0 0 8px ${glowColor}`,
          `0 0 20px ${glowColor}`,
          `0 0 8px ${glowColor}`,
        ],
      } : {}}
      transition={animate ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      <span className="text-[10px] text-slate-400 whitespace-nowrap">{label}</span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={price}
          className="text-sm font-bold tabular-nums"
          style={{ color }}
          initial={animate ? { scale: 1.3, opacity: 0 } : false}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {unit === "円" ? `${formatted}${unit}` : `${unit}${formatted}`}
        </motion.span>
      </AnimatePresence>
      {arrow && (
        <span className="text-xs" style={{ color }}>
          {arrow}
        </span>
      )}
    </motion.div>
  );
}
