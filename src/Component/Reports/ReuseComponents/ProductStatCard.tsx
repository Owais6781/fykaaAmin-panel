import type { ReactNode } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

type ProductStatCardProps = {
  title: string;
  value: string | number;
  growth: string;
  icon: ReactNode;
  iconBg: string;
  iconColor: string;
  positive?: boolean;
};

export default function ProductStatCard({
  title,
  value,
  growth,
  icon,
  iconBg,
  iconColor,
  positive = true,
}: ProductStatCardProps) {
  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}
          >
            {icon}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>

            <h2 className="mt-1 text-3xl font-bold text-[#2f241f]">
              {value}
            </h2>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center gap-2">
        {positive ? (
          <TrendingUp size={16} className="text-green-600" />
        ) : (
          <TrendingDown size={16} className="text-red-500" />
        )}

        <span
          className={`text-sm font-semibold ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {growth}
        </span>

        <span className="text-sm text-gray-400">
          vs last 30 days
        </span>
      </div>
    </div>
  );
}