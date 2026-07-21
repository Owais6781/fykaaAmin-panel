



import { MoreHorizontal } from "lucide-react";

type Props = {
  revenue: number;
  target: number;
};

export default function GoalCard({ revenue, target }: Props) {
  const progress = Math.min((revenue / target) * 100, 100);

  const remaining = Math.max(target - revenue, 0);

  // Avg Daily Sales (Current Month)
  const now = new Date();
  const currentDay = now.getDate();

  const avgDailySales = revenue / currentDay;

  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-5 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#2f241f]">
            Team Goals
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Monthly Revenue Target
          </p>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Revenue */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#2f241f]">
            ₹{revenue.toLocaleString()}
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            ACHIEVED
          </p>
        </div>

        <span className="text-lg font-semibold text-[#2f241f]">
          {progress.toFixed(1)}%
        </span>
      </div>

      {/* Progress */}
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-[#6ea45b]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Remaining */}
      <div className="mt-6 rounded-xl bg-[#dfe5ff] p-4">
        <p className="text-[11px] uppercase tracking-wide text-gray-500">
          Remaining To Goal
        </p>

        <h3 className="mt-2 text-2xl font-bold text-[#2f241f]">
          ₹{remaining.toLocaleString()}
        </h3>
      </div>

      {/* Avg Daily */}
      <div className="mt-4 rounded-xl bg-[#efe3ff] p-4">
        <p className="text-[11px] uppercase tracking-wide text-gray-500">
          Avg Daily Sales
        </p>

        <h3 className="mt-2 text-2xl font-bold text-[#2f241f]">
          ₹{avgDailySales.toFixed(0).toLocaleString()}
        </h3>
      </div>
    </div>
  );
}