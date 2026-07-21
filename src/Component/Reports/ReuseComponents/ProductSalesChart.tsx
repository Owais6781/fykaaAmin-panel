

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";





type ChartData = Record<string, any>;

type Props = {
    title: string;
    data: ChartData[];
    dataKey: string;
    xAxisKey: string;
    color?: string;
    label?: string;

    categories?: string[];
    selectedCategory?: string;
    onCategoryChange?: (value: string) => void;
};

export default function ProductSalesChart({
    title,
    data,
    dataKey,
    xAxisKey,
    color = "#6C4CF1",
    label = "Sales",

    categories,
    selectedCategory,
    onCategoryChange,

}: Props) {
    return (
        <div className="rounded-2xl border border-[#ebe8e2] bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#2f241f]">
                        {title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                        <div
                            className="h-3 w-3 rounded-full"
                            style={{ background: color }}
                        />

                        <span className="text-sm text-gray-500">
                            {label}
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange?.(e.target.value)}
                        className="rounded-lg border border-gray-200 px-4 py-2 pr-8 text-sm outline-none"
                    >
                        {categories?.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                
                </div>
            </div>

            {/* Chart */}
            <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid
                            stroke="#f0f0f0"
                            vertical={false}
                        />

                        <XAxis
                            dataKey={xAxisKey}
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            formatter={(value: any) => [
                                value.toLocaleString(),
                                label,
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            dot={{ r: 4, fill: color }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}