type StatCardProps = {
  title: string;
  value: string;
  growth: string;
  positive?: boolean;
};

export default function StatCard({
  title,
  value,
  growth,
  positive = true,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {title}
          </p>
          <p className="mt-1 text-[11px] text-gray-400">
            All time
          </p>
        </div>

        <button className="text-gray-400 transition hover:text-gray-700">
          ⋯
        </button>
      </div>

      {/* Value */}
      <div className="flex items-end gap-3">
        <h2 className="text-3xl font-bold text-[#2f241f]">
          {value}
        </h2>

        <span
          className={`mb-1 text-sm font-semibold ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {positive ? "↗" : "↘"} {growth}
        </span>
      </div>
    </div>
  );
}