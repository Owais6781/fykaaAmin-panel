import { MoreHorizontal } from "lucide-react";

const sales = [
  {
    label: "Website",
    value: 82,
    color: "bg-[#6EA45B]",
    amount: "$82.4K",
  },
  {
    label: "Mobile App",
    value: 68,
    color: "bg-[#F4C78A]",
    amount: "$68.7K",
  },
  {
    label: "Marketplace",
    value: 54,
    color: "bg-[#D7C6FF]",
    amount: "$54.2K",
  },
  {
    label: "Retail",
    value: 36,
    color: "bg-[#9DD6FF]",
    amount: "$36.8K",
  },
];

export default function SalesPerformance() {
  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#2f241f]">
            Sales Performance
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Revenue by Channel
          </p>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Total */}
      <div className="mt-6">
        <h2 className="text-4xl font-bold text-[#2f241f]">
          $242,100
        </h2>

        <p className="mt-2 text-sm text-green-600 font-medium">
          ↑ 18.4% from last month
        </p>
      </div>

      {/* Progress Bars */}
      <div className="mt-8 space-y-6">
        {sales.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {item.label}
              </span>

              <span className="text-sm font-semibold text-[#2f241f]">
                {item.amount}
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`${item.color} h-full rounded-full transition-all duration-700`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#F7F6F3] p-4">
          <p className="text-xs text-gray-500">
            Orders
          </p>

          <h4 className="mt-2 text-xl font-bold text-[#2f241f]">
            1,248
          </h4>
        </div>

        <div className="rounded-xl bg-[#F7F6F3] p-4">
          <p className="text-xs text-gray-500">
            Avg Order
          </p>

          <h4 className="mt-2 text-xl font-bold text-[#2f241f]">
            $194
          </h4>
        </div>
      </div>
    </div>
  );
}