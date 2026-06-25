

import MUIDataTable from "mui-datatables";
import { toast } from "sonner";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import {
  Clock3,
  CheckCircle2,
  PackageCheck,
  Truck,
  XCircle,
  ClipboardList,
  BadgeCheck,
  Package,
  RotateCcw,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {

  useUpdateOrderStatusMutation,
  useGetMyOrdersQuery
} from "../api/orderApi";


type OrderItem = {
  productId?: string;
  title?: string;
  price?: number;
  discountPrice?: number;
  quantity?: number;
  image?: string;
  category?: string;
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
  orderId?: string;
  transactionId?: string;
  // category: string;
  orderStatus: string;
  paymentStatus: string;
  totalAmount?: number;
  createdAt?: string;
  updatedAt?: string;
  deliveredAt?: string;
  paymentMethod?: string;
  userInfo?: UserInfo;
  items?: OrderItem[];
};



const orderStatusOptions = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];



export default function OrderList() {



  const { data, isLoading, isError, refetch } = useGetMyOrdersQuery(undefined, {
    pollingInterval: 5000, // har 5 sec me refresh
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const [updateOrderStatus, { isLoading: isUpdating }] =  useUpdateOrderStatusMutation();
  

  const orders: Order[] = Array.isArray(data) ? data : [];


  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
 
  const prevOrderCountRef = useRef(0);

 
 

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

     

      toast.success("New Order Received", {
        description: `${newOrdersCount} new order${newOrdersCount > 1 ? "s" : ""
          } arrived`,
      });
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
                font-family: Arial, sans-serif;
                padding: 20px;
                line-height: 1.8;
                color: #111;
              }
              h2, h3 {
                margin-bottom: 10px;
              }
              p {
                margin: 6px 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background: #f5f5f5;
              }
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

  const getOrderStatusStyle = (value: string) => {
    switch (value) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Confirmed":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-purple-100 text-purple-700";
      case "Shipped":
        return "bg-indigo-100 text-indigo-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
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
    const loadingToast = toast.loading("Updating order...");

    try {
      let newPaymentStatus: string | undefined;

      if (newStatus === "Delivered") {
        newPaymentStatus = "Paid";
      }

      const result = await updateOrderStatus({
        id: orderId,
        orderStatus: newStatus,
        paymentStatus: newPaymentStatus,
      }).unwrap();

      toast.success("Order Updated", {
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

      console.log("UPDATE SUCCESS:", result);
    } catch (error) {
      console.error("Status update failed:", error);
      toast.error("Update Failed", {
        id: loadingToast,
      });
    }
  };

  const columns = [
    {
      name: "orderId",
      label: "Order ID",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return order?.orderId || order?._id || "N/A";
        },
      },
    },
    {
      name: "transactionId",
      label: "Transaction ID",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return order?.transactionId || "N/A";
        },
      },
    },
    {
      name: "customer",
      label: "Customer",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return order?.userInfo?.fullName || "N/A";
        },
      },
    },
     {
      name: "Product",
      label: "Product",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
         return order?.items?.[0]?.category || "N/A";
        },
      },
    },
    {
      name: "createdAt",
      label: "Order Date",
      options: {
        customBodyRender: (value: string) =>
          value
            ? new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            : "N/A",
      },
    },
    {
      name: "totalAmount",
      label: "Total",
      options: {
        customBodyRender: (value: number) => `₹${value || 0}`,
      },
    },
    {
      name: "paymentMethod",
      label: "Method",
      options: {
        customBodyRender: (value: string) => value || "N/A",
      },
    },
    {
      name: "paymentStatus",
      label: "Payment",
      options: {
        customBodyRender: (value: string) => {
          const style =
            value === "Paid"
              ? "bg-green-100 text-green-700"
              : value === "Failed"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700";

          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${style}`}
            >
              {value}
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

          return (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-[180px]">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusStyle(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>

              <select
                value={order.orderStatus}
                disabled={isUpdating}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
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
      label: "View",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const order = orders[dataIndex];
          return (
            <Button
              variant="contained"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => handleOpen(order)}
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
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={28} className="text-purple-600" />
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading OrderBook...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="ml-64 p-4 text-red-500">Error loading orders</p>;
  }

  const StatCard = ({
    title,
    value,
    icon,
    iconBg,
    lineColor,
    badge,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    iconBg: string;
    lineColor: string;
    badge?: string;
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 min-h-[150px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-3">{value}</h3>
          {badge && (
            <div className="mt-4 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {badge}
            </div>
          )}
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md ${iconBg}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-6 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${lineColor} w-3/4`} />
      </div>
    </div>
  );

  return (
    <div className=" min-h-screen  p-4">

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7 gap-4 mb-6 p-6">
        <StatCard
          title="Total Orders"
          value={stats.total}
          icon={<ClipboardList size={28} />}
          iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
          lineColor="bg-violet-500"
          badge="All Orders"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<Clock3 size={28} />}
          iconBg="bg-gradient-to-br from-yellow-400 to-orange-500"
          lineColor="bg-yellow-500"
          badge="Need Action"
        />

        <StatCard
          title="Confirmed"
          value={stats.confirmed}
          icon={<BadgeCheck size={28} />}
          iconBg="bg-gradient-to-br from-blue-500 to-cyan-500"
          lineColor="bg-blue-500"
          badge="Approved"
        />

        <StatCard
          title="Processing"
          value={stats.processing}
          icon={<PackageCheck size={28} />}
          iconBg="bg-gradient-to-br from-purple-500 to-fuchsia-500"
          lineColor="bg-purple-500"
          badge="In Progress"
        />

        <StatCard
          title="Shipped"
          value={stats.shipped}
          icon={<Truck size={28} />}
          iconBg="bg-gradient-to-br from-indigo-500 to-blue-500"
          lineColor="bg-indigo-500"
          badge="On The Way"
        />

        <StatCard
          title="Delivered"
          value={stats.delivered}
          icon={<CheckCircle2 size={28} />}
          iconBg="bg-gradient-to-br from-green-500 to-emerald-500"
          lineColor="bg-green-500"
          badge="Completed"
        />

        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={<XCircle size={28} />}
          iconBg="bg-gradient-to-br from-red-500 to-rose-500"
          lineColor="bg-red-500"
          badge="Stopped"
        />
        <StatCard
          title="Retuned "
          value={stats.returned}
          icon={<RotateCcw size={28} />}
          iconBg="bg-gradient-to-br from-yellow-400 to-amber-500"
          lineColor="bg-amber-500"
          badge="Retun"
        />
      </div>

      {/* Table */}
      
      <div className="w-full  max-w-full bg-white rounded-xl shadow p-6 sm:p-4 overflow-hidden">
        <MUIDataTable
          title={"Order Management"}
          data={orders}
          columns={columns}
          options={options}
        />
      </div>

      {/* Order Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>

        <DialogContent dividers>
          {selectedOrder && (
            <div id="print-section" className="space-y-2 text-sm leading-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p>
                    <b>Order ID:</b> {selectedOrder.orderId || "N/A"}
                  </p>
                  <p>
                    <b>Transaction ID:</b> {selectedOrder.transactionId || "N/A"}
                  </p>
                  <p>
                    <b>Total:</b> ₹{selectedOrder.totalAmount || 0}
                  </p>
                  <p>
                    <b>Payment Method:</b> {selectedOrder.paymentMethod || "N/A"}
                  </p>
                  <p>
                    <b>Payment Status:</b> {selectedOrder.paymentStatus || "N/A"}
                  </p>
                  <p>
                    <b>Order Status:</b> {selectedOrder.orderStatus || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p>
                    <b>Customer:</b> {selectedOrder.userInfo?.fullName || "N/A"}
                  </p>
                  <p>
                    <b>Email:</b> {selectedOrder.userInfo?.email || "N/A"}
                  </p>
                  <p>
                    <b>Phone:</b> {selectedOrder.userInfo?.phone || "N/A"}
                  </p>
                  <p>
                    <b>Order Date:</b>{" "}
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
                  <p>
                    <b>Delivered Date:</b>{" "}
                    {selectedOrder.deliveredAt
                      ? new Date(selectedOrder.deliveredAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )
                      : selectedOrder.orderStatus === "Delivered" &&
                        selectedOrder.updatedAt
                        ? new Date(selectedOrder.updatedAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )
                        : "Not Delivered Yet"}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="font-bold">Address</h3>
                <p>{selectedOrder.userInfo?.address?.line1 || "N/A"}</p>
                <p>
                  {selectedOrder.userInfo?.address?.city || ""}{" "}
                  {selectedOrder.userInfo?.address?.state || ""}
                </p>
                <p>{selectedOrder.userInfo?.address?.pincode || ""}</p>
                <p>{selectedOrder.userInfo?.address?.country || ""}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold">Product Information</h3>

                {selectedOrder.items?.length ? (
                  <div className=" overflow-hidden border rounded-lg mt-2">
                    <table className="min-w-full text-sm">
                      <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white text-sm uppercase">
                        <tr>
                          <th className="px-5 py-3 text-left font-semibold tracking-wide">
                            Title
                          </th>
                          <th className="px-5 py-3 text-left font-semibold tracking-wide">
                            Category
                          </th>
                          <th className="px-5 py-3 text-left font-semibold tracking-wide">
                            Price
                          </th>
                          <th className="px-5 py-3 text-left font-semibold tracking-wide">
                            Discount Price
                          </th>
                          <th className="px-5 py-3 text-center font-semibold tracking-wide">
                            Quantity
                          </th>
                          <th className="px-5 py-3 text-right font-semibold tracking-wide">
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
                            <tr key={i} className="border-t border-gray-200">
                              <td className="px-4 py-3">
                                {item.title || "Product"}
                              </td>
                              <td className="px-4 py-3">
                                {item.category || "N/A"}
                              </td>
                              <td className="px-4 py-3">₹{item.price || 0}</td>
                              <td className="px-4 py-3">
                                ₹{item.discountPrice || 0}
                              </td>
                              <td className="px-4 py-3 text-center">
                                {item.quantity || 1}
                              </td>
                              <td className="px-4 py-3 text-right font-semibold">
                                ₹{finalPrice * (item.quantity || 1)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No items</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Close
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}