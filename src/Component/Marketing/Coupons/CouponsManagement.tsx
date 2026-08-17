
import {
  Plus,
  Ticket,
  CheckCircle2,
  MousePointerClick,
  Calendar,
  Search,
  Eye,
  Edit3,
  Trash2,
  Filter,
} from "lucide-react";

export const CouponsManagement = ({
  handleAddCoupon,
  totalCoupons = 0,
  activeCoupons = 0,
  totalUsage = 0,
  expiredCoupons = 0,
  search = "",
  setSearch,
  couponType = "",
  setCouponType,
  statusFilter = "",
  setStatusFilter,
  coupons = [],
  onView,
  onEdit,
  onDelete,
}: any) => {
  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen">
      {/* 1. Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B0F19]">
            Coupon Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, manage, and monitor discount coupons for your store.
          </p>
        </div>

        <button
          onClick={handleAddCoupon}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0F19] hover:bg-[#182032] text-white px-5 py-2.5 text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Coupon</span>
        </button>
      </div>

      {/* 2. Top Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Ticket size={18} className="text-slate-700" />}
          label="Total Coupons"
          value={totalCoupons}
        />
        <StatCard
          icon={<CheckCircle2 size={18} className="text-emerald-700" />}
          label="Active Coupons"
          value={activeCoupons}
          bgClass="bg-emerald-50"
        />
        <StatCard
          icon={<MousePointerClick size={18} className="text-indigo-700" />}
          label="Total Uses"
          value={totalUsage}
          bgClass="bg-indigo-50"
        />
        <StatCard
          icon={<Calendar size={18} className="text-amber-700" />}
          label="Expired"
          value={expiredCoupons}
          bgClass="bg-amber-50"
        />
      </div>

      {/* 3. Main Container: Filters & Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Filters Toolbar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search coupon code or title..."
                value={search}
                onChange={(e) => setSearch && setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={couponType}
                onChange={(e) => setCouponType?.(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="percentage">Percentage</option>
                <option value="Flat">Flat Amount</option>
                <option value="shipping">Free Shipping</option>
              </select>
              <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  console.log("SELECTED STATUS:", e.target.value);
                  setStatusFilter?.(e.target.value)}}
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-[#0B0F19] outline-none transition focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-100 appearance-none cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Expired">Expired</option>
              </select>
              <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase border-b border-slate-100 tracking-wider">
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Discount</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Min Order</th>
                <th className="py-3.5 px-4">Usage</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Validity</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {coupons.length > 0 ? (
                coupons.map((coupon: any) => (
                  <tr
                    key={coupon._id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Code */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-[#0B0F19] px-2 py-1 rounded border border-slate-200/60">
                        {coupon.code}
                      </span>
                    </td>

                    {/* Title & Description */}
                    <td className="py-3 px-4 max-w-xs">
                      <h3 className="font-semibold text-[#0B0F19] truncate">
                        {coupon.title}
                      </h3>
                      {coupon.description && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {coupon.description}
                        </p>
                      )}
                    </td>

                    {/* Discount Value */}
                    <td className="py-3 px-4 font-semibold text-[#0B0F19]">
                      {coupon.discountType === "Percentage"
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`
                        }
                    </td>

                    {/* Type */}
                    <td className="py-3 px-4 capitalize text-slate-600">
                      {coupon.discountType}
                    </td>

                    {/* Min Order */}
                    <td className="py-3 px-4 text-slate-600">
                      ₹{coupon.minimumOrder || 0}
                    </td>

                    {/* Usage */}
                    <td className="py-3 px-4 text-slate-600">
                      <span className="font-medium text-[#0B0F19]">{coupon.usedCount || 0}</span>
                      <span className="text-slate-400"> / {coupon.usageLimit || "∞"}</span>
                    </td>

                    {/* Status */}
                    {/* <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${coupon.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : coupon.status === "Inactive"
                              ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                              : "bg-rose-50 text-rose-700 border border-rose-200/50"
                          }`}
                      >
                        {coupon.status}
                      </span>
                    </td> */}


                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${coupon.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : coupon.status === "Inactive"
                            ? "bg-gray-50 text-gray-700 border-gray-200/60"
                            : coupon.status === "Expired"
                              ? "bg-rose-50 text-rose-700 border-rose-200/60"
                              : "bg-gray-50 text-gray-700 border-gray-200/60"
                          }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${coupon.status === "Active"
                            ? "bg-emerald-500"
                            : coupon.status === "Inactive"
                              ? "bg-gray-500"
                              : coupon.status === "Expired"
                                ? "bg-rose-500"
                                : "bg-gray-500"
                            }`}
                        />

                        {coupon.status}
                      </span>
                    </td>

                    {/* Validity */}
                    <td className="py-3 px-4 text-[11px] text-slate-500 leading-tight">
                      <span>{new Date(coupon.startDate).toLocaleDateString("en-GB")}</span>
                      <br />
                      <span >to {new Date(coupon.endDate).toLocaleDateString("en-GB")}</span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onView && onView(coupon)}
                          title="View Coupon Details"
                          className="p-1.5 cursor-pointer text-slate-500 hover:text-[#0B0F19] hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          onClick={() => onEdit && onEdit(coupon)}
                          title="Edit"
                          className="p-1.5 cursor-pointer text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          onClick={() => onDelete && onDelete(coupon._id)}
                          title="Delete"
                          className="p-1.5 cursor-pointer text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="py-12 text-center text-slate-400 text-xs"
                  >
                    No coupons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Helper StatCard Component */
const StatCard = ({ icon, label, value, bgClass = "bg-slate-100" }: any) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex items-center gap-3.5 shadow-xs">
      <div className={`p-2.5 rounded-xl ${bgClass} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-lg font-bold text-[#0B0F19] tracking-tight">{value}</p>
      </div>
    </div>
  );
};