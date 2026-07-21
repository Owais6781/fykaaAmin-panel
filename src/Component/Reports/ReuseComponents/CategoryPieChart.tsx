
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type PaymentItem = {
  name: string;
  value: number;
};

type Props = {
  title: string;
  data: PaymentItem[];
  colors: string[];
  centerLabel?: string;
};

export default function CategoryPieChart({
  title,
  data,
  colors,
  centerLabel = "Total Orders",
}: Props) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <h2 className="text-[15px] font-semibold text-slate-800 mb-4">
        {title}
      </h2>

      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={55}
              outerRadius={85}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-center pointer-events-none">
          <p className="text-xl font-semibold text-slate-800">
            {total}
          </p>
          <p className="text-[10px] text-slate-400">
            {centerLabel}
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-2.5">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-[12px]"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: colors[index % colors.length],
                }}
              />
              <span className="text-slate-500">
                {item.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">
                {item.value}
              </span>

              <span className="text-slate-400">
                {total === 0
                  ? "0%"
                  : `${((item.value / total) * 100).toFixed(1)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



