
import {
  X,
  Tag,
  Calendar,
  Percent,
  ShoppingBag,
  Users,
  FileText,
  FolderTree,
  Package,
  Store,
} from "lucide-react";

interface ViewCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: any;
}

export default function ViewCouponModal({
  isOpen,
  onClose,
  coupon,
}: ViewCouponModalProps) {
  if (!isOpen || !coupon) return null;

  const formatDate = (date: string) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b bg-gray-50 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 pr-2 min-w-0">
            <div className="min-w-0">
              <h2 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                {coupon.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                Code: <span className="font-semibold text-gray-700">{coupon.code}</span>
              </p>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 ${coupon.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : coupon.status === "Inactive"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {coupon.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition shrink-0"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5">

          {/* Description */}
          {coupon.description && (
            <div className="rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 bg-gray-50/50">
              <div className="flex items-center gap-1.5 mb-1.5 text-blue-600">
                <FileText size={16} />
                <h3 className="font-semibold text-xs sm:text-sm text-gray-800">
                  Description
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                {coupon.description}
              </p>
            </div>
          )}

          {/* Coupon Information */}
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">
              Coupon Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <InfoCard
                icon={<Tag size={16} />}
                title="Coupon Code"
                value={coupon.code}
              />
              <InfoCard
                icon={<Tag size={16} />}
                title="Coupon Title"
                value={coupon.title}
              />
            </div>
          </div>

          {/* Discount Details */}
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">
              Discount Details
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              <InfoCard
                icon={<Percent size={16} />}
                title="Discount Type"
                value={coupon.discountType}
              />
              <InfoCard
                icon={<Percent size={16} />}
                title="Discount Value"
                value={
                  coupon.discountType === "Percentage"
                    ? `${coupon.discountValue}%`
                    : `₹${coupon.discountValue}`
                }
              />
              <InfoCard
                icon={<ShoppingBag size={16} />}
                title="Minimum Order"
                value={`₹${coupon.minimumOrder}`}
              />
              <InfoCard
                icon={<ShoppingBag size={16} />}
                title="Maximum Discount"
                value={
                  coupon.maximumDiscount
                    ? `₹${coupon.maximumDiscount}`
                    : "-"
                }
              />
            </div>
          </div>

          {/* Validity */}
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">
              Coupon Validity
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <InfoCard
                icon={<Calendar size={16} />}
                title="Start Date"
                value={formatDate(coupon.startDate)}
              />
              <InfoCard
                icon={<Calendar size={16} />}
                title="End Date"
                value={formatDate(coupon.endDate)}
              />
            </div>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">
              Usage Information
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <InfoCard
                icon={<Users size={16} />}
                title="Usage Limit"
                value={
                  coupon.usageLimit === 0
                    ? "Unlimited"
                    : coupon.usageLimit
                }
              />
              <InfoCard
                icon={<Users size={16} />}
                title="Used Count"
                value={coupon.usedCount}
              />
              <InfoCard
                icon={<Users size={16} />}
                title="Per User Limit"
                value={coupon.perUserLimit}
              />
            </div>
          </div>

          {/* Coupon Features */}
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-gray-800 mb-2">
              Coupon Features
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <FeatureCard title="Public Coupon" active={coupon.isPublic} />
              <FeatureCard title="First Order Only" active={coupon.firstOrderOnly} />
              <FeatureCard title="Free Shipping" active={coupon.freeShipping} />
            </div>
          </div>

          {/* Categories */}
          {coupon.categories && coupon.categories.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2 text-blue-600">
                <FolderTree size={16} />
                <h3 className="font-semibold text-xs sm:text-sm text-gray-800">
                  Categories ({coupon.categories.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {coupon.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-hide pb-1">
            {/* Products */}
            {coupon.products && coupon.products.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-purple-600">
                  <Package size={16} />
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-800">
                    Products ({coupon.products.length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coupon.products.map((product: any) => (
                    <span
                      key={product._id || product.id}
                      className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100"
                    >
                      {product.title || product.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sellers */}
            {coupon.sellerId  && coupon.sellerId .length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-emerald-600">
                  <Store size={16} />
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-800">
                    Sellers ({coupon.sellerId .length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {coupon.sellerId .map((seller: any) => (
                    <span
                      key={seller._id || seller.id}
                      className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100"
                    >
                      {seller.fullName || seller.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-4 sm:px-6 py-3 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg sm:rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-medium hover:bg-slate-800 active:scale-95 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

/* ==========================================
   Reusable Helper Components
========================================== */

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: any;
}

function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <div className="border border-gray-100 bg-gray-50/40 rounded-lg sm:rounded-xl p-2.5 sm:p-3 hover:border-gray-200 transition">
      <div className="flex items-center gap-1.5 mb-1 text-blue-600">
        {icon}
        <span className="font-medium text-xs text-gray-500 truncate">
          {title}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-900 font-semibold break-words leading-tight">
        {value || "-"}
      </p>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  active: boolean;
}

function FeatureCard({ title, active }: FeatureCardProps) {
  return (
    <div
      className={`rounded-lg sm:rounded-xl border p-2 sm:p-2.5 text-center sm:text-left transition ${active
          ? "border-green-200 bg-green-50/60"
          : "border-red-200 bg-red-50/60"
        }`}
    >
      <p className="text-[11px] sm:text-xs text-gray-500 truncate">{title}</p>
      <p
        className={`font-semibold text-xs sm:text-sm leading-tight ${active ? "text-green-700" : "text-red-700"
          }`}
      >
        {active ? "Yes" : "No"}
      </p>
    </div>
  );
}