

import { X, Package, User, MapPin, } from "lucide-react";
import OrderTracking from "./OrderTracking";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
  apiUrl: string;
}

const OrderModal = ({ open, onClose, order, apiUrl }: OrderModalProps) => {
  if (!open || !order) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Processing":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F19]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-[#0B0F19]">Order Details</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              ID: #{order.orderId || order._id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6 bg-white">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <InfoCard
              title="Order Status"
              value={order.orderStatus || "N/A"}
              badgeClass={getStatusBadge(order.orderStatus)}
            />

            <InfoCard
              title="Payment Status"
              value={order.paymentStatus || "N/A"}
              badgeClass={
                order.paymentStatus === "Paid"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }
            />

            <InfoCard
              title="Payment Method"
              value={order.paymentMethod || "N/A"}
            />

            <InfoCard
              title="Total Amount"
              value={`₹${order.totalAmount ?? 0}`}
              isBold
            />
          </div>

          {/* Order Tracking Visualizer */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <OrderTracking
              status={order.orderStatus}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
            />
          </div>

          {/* Customer & Address Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Customer Information */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 text-[#0B0F19]">
                <User size={16} className="text-slate-500" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  Customer Details
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <DetailRow label="Name" value={order.userInfo?.fullName} />
                <DetailRow label="Email" value={order.userInfo?.email} />
                <DetailRow label="Phone" value={order.userInfo?.phone} />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/60 text-[#0B0F19]">
                <MapPin size={16} className="text-slate-500" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  Shipping Address
                </h3>
              </div>

              <div className="text-xs text-slate-700 space-y-1">
                <p className="font-medium text-[#0B0F19]">
                  {order.userInfo?.address?.line1 || "No address details available."}
                </p>
                <p className="text-slate-500">
                  {[
                    order.userInfo?.address?.city,
                    order.userInfo?.address?.state,
                    order.userInfo?.address?.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {order.userInfo?.address?.country && (
                  <p className="text-slate-500">{order.userInfo.address.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Products Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#0B0F19]">
              <Package size={16} className="text-slate-500" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                Items Ordered ({order.items?.length || 0})
              </h3>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {order.items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="p-3.5 flex items-center gap-4 hover:bg-slate-50/50 transition"
                >
                  <div className="w-16 h-16 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex-shrink-0 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={`${apiUrl}/api/image/${item.image}`}
                        alt={item.title || "Product"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package size={22} className="text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[#0B0F19] truncate">
                      {item.title || "Product Item"}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.category || "General"}
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-600">
                      <span>
                        Qty: <strong className="text-[#0B0F19]">{item.quantity}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Price:{" "}
                        <strong className="text-[#0B0F19]">
                          ₹{item.discountPrice || item.price || 0}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-bold text-sm text-[#0B0F19]">
                    ₹{(item.discountPrice || item.price || 0) * (item.quantity || 1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0B0F19] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition shadow-xs cursor-pointer"
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};

/* Sub-components */

interface InfoCardProps {
  title: string;
  value: string;
  badgeClass?: string;
  isBold?: boolean;
}

const InfoCard = ({ title, value, badgeClass, isBold }: InfoCardProps) => (
  <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between">
    <p className="text-xs font-medium text-slate-500">{title}</p>
    <div className="mt-2">
      {badgeClass ? (
        <span
          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${badgeClass}`}
        >
          {value}
        </span>
      ) : (
        <p className={`text-sm text-[#0B0F19] ${isBold ? "font-bold text-base" : "font-semibold"}`}>
          {value}
        </p>
      )}
    </div>
  </div>
);

interface DetailRowProps {
  label: string;
  value?: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex justify-between items-center">
    <span className="text-slate-500 font-medium">{label}:</span>
    <span className="font-semibold text-[#0B0F19]">{value || "N/A"}</span>
  </div>
);

export default OrderModal;