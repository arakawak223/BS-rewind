import { motion } from "framer-motion";
import { formatOku } from "../data/stages";

const METHOD_LABELS = {
  debt_financed: "借入 (有利子負債)",
  cash_financed: "現金買収",
  cash_to_capex: "現金 → 設備投資",
};

export default function InvestmentCard({ stage }) {
  const { investment_target, description, data } = stage;
  const inv = data.investment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 border border-slate-600 rounded-xl p-5 max-w-sm"
    >
      <div className="text-xs text-slate-400 mb-1">投資内容</div>
      <h3 className="text-lg font-bold text-white mb-2">{investment_target}</h3>
      <div className="flex gap-3 mb-3">
        <div className="bg-purple-900/50 px-3 py-1 rounded text-sm">
          <span className="text-slate-400">調達: </span>
          <span className="text-purple-300 font-bold">
            {METHOD_LABELS[inv.method] || inv.method}
          </span>
        </div>
        <div className="bg-red-900/50 px-3 py-1 rounded text-sm">
          <span className="text-slate-400">金額: </span>
          <span className="text-red-300 font-bold">{formatOku(inv.amount * 1000)}</span>
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}
