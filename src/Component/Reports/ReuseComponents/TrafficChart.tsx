import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MoreHorizontal } from "lucide-react";

const data = [
  { month: "Jan", visits: 4200, conversion: 4.1 },
  { month: "Feb", visits: 4800, conversion: 5.0 },
  { month: "Mar", visits: 4600, conversion: 4.8 },
  { month: "Apr", visits: 5200, conversion: 5.6 },
  { month: "May", visits: 5000, conversion: 5.2 },
  { month: "Jun", visits: 10879, conversion: 6.5 },
  { month: "Jul", visits: 7200, conversion: 5.7 },
  { month: "Aug", visits: 6900, conversion: 5.3 },
  { month: "Sep", visits: 7600, conversion: 5.9 },
  { month: "Oct", visits: 8100, conversion: 6.2 },
  { month: "Nov", visits: 9600, conversion: 6.8 },
  { month: "Dec", visits: 9100, conversion: 6.4 },
];

export default function TrafficChart() {
  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-5 shadow-sm h-full">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#2f241f]">
            Traffic & Conversion Rate
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Website Analytics
          </p>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Legend */}
      <div className="mt-5 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#F4C78A]" />
          <span className="text-gray-500">Visits</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#6EA45B]" />
          <span className="text-gray-500">Conversion</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="visit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F4C78A" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#F4C78A" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="conversion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6EA45B" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6EA45B" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#efefef"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis hide />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e5e5",
                boxShadow: "0 8px 30px rgba(0,0,0,.08)",
              }}
            />

            <Area
              type="monotone"
              dataKey="visits"
              stroke="#F4C78A"
              strokeWidth={3}
              fill="url(#visit)"
            />

            <Area
              type="monotone"
              dataKey="conversion"
              stroke="#6EA45B"
              strokeWidth={3}
              fill="url(#conversion)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between rounded-xl bg-[#f8f8f8] p-4">
        <div>
          <p className="text-xs text-gray-500">June</p>

          <h3 className="mt-1 text-lg font-bold text-[#2f241f]">
            10,879 Visits
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">
            Conversion Rate
          </p>

          <h3 className="mt-1 text-lg font-bold text-green-600">
            6.5%
          </h3>
        </div>
      </div>

    </div>
  );
}