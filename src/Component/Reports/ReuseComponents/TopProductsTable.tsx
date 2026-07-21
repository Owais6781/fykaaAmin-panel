
import type { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface ReusableTableProps<T> {
  title: string;
  subtitle?: string;
  columns?: Column<T>[];
  data: T[];

  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;

  onPrevious?: () => void;
  onNext?: () => void;

  headerAction?: ReactNode;
}

export default function TopProductsTable<T>({
  title,
  subtitle,
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPrevious,
  onNext,
  headerAction,
}: ReusableTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-semibold">{title}</h2>

          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {headerAction}
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-slate-800 font-bold">
            {columns?.map((column) => (
              <th
                key={column.header}
                className={`text-left pb-3 font-medium ${column.className}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b last:border-0">
              {columns?.map((column) => (
                <td
                  key={column.header}
                  className="py-3 text-[13px]"
                >
                  {column.render
                    ? column.render(row)
                    : String(row[column.accessor!] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-gray-500">
          Showing{" "}
          {totalItems === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1}
          {" - "}
          {Math.min(currentPage * itemsPerPage, totalItems)}
          {" of "}
          {totalItems}
        </p>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={onPrevious}
            className="px-4 py-2 border rounded-xl disabled:opacity-40"
          >
            Previous
          </button>

          <span className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            {currentPage}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={onNext}
            className="px-4 py-2 border rounded-xl disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}