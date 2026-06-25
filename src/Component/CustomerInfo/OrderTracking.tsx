




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

const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const OrderTracking: React.FC<OrderTrackingProps> = ({ status, createdAt, updatedAt }) => {
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      {/* Dates */}
      <div className="mb-6 space-y-1 text-sm text-slate-500">
        <p>Order placed · {formatDate(createdAt)}</p>
        <p>Last updated · {formatDate(updatedAt)}</p>

        {status === "Delivered" && (
          <p className="flex items-center gap-1.5 font-medium text-emerald-600">
            <Check size={14} />
            Delivered on {formatDate(updatedAt)}
          </p>
        )}
      </div>

      {isTerminal ? (
        <div
          className={`flex items-center gap-3 rounded-xl border p-4 ${
            isCancelled
              ? "border-red-100 bg-red-50 text-red-700"
              : "border-orange-100 bg-orange-50 text-orange-700"
          }`}
        >
          {isCancelled ? <XCircle size={20} /> : <RotateCcw size={20} />}
          <div>
            <p className="text-sm font-medium">
              {isCancelled ? "Order cancelled" : "Order returned"}
            </p>
            <p className="text-xs opacity-80">{formatDate(updatedAt)}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          {steps.map((step, index) => {
            const state = getStepState(index);
            const Icon = STEP_ICONS[step];
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step}>
                <div className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                      state === "completed"
                        ? "bg-emerald-500 text-white"
                        : state === "current"
                        ? "bg-blue-500 text-white ring-4 ring-blue-100"
                        : "bg-slate-100 text-slate-400 ring-1 ring-inset ring-slate-200"
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

                  <p
                    className={`mt-2 text-center text-xs ${
                      state === "upcoming"
                        ? "text-slate-400"
                        : "font-medium text-slate-700"
                    }`}
                  >
                    {step}
                  </p>
                </div>

                {!isLast && (
                  <div
                    className={`mt-4 h-px flex-1 ${
                      state === "completed" ? "bg-emerald-500" : "bg-slate-200"
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