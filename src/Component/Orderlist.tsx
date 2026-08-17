



import MUIDataTable from "mui-datatables";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import type { LucideIcon } from "lucide-react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";

import {
  Clock,
  CheckCircle,
  Package,
  Truck,
  XCircle,
  FileText,
  Shield,

} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery,
} from "../api/orderApi";

interface OrderCoupon {
  couponId?: string;
  code?: string;
  discountType?: "Flat" | "Percentage" | null;
  discountValue?: number;
  discountAmount?: number;
}

type OrderItem = {
  productId?: string;
  title?: string;
  price?: number;
  discountPrice?: number;
  quantity?: number;
  image?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
};

type Address = {
  line1?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
};

type UserInfo = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: Address;
};

type Order = {
  _id: string;
  sellerId: {
    businessName: string;
  };
  title: string;

  orderId?: string;
  transactionId?: string;
  orderStatus: string;
  paymentStatus: string;
   coupon?: OrderCoupon | null;
  totalAmount?: number;
  createdAt?: string;
  updatedAt?: string;
  deliveredAt?: string;
  paymentMethod?: string;
  userInfo?: UserInfo;
  items?: OrderItem[];
    subtotal?: number; 
};

const orderStatusOptions = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderListProfessional() {
  const { data, isLoading, isError, refetch } = useGetMyOrdersQuery(
    undefined,
    {
      pollingInterval: 5000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const admin = JSON.parse(localStorage.getItem("admin") || "{}");
  const SuperAdmin = admin.role === "SuperAdmin";

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const orders: Order[] = Array.isArray(data) ? data : [];


  const tableData = orders.map((order) => ({
    ...order,

    product: order.items?.map((i) => i.title).join(", ") || "",

    category: order.items?.map((i) => i.category?.name).join(", ") || "",
    customer: order.userInfo?.fullName || "",

    Vendor: order.sellerId?.businessName || "",
  }));



  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);

  const prevOrderCountRef = useRef(0);
  const Api = import.meta.env.VITE_API_URL as string;

  const getImageUrl = (productId: string, index: number = 0) => {
    return `${Api}/api/${productId}/img/${index}`;
  };

  useEffect(() => {
    if (!orders.length) {
      prevOrderCountRef.current = 0;
      return;
    }

    if (
      prevOrderCountRef.current > 0 &&
      orders.length > prevOrderCountRef.current
    ) {
      const newOrdersCount = orders.length - prevOrderCountRef.current;
      const latestOrder = orders[0];
      const toastId = toast.success("New order received", {
        description: `${latestOrder.orderId}${newOrdersCount} new order${newOrdersCount > 1 ? "s" : ""
          } arrived at ${new Date().toLocaleTimeString("en-IN")}`,
        duration: Infinity,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);
    }

    prevOrderCountRef.current = orders.length;
  }, [orders]);

  const handleOpen = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-section");
    const WinPrint = window.open("", "", "width=900,height=650");

    if (WinPrint && printContent) {
      WinPrint.document.write(`
        <html>
          <head>
            <title>Print Order</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
                padding: 24px;
                line-height: 1.6;
                color: #111827;
              }
              h2 { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
              h3 { font-size: 14px; font-weight: 600; margin-top: 20px; margin-bottom: 12px; color: #374151; }
              p { margin: 4px 0; font-size: 14px; }
              .section { margin-bottom: 24px; }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 12px;
                font-size: 13px;
              }
              th {
                background: #F3F4F6;
                padding: 10px;
                text-align: left;
                font-weight: 600;
                border-bottom: 1px solid #E5E7EB;
              }
              td {
                padding: 10px;
                border-bottom: 1px solid #E5E7EB;
              }
              tr:last-child td { border-bottom: none; }
              .label { color: #6B7280; font-weight: 500; display: inline-block; width: 120px; }
            </style>
          </head>
          <body>
            <h2>Order Details</h2>
            ${printContent.innerHTML}
          </body>
        </html>
      `);

      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }
  };

  const getOrderStatusConfig = (status: string) => {
    const configs: Record<string, any> = {
      Pending: {
        bgColor: "#FEF3C7",
        textColor: "#92400E",
        borderColor: "#FBBF24",
        icon: Clock,
      },
      Confirmed: {
        bgColor: "#DBEAFE",
        textColor: "#1E40AF",
        borderColor: "#3B82F6",
        icon: Shield,
      },
      Processing: {
        bgColor: "#EDE9FE",
        textColor: "#5B21B6",
        borderColor: "#8B5CF6",
        icon: Package,
      },
      Shipped: {
        bgColor: "#CFFAFE",
        textColor: "#0C4A6E",
        borderColor: "#06B6D4",
        icon: Truck,
      },
      Delivered: {
        bgColor: "#DCFCE7",
        textColor: "#166534",
        borderColor: "#10B981",
        icon: CheckCircle,
      },
      Cancelled: {
        bgColor: "#FEE2E2",
        textColor: "#991B1B",
        borderColor: "#EF4444",
        icon: XCircle,
      },
    };

    return configs[status] || configs["Pending"];
  };

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "Pending").length,
      confirmed: orders.filter((o) => o.orderStatus === "Confirmed").length,
      processing: orders.filter((o) => o.orderStatus === "Processing").length,
      shipped: orders.filter((o) => o.orderStatus === "Shipped").length,
      delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
      cancelled: orders.filter((o) => o.orderStatus === "Cancelled").length,
      returned: orders.filter((o) => o.orderStatus === "Returned").length,
    };
  }, [orders]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const loadingToast = toast.loading("Updating order status...");

    try {
      let newPaymentStatus: string | undefined;

      if (newStatus === "Delivered") {
        newPaymentStatus = "Paid";
      }

      await updateOrderStatus({
        id: orderId,
        orderStatus: newStatus,
        paymentStatus: newPaymentStatus,
      }).unwrap();

      toast.success("Order updated", {
        id: loadingToast,
        description: `Status changed to ${newStatus}`,
      });

      refetch();

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          orderStatus: newStatus,
          paymentStatus:
            newStatus === "Delivered" ? "Paid" : selectedOrder.paymentStatus,
          deliveredAt:
            newStatus === "Delivered"
              ? new Date().toISOString()
              : selectedOrder.deliveredAt,
        });
      }
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Update failed", {
        id: loadingToast,
      });
    }
  };

  const columns = [
    {
      name: "product",
      label: "Product",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                <img

                  src={
                    order.items?.[0]?.productId
                      ? getImageUrl(order.items[0].productId, 0)
                      : "/placeholder.png"
                  }
                  alt={order.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

              </div>
              <div>
                <p className="font-medium text-slate-900 line-clamp-1">
                  {order?.items?.[0]?.title || "Untitled Product"}
                </p>
                <p className="text-xs text-slate-500">
                  {order?.items?.[0]?.category?.name || "Uncategorized"}
                </p>
              </div>
            </div>
          );
        },
      },
    },

    {
      name: "orderId",
      label: "Order ID",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return (
            <span className="font-medium text-slate-900 cursor-pointer"
              onClick={() => handleOpen(order)}>
              {order?.orderId || order?._id || "N/A"}

            </span>
          );
        },
      },
    },
    {
      name: "transactionId",
      label: "Transaction ID",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return (
            <span className="font-mono text-sm text-slate-600">
              {order?.transactionId || "—"}
            </span>
          );
        },
      },
    },

    ...(SuperAdmin
      ? [
        {
          name: "Vendor",
          label: "Vendor",
          options: {
            customBodyRenderLite: (dataIndex: number) => {
              const order = orders[dataIndex];
              return (
                <div>

                  <p className="font-medium text-slate-900">
                    {order?.sellerId?.businessName || "N/A"}
                  </p>

                </div>
              );
            },
          },
        },
      ]
      : []),
    {
      name: "customer",
      label: "Customer",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return (
            <div>
              <p className="font-medium text-slate-900">
                {order?.userInfo?.fullName || "N/A"}
              </p>
              <p className="text-sm text-slate-500">
                {order?.userInfo?.email || "—"}
              </p>
            </div>
          );
        },
      },
    },

    {
      name: "createdAt",
      label: "Order Date",
      options: {
        customBodyRender: (value: string) => {
          if (!value) return "—";
          const date = new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return <span className="text-slate-700">{date}</span>;
        },
      },
    },
    {
      name: "totalAmount",
      label: "Total Amount",
      options: {
        customBodyRender: (value: number) => (
          <span className="font-semibold text-slate-900">
            ₹{(value || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
    },
    {
      name: "paymentMethod",
      label: "Payment Method",
      options: {
        customBodyRender: (value: string) => (
          <span className="text-slate-700">{value || "—"}</span>
        ),
      },
    },
    {
      name: "paymentStatus",
      label: "Payment Status",
      options: {
        customBodyRender: (value: string) => {
          const isPaid = value === "Paid";
          return (
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isPaid
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
            >
              {value || "—"}
            </span>
          );
        },
      },
    },
    {
      name: "orderStatus",
      label: "Order Status",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          const config = getOrderStatusConfig(order.orderStatus);
          const StatusIcon = config.icon;

          return (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border"
                style={{
                  backgroundColor: config.bgColor,
                  borderColor: config.borderColor,
                }}
              >
                <StatusIcon size={16} style={{ color: config.textColor }} />
                <span
                  style={{ color: config.textColor }}
                  className="text-xs font-medium"
                >
                  {order.orderStatus}
                </span>
              </div>

              <select
                value={order.orderStatus}
                disabled={isUpdating}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="px-2 py-1 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          );
        },
      },
    },
    {
      name: "actions",
      label: "Action",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return (
            <Button
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => handleOpen(order)}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                fontSize: "13px",
                borderColor: "#D1D5DB",
                color: "#1F2937",
                "&:hover": {
                  borderColor: "#3B82F6",
                  backgroundColor: "rgba(59, 130, 246, 0.04)",
                  color: "#1E40AF",
                },
              }}
            >
              View
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: "none" as const,
    responsive: "vertical" as const,
    elevation: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 25],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-700 font-medium text-lg">
            Loading orders...
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={32} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Connection error
          </h2>
          <p className="text-slate-600 mb-6">
            Unable to load orders. Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    icon: Icon,
    label,
  }: {
    title: string;
    value: number;
    icon: LucideIcon;
    label: string;
  }) => (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-semibold text-slate-900 mt-2">
            {value}
          </h3>
        </div>
        <div className="p-2.5 bg-slate-100 rounded-lg">
          <Icon size={20} className="text-slate-700" />
        </div>
      </div>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="px-6 py-5 flex items-center justify-between">
          {/* Left Side */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-slate-900" />
              <h1 className="text-2xl font-semibold text-slate-900">
                Order Management
              </h1>
            </div>

            <p className="text-sm text-slate-600">
              Manage and track all customer orders
            </p>
          </div>

          {/* Right Side - Hardcoded Cancel Orders */}

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
              <span className="text-xl font-bold text-red-600">
                {stats.cancelled}
              </span>
            </div>

            <p className="mt-2 text-sm font-medium text-gray-600">
              Cancelled
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Orders"
            value={stats.total}
            icon={FileText}
            label="All orders"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            label="Awaiting action"
          />
          <StatCard
            title="In Transit"
            value={stats.shipped}
            icon={Truck}
            label="Shipped orders"
          />
          <StatCard
            title="Delivered"
            value={stats.delivered}
            icon={CheckCircle}
            label="Completed orders"
          />


        </div>

        {/* Table Section */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <MUIDataTable
            title=""
            data={tableData}
            columns={columns}
            options={options}
          />
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="text-lg font-semibold text-slate-900 bg-slate-50 border-b border-slate-200">
          Order Details
        </DialogTitle>

        <DialogContent dividers className="bg-white">
          {selectedOrder && (
            <div id="print-section" className="space-y-6">
              {/* Order & Payment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                    Order Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-slate-600">Order ID</p>
                      <p className="font-medium text-slate-900">
                        {selectedOrder.orderId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Transaction ID</p>
                      <p className="font-mono text-slate-700">
                        {selectedOrder.transactionId || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Order Date</p>
                      <p className="text-slate-900">
                        {selectedOrder.createdAt
                          ? new Date(selectedOrder.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }
                          )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                    Payment Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-slate-600">Total Amount</p>
                      <p className="text-2xl font-semibold text-slate-900">
                        ₹{(selectedOrder.totalAmount || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <div>
                        <p className="text-slate-600 text-xs uppercase">
                          Payment
                        </p>
                        <p
                          className={`font-medium text-sm ${selectedOrder.paymentStatus === "Paid"
                            ? "text-green-700"
                            : "text-amber-700"
                            }`}
                        >
                          {selectedOrder.paymentStatus || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 text-xs uppercase">
                          Method
                        </p>
                        <p className="font-medium text-slate-900">
                          {selectedOrder.paymentMethod || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 uppercase">Name</p>
                      <p className="font-medium text-slate-900 mt-1">
                        {selectedOrder.userInfo?.fullName || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 uppercase">Email</p>
                      <p className="text-sm text-slate-900 mt-1">
                        {selectedOrder.userInfo?.email || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 uppercase">Phone</p>
                      <p className="font-medium text-slate-900 mt-1">
                        {selectedOrder.userInfo?.phone || "—"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 uppercase">
                        Delivery Address
                      </p>
                      <div className="mt-1 text-sm text-slate-900">
                        <p>{selectedOrder.userInfo?.address?.line1 || "—"}</p>
                        <p>
                          {selectedOrder.userInfo?.address?.city || ""}{" "}
                          {selectedOrder.userInfo?.address?.state || ""}
                        </p>
                        <p>{selectedOrder.userInfo?.address?.pincode || ""}</p>
                        <p>{selectedOrder.userInfo?.address?.country || ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Table */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-4">
                  Order Items
                </h3>
                {selectedOrder.items?.length ? (
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-slate-900">
                            Product
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-slate-900">
                            Price
                          </th>
                          <th className="px-4 py-3 text-center font-semibold text-slate-900">
                            Qty
                          </th>
                          <th className="px-4 py-3 text-right font-semibold text-slate-900">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, i) => {
                          const finalPrice =
                            item.discountPrice && item.discountPrice > 0
                              ? item.discountPrice
                              : item.price || 0;

                          return (
                            <tr
                              key={i}
                              className="border-b border-slate-200 hover:bg-slate-50"
                            >
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium text-slate-900">
                                    {item.title || "Product"}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {item.category?.name || "—"}
                                  </p>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div>
                                  {item.discountPrice &&
                                    item.discountPrice > 0 ? (
                                    <>
                                      <p className="font-medium text-slate-900">
                                        ₹{item.discountPrice}
                                      </p>
                                      <p className="text-xs text-slate-500 line-through">
                                        ₹{item.price || 0}
                                      </p>
                                    </>
                                  ) : (
                                    <p className="font-medium text-slate-900">
                                      ₹{item.price || 0}
                                    </p>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center font-medium text-slate-900">
                                {item.quantity || 1}
                              </td>
                              <td className="px-4 py-3 text-right font-semibold text-slate-900">
                                ₹
                                {(finalPrice * (item.quantity || 1)).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>

                    {/* Coupon & Price Summary */}
<div className="border-t border-slate-200 pt-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Coupon Information */}
    <div>
      <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-4">
        Coupon Discount
      </h3>

      {selectedOrder.coupon?.couponId ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-xs text-slate-500 uppercase">
                Coupon Code
              </p>

              <p className="mt-1 text-lg font-bold text-green-700">
                🎟️ {selectedOrder.coupon.code}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {selectedOrder.coupon.discountType === "Percentage"
                  ? `${selectedOrder.coupon.discountValue}% OFF`
                  : `₹${selectedOrder.coupon.discountValue} OFF`}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase">
                Discount
              </p>

              <p className="mt-1 text-xl font-bold text-green-600">
                -₹
                {Number(
                  selectedOrder.coupon.discountAmount || 0
                ).toLocaleString("en-IN")}
              </p>
            </div>

          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No coupon applied
          </p>
        </div>
      )}
    </div>

    {/* Price Summary */}
    <div>
      <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide mb-4">
        Price Summary
      </h3>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">

        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">
            Subtotal
          </span>

          <span className="font-medium text-slate-900">
            ₹
            {Number(
              selectedOrder.subtotal || 0
            ).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Coupon */}
        {Number(selectedOrder.coupon?.discountAmount || 0) > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-green-600">
              Coupon Discount
            </span>

            <span className="font-semibold text-green-600">
              -₹
              {Number(
                selectedOrder.coupon?.discountAmount
              ).toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-slate-200 pt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-900">
              Total Amount
            </span>

            <span className="text-2xl font-bold text-slate-900">
              ₹
              {Number(
                selectedOrder.totalAmount || 0
              ).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
                  </div>
                ) : (
                  <p className="text-slate-600">No items found</p>
                )}
              </div>
            </div>
          )}



          
        </DialogContent>

        <DialogActions className="bg-slate-50 border-t border-slate-200 px-6 py-4">
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              color: "#6B7280",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          >
            Close
          </Button>
          <Button
            onClick={handlePrint}
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              textTransform: "none",
              backgroundColor: "#1F2937",
              color: "white",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#111827",
              },
            }}
          >
            Print Order
          </Button>
        </DialogActions>
      </Dialog>




      
    </div>
  );
}