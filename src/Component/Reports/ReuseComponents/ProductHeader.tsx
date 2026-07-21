import {
  CalendarDays,
  Download,
  Search,
} from "lucide-react";

type Props = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function ProductHeader({
  search = "",
  setSearch,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <h1 className="text-3xl font-bold text-[#2f241f]">
            Product Reports
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Track product sales, revenue, inventory and performance.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch?.(e.target.value)}
              className="w-64 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 outline-none focus:border-violet-500 focus:bg-white"
            />
          </div>

          {/* Date */}
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 hover:bg-gray-50">
            <CalendarDays
              size={18}
              className="text-violet-600"
            />

            <span className="text-sm font-medium">
              This Month
            </span>
          </button>

          {/* Export */}
          <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-white transition hover:bg-violet-700">
            <Download size={18} />

            Export
          </button>
        </div>
      </div>
    </div>
  );
}