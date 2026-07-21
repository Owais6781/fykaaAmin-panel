

import { CalendarDays } from "lucide-react";
import { useState } from "react";

type Range = "today" | "week" | "month" | "year";

type Props = {
  onChange: (range: Range) => void;
};

export default function DateFilter({ onChange }: Props) {
  const [active, setActive] = useState<Range>("month");

  const filters: Range[] = [
    "today",
    "week",
    "month",
    "year",
  ];

  const handleClick = (range: Range) => {
    setActive(range);
    onChange(range);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#ebe8e2] bg-white p-4 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
          <CalendarDays size={22} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#2f241f]">
            Product Reports
          </h3>

          <p className="text-sm text-gray-500">
            Analyze your sales performance
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 rounded-xl bg-gray-100 p-1">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
              active === item
                ? "bg-violet-600 text-white shadow"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}