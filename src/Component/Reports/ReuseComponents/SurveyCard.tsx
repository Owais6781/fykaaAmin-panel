import {
  MoreHorizontal,
  ArrowUpRight,
  Star,
} from "lucide-react";

export default function SurveyCard() {
  return (
    <div className="rounded-2xl border border-[#ebe8e2] bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-[#2f241f]">
            Customer Survey
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Satisfaction Score
          </p>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Circle Score */}
      <div className="mt-8 flex justify-center">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[12px] border-[#6EA45B] bg-[#f8faf7]">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#2f241f]">92%</h2>
            <p className="mt-1 text-sm text-gray-500">
              Positive
            </p>
          </div>

          <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#6EA45B] text-white shadow-lg">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mt-8 rounded-xl bg-[#F7F6F3] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Average Rating
          </span>

          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="font-semibold text-[#2f241f]">
              4.8 / 5
            </span>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="mt-4 rounded-xl bg-[#EEF8EE] p-4">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Feedback
        </p>

        <h4 className="mt-2 text-2xl font-bold text-[#2f241f]">
          1,284
        </h4>

        <p className="mt-1 text-sm text-green-600">
          ↑ 15% this month
        </p>
      </div>

      {/* Bottom Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#F8F8F8] p-4 text-center">
          <p className="text-xs text-gray-500">
            Completed
          </p>

          <h3 className="mt-2 text-xl font-bold text-[#2f241f]">
            842
          </h3>
        </div>

        <div className="rounded-xl bg-[#F8F8F8] p-4 text-center">
          <p className="text-xs text-gray-500">
            Pending
          </p>

          <h3 className="mt-2 text-xl font-bold text-[#2f241f]">
            126
          </h3>
        </div>
      </div>
    </div>
  );
}