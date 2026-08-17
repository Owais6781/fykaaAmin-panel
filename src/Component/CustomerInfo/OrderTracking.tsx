
import React from "react";
import { Check, Truck, Clock, PackageCheck, XCircle, RotateCcw } from "lucide-react";

interface OrderTrackingProps {
  status:
    | "Pending"
    | "Confirmed"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  createdAt: string;
  updatedAt: string;
}

const steps = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

const STEP_ICONS: Record<string, React.ElementType> = {
  Pending: Clock,
  Confirmed: Check,
  Processing: PackageCheck,
  Shipped: Truck,
  Delivered: PackageCheck,
};

const formatDate = (date: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const OrderTracking: React.FC<OrderTrackingProps> = ({
  status,
  createdAt,
  updatedAt,
}) => {
  const isCancelled = status === "Cancelled";
  const isReturned = status === "Returned";
  const isTerminal = isCancelled || isReturned;

  const currentIndex = steps.indexOf(status);

  const getStepState = (stepIndex: number) => {
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-5">
      {/* Date Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pb-3 border-b border-slate-100">
        <div>
          <span>Order Placed: </span>
          <strong className="text-[#0B0F19] font-medium">{formatDate(createdAt)}</strong>
        </div>
        <div>
          <span>Last Updated: </span>
          <strong className="text-[#0B0F19] font-medium">{formatDate(updatedAt)}</strong>
        </div>

        {status === "Delivered" && (
          <div className="flex items-center gap-1.5 font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            <Check size={13} />
            <span>Delivered on {formatDate(updatedAt)}</span>
          </div>
        )}
      </div>

      {/* Terminal State Alert */}
      {isTerminal ? (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 text-xs font-medium ${
            isCancelled
              ? "border-rose-200 bg-rose-50/80 text-rose-700"
              : "border-amber-200 bg-amber-50/80 text-amber-700"
          }`}
        >
          {isCancelled ? <XCircle size={18} /> : <RotateCcw size={18} />}
          <div>
            <p className="font-bold text-sm">
              {isCancelled ? "Order Cancelled" : "Order Returned"}
            </p>
            <p className="opacity-80 mt-0.5">Status updated at {formatDate(updatedAt)}</p>
          </div>
        </div>
      ) : (
        /* Progress Bar Timeline */
        <div className="flex items-start pt-2">
          {steps.map((step, index) => {
            const state = getStepState(index);
            const Icon = STEP_ICONS[step] || Clock;
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step}>
                <div className="flex flex-1 flex-col items-center group">
                  {/* Step Badge/Icon */}
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      state === "completed"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : state === "current"
                        ? "bg-[#0B0F19] text-white ring-4 ring-slate-200 shadow-xs"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {state === "completed" ? (
                      <Check size={14} />
                    ) : state === "current" ? (
                      <Icon size={14} />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Step Title */}
                  <p
                    className={`mt-2 text-center text-xs tracking-tight ${
                      state === "upcoming"
                        ? "text-slate-400 font-normal"
                        : state === "current"
                        ? "font-bold text-[#0B0F19]"
                        : "font-semibold text-slate-700"
                    }`}
                  >
                    {step}
                  </p>
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`mt-4 h-0.5 flex-1 transition-colors ${
                      state === "completed" ? "bg-emerald-600" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;