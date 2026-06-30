
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell,
//     Legend,
//     BarChart,
//     Bar,
// } from "recharts";
// type Order = {
//     _id: string;
//     orderId?: string;
//     orderStatus: string;
//     paymentStatus: string;
//     totalAmount?: number;
//     createdAt?: string;
// };


// import {
//     Package,
// } from "lucide-react";

// // type GetMyOrdersResponse = {
// //     success?: boolean;
// //     orders: Order[];
// // };


// import {
//     useGetMyOrdersQuery
// } from "../api/orderApi";

// const STATUS_COLORS: Record<string, string> = {
//     Pending: "#facc15",     // yellow
//     Confirmed: "#3b82f6",   // blue
//     Processing: "#8b5cf6",  // purple
//     Shipped: "#6366f1",     // indigo
//     Delivered: "#22c55e",   // green
//     Cancelled: "#ef4444",   // red
// };
// const PAYMENT_STATUS_COLORS: Record<string, string> = {
//     Paid: "#22c55e",      // green
//     Pending: "#facc15",   // yellow
//     Failed: "#ef4444",    // red
// };



// export default function Dashboard() {



//     const { data, isLoading, isError } = useGetMyOrdersQuery()

//     console.log("FULL RESULT:", data);
//     console.log("DATA:", data);
//     console.log("ERROR:", data);
//     console.log("STATUS:", data);


//     const orders: Order[] = Array.isArray(data) ? data : [];



//     console.log('RAW DATA:', data); // 👈 ye console me dekho
//     console.log(orders)


//     const revenueDataMap: Record<string, number> = {};
//     const orderStatusMap: Record<string, number> = {};
//     const paymentStatusMap: Record<string, number> = {};

//     orders.forEach((order: Order) => {
//         const date = order?.createdAt
//             ? new Date(order.createdAt).toLocaleDateString("en-IN", {
//                 day: "2-digit",
//                 month: "short",
//             })
//             : "N/A";

//         revenueDataMap[date] = (revenueDataMap[date] || 0) + (order.totalAmount || 0);
//         orderStatusMap[order.orderStatus] = (orderStatusMap[order.orderStatus] || 0) + 1;
//         paymentStatusMap[order.paymentStatus] = (paymentStatusMap[order.paymentStatus] || 0) + 1;
//     });

//     const revenueData = Object.keys(revenueDataMap).map((date) => ({
//         date,
//         revenue: revenueDataMap[date],
//     }));

//     const orderStatusData = Object.keys(orderStatusMap).map((status) => ({
//         name: status,
//         value: orderStatusMap[status],
//     }));

//     const paymentStatusData = Object.keys(paymentStatusMap).map((status) => ({
//         name: status,
//         count: paymentStatusMap[status],
//     }));

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="relative">
//                         <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <Package size={28} className="text-purple-600" />
//                         </div>
//                     </div>
//                     <p className="mt-6 text-gray-600 font-medium">Loading Deshboard...</p>
//                     <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
//                 </div>
//             </div>
//         );
//     }

//     if (isError) {
//         return <div className="p-6 ml-64 text-red-500">Failed to load charts</div>;
//     }

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl font-bold mb-6">Order Dashboard</h1>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Revenue Chart */}
//                 <div className="bg-white rounded-2xl shadow p-5">
//                     <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={revenueData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Line type="monotone" dataKey="revenue" strokeWidth={3} />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Order Status Pie Chart */}
//                 <div className="bg-white rounded-2xl shadow p-5">
//                     <h2 className="text-lg font-semibold mb-4">Order Status</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                             <Pie
//                                 data={orderStatusData}
//                                 cx="50%"
//                                 cy="50%"
//                                 outerRadius={100}
//                                 dataKey="value"
//                                 label
//                             >
//                                 {orderStatusData.map((entry: any, index: number) => (
//                                     //   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     <Cell
//                                         key={`cell-${index}`}
//                                         fill={STATUS_COLORS[entry.name] || "#9ca3af"} // fallback gray
//                                     />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Payment Status Bar Chart */}
//                 <div className="bg-white rounded-2xl shadow p-5 lg:col-span-2">
//                     <h2 className="text-lg font-semibold mb-4">Payment Status</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <BarChart data={paymentStatusData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="count">
//                                 {paymentStatusData.map((entry: any, index: number) => (
//                                     // <Cell
//                                     //     key={`cell-${index}`}
//                                     //     fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]}
//                                     // />
//                                     <Cell
//                                         key={`cell-${index}`}
//                                         fill={PAYMENT_STATUS_COLORS[entry.name] || "#9ca3af"}
//                                     />
//                                 ))}
//                             </Bar>
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }






import {
    ResponsiveContainer,

    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,

    AreaChart,
    Area,
} from "recharts";

import {

    DollarSign,
    ShoppingBag,
    Users,
    Package,
    Store,

    ChevronDown,
    Calendar,
    MoreHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../api/orderApi";
import { useGetAllCustomersQuery } from "../api/customerApi";
import { useGetProductsQuery, } from "../api/product";
import React from "react";



type OrderItem = {
    title: string;
    price: number;
    qty?: number;
};

type Order = {
    _id: string;
    orderId?: string;
    orderStatus: string;
    paymentStatus: string;
    totalAmount?: number;
    createdAt?: string;
    customerName?: string;
    items?: OrderItem[];
};

const STATUS_COLORS: Record<string, string> = {
    Pending: "#facc15",
    Confirmed: "#3b82f6",
    Processing: "#8b5cf6",
    Shipped: "#60a5fa",
    Delivered: "#22c55e",
    Cancelled: "#f87171",
};

const STATUS_BADGE_STYLES: Record<string, string> = {
    Pending: "bg-yellow-50 text-yellow-700",
    Confirmed: "bg-blue-50 text-blue-700",
    Processing: "bg-violet-50 text-violet-700",
    Shipped: "bg-amber-50 text-amber-700",
    Delivered: "bg-green-50 text-green-700",
    Cancelled: "bg-red-50 text-red-700",
};

// Mini sparkline data (static for visual; replace with real data if needed)
const sparkData = {
    revenue: [12, 15, 11, 18, 22, 19, 25, 30, 27, 35],
    orders: [120, 160, 140, 200, 240, 210, 270, 320, 300, 380],
    customers: [1800, 2000, 1900, 2100, 2200, 2150, 2300, 2280, 2340, 2345],
    products: [900, 880, 870, 865, 860, 858, 856, 855, 857, 856],
    vendors: [110, 112, 115, 118, 120, 121, 122, 123, 124, 125],
};

export default function Dashboard() {
    const navigate = useNavigate()
    const Api = import.meta.env.VITE_API_URL as string;

    const [range, setRange] = React.useState<"month" | "lastMonth" | "year">("month");


    const { data: products, } = useGetProductsQuery()
    const { data: customers, } = useGetAllCustomersQuery();
    const { data, isLoading, isError } = useGetMyOrdersQuery();

    const orders: Order[] = Array.isArray(data) ? data : [];


    const filterOrdersByRange = (orders: any[]) => {
        const now = new Date();

        return orders.filter((order) => {
            const date = new Date(order.createdAt);

            if (range === "month") {
                return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                );
            }

            if (range === "lastMonth") {
                const lastMonth = new Date();
                lastMonth.setMonth(now.getMonth() - 1);

                return (
                    date.getMonth() === lastMonth.getMonth() &&
                    date.getFullYear() === lastMonth.getFullYear()
                );
            }

            if (range === "year") {
                return date.getFullYear() === now.getFullYear();
            }

            return true;
        });
    };



    const deliveredOrders = filterOrdersByRange(orders).filter(
        (order: any) => order.orderStatus === "Delivered"
    );


    const revenueMap: Record<string, number> = {};
    const orderCountMap: Record<string, number> = {};

    deliveredOrders.forEach((order) => {
        const date = order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            })
            : "Unknown";


        orderCountMap[date] = (orderCountMap[date] || 0) + 1;
        if (order.orderStatus === "Delivered") {
            revenueMap[date] =
                (revenueMap[date] || 0) + (order.totalAmount || 0);
        }
    });



    const salesChartData = Object.keys(orderCountMap).map((date) => ({
        date,
        revenue: revenueMap[date] || 0,
        orders: orderCountMap[date] || 0,
    }));




    const TotalCustomer = customers?.length
    const TotalProducts = products?.length
    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalOrders = orders.length;
    // const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered").length;
    // const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
    // const cancelledOrders = orders.filter((o) => o.orderStatus === "Cancelled").length;

    // Order status donut data
    const orderStatusMap: Record<string, number> = {};
    orders.forEach((o) => {
        orderStatusMap[o.orderStatus] = (orderStatusMap[o.orderStatus] || 0) + 1;
    });
    const orderStatusData = Object.keys(orderStatusMap).map((status) => ({
        name: status,
        value: orderStatusMap[status],
    }));

    // Fallback static donut if no API data
    const donutData =
        orderStatusData.length > 0
            ? orderStatusData
            : [
                { name: "Delivered", value: 568 },
                { name: "Processing", value: 320 },
                { name: "Shipped", value: 280 },
                { name: "Pending", value: 155 },
                { name: "Cancelled", value: 135 },
            ];

    const totalDonut = donutData.reduce((s, d) => s + d.value, 0);




    const productMap: Record<string, {
        name: string;
        sales: number;
        revenue: number;
        image?: string
    }> = {};




    orders.forEach((order) => {
        order.items?.forEach((item: any) => {
            const name = item.title || "Unknown Product";

            if (!productMap[name]) {
                productMap[name] = {
                    name,
                    sales: 0,
                    revenue: 0,
                    image: item.image || "",
                };
            }

            productMap[name].sales += item.qty || 1;
            productMap[name].revenue += (item.price || 0) * (item.qty || 1);
        });
    });



    const topProducts = Object.values(productMap)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);




    const today = new Date();

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);


    const formatDate = (date: Date) =>
        date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });


    const handleOrderBook = () => {
        navigate("/dashboard/order-list")

    }


    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500">
                Loading Dashboard...
            </div>
        );


    if (isError)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-6xl mb-4">📡</div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                        No Internet Connection
                    </h2>

                    <p className="text-slate-500 mb-6">
                        Please check your network and try again.
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );


    return (
        <div className="min-h-screen  font-sans">

            <div className="p-6 space-y-5">
                {/* ── Date Range ── */}
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        <Calendar size={14} className="text-slate-400" />
                        {`${formatDate(startOfMonth)} – ${formatDate(today)}`}
                        <ChevronDown size={13} className="text-slate-400" />
                    </button>
                </div>

                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-5 gap-4">
                    <StatCard
                        icon={<DollarSign size={18} />}
                        iconBg="bg-indigo-50"
                        iconColor="text-indigo-500"
                        label="Total Revenue"
                        value={`₹${totalRevenue > 0 ? totalRevenue.toLocaleString() : "24,780.50"}`}
                        change="+18.7%"
                        positive
                        sparkData={sparkData.revenue}
                        sparkColor="#6366f1"
                    />
                    <StatCard
                        icon={<ShoppingBag size={18} />}
                        iconBg="bg-pink-50"
                        iconColor="text-pink-500"
                        label="Total Orders"
                        value={totalOrders > 0 ? totalOrders.toLocaleString() : "1,458"}
                        change="+12.4%"
                        positive
                        sparkData={sparkData.orders}
                        sparkColor="#ec4899"
                    />
                    <StatCard
                        icon={<Users size={18} />}
                        iconBg="bg-green-50"
                        iconColor="text-green-500"
                        label="Total Customers"
                        value={String(TotalCustomer)}
                        change="+16.2%"
                        positive
                        sparkData={sparkData.customers}
                        sparkColor="#22c55e"
                    />
                    <StatCard
                        icon={<Package size={18} />}
                        iconBg="bg-orange-50"
                        iconColor="text-orange-500"
                        label="Total Products"
                        value={String(TotalProducts)}
                        change="-3.6%"
                        positive={false}
                        sparkData={sparkData.products}
                        sparkColor="#f97316"
                    />
                    <StatCard
                        icon={<Store size={18} />}
                        iconBg="bg-purple-50"
                        iconColor="text-purple-500"
                        label="Total Vendors"
                        value="125"
                        change="+8.4%"
                        positive
                        sparkData={sparkData.vendors}
                        sparkColor="#a855f7"
                    />
                </div>

                {/* ── Sales Overview + Top Products ── */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Sales Chart */}
                    <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-[15px] font-semibold text-slate-800">Sales Overview</h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
                                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                                        Revenue
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                                        Orders
                                    </span>
                                </div>
                            </div>
                            <select className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
                                value={range}
                                onChange={(e) => setRange(e.target.value as any)}
                            >
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>This Year</option>
                            </select>
                        </div>

                        <ResponsiveContainer width="100%" height={240}>
                            <AreaChart data={salesChartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.12} />
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    yAxisId="left"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `₹${v / 1000}K`}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 10,
                                        border: "1px solid #e2e8f0",
                                        fontSize: 12,
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    }}

                                    formatter={(val, name) => {
                                        const value = typeof val === "number" ? val : 0;

                                        return name === "revenue"
                                            ? [`₹${value.toLocaleString()}`, "Revenue"]
                                            : [value, "Orders"];
                                    }}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#6366f1"
                                    strokeWidth={2.5}
                                    fill="url(#revGrad)"
                                    dot={false}
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#60a5fa"
                                    strokeWidth={2.5}
                                    fill="url(#ordGrad)"
                                    dot={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[15px] font-semibold text-slate-800">Top Selling Products</h2>
                            <button className="text-[12px] text-indigo-500 font-medium hover:underline">
                                View all
                            </button>
                        </div>
                        <div className="space-y-4">
                            {topProducts.map((p, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400 w-4 shrink-0">{i + 1}</span>
                                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-base shrink-0">

                                        {p.image?.[0] ? (
                                            <img
                                                src={`${Api}/api/image/${p.image}`}
                                                alt={p.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Package size={16} className="text-slate-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[13px] font-medium text-slate-700 truncate">{p.name}</p>
                                        <p className="text-[11px] text-slate-400">₹{p.revenue.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[12px] text-green-500 font-medium"> {p.sales} sold</p>
                                        <p className="text-[11px] text-slate-400">{p.sales}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Recent Orders + Donut ── */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Recent Orders */}
                    <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[15px] font-semibold text-slate-800">Recent Orders</h2>
                            <button className="text-[12px] text-indigo-500 font-medium hover:underline"
                                onClick={handleOrderBook}>
                                View all
                            </button>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-[12px] text-slate-400 border-b border-slate-100">
                                    <th className="text-left pb-3 font-medium">Order ID</th>
                                    <th className="text-left pb-3 font-medium">Customer</th>
                                    <th className="text-left pb-3 font-medium">Date</th>
                                    <th className="text-left pb-3 font-medium">Amount</th>
                                    <th className="text-left pb-3 font-medium">Status</th>
                                    <th className="pb-3" />
                                </tr>
                            </thead>
                            <tbody>

                                {orders.slice(0, 5).map((order: any) => (
                                    <tr key={order._id} className="border-b border-slate-50 last:border-0">
                                        <td className="py-3.5 text-indigo-600 font-medium text-[13px]">
                                            {order.orderId || order._id}
                                        </td>
                                        <td className="py-3.5 text-slate-700 text-[13px]">
                                            {order?.userInfo?.fullName}
                                        </td>
                                        <td className="py-3.5 text-slate-400 text-[12px]">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : "—"}
                                        </td>
                                        <td className="py-3.5 text-slate-700 text-[13px]">
                                            ₹{(order.totalAmount || 0).toLocaleString()}
                                        </td>
                                        <td className="py-3.5">
                                            <span
                                                className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${STATUS_BADGE_STYLES[order.orderStatus] || "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="py-3.5 text-slate-300">
                                            <MoreHorizontal size={15} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Orders by Status Donut */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                        <h2 className="text-[15px] font-semibold text-slate-800 mb-4">Orders by Status</h2>
                        <div className="relative flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={donutData}
                                        dataKey="value"
                                        innerRadius={55}
                                        outerRadius={85}
                                        startAngle={90}
                                        endAngle={-270}
                                        paddingAngle={2}
                                        strokeWidth={0}
                                    >
                                        {donutData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={STATUS_COLORS[entry.name] || "#cbd5e1"}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 8,
                                            border: "1px solid #e2e8f0",
                                            fontSize: 12,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center label */}
                            <div className="absolute text-center pointer-events-none">
                                <p className="text-xl font-semibold text-slate-800">
                                    {totalDonut.toLocaleString()}
                                </p>
                                <p className="text-[10px] text-slate-400">Total Orders</p>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-3 space-y-2.5">
                            {donutData.map((d, i) => (
                                <div key={i} className="flex items-center justify-between text-[12px]">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ background: STATUS_COLORS[d.name] || "#cbd5e1" }}
                                        />
                                        <span className="text-slate-500">{d.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-700">{d.value}</span>
                                        <span className="text-slate-400">
                                            {((d.value / totalDonut) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Stat Card Component ──
function StatCard({
    icon,
    iconBg,
    iconColor,
    label,
    value,
    change,
    positive,
    sparkData,
    sparkColor,
}: {
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    label: string;
    value: string | number;
    change: string;
    positive: boolean;
    sparkData: number[];
    sparkColor: string;
}) {
    const spark = sparkData.map((v, i) => ({ v, i }));
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <div className={`w-9 h-9 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center mb-3`}>
                {icon}
            </div>
            <p className="text-[12px] text-slate-400 mb-1">{label}</p>
            <p className="text-[22px] font-semibold text-slate-800 leading-tight">{value}</p>
            <p className={`text-[11px] mt-1 ${positive ? "text-green-500" : "text-red-500"}`}>
                {positive ? "↑" : "↓"} {change} vs last 30 days
            </p>
            <div className="mt-2 -mx-1">
                <ResponsiveContainer width="100%" height={40}>
                    <AreaChart data={spark} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                        <defs>
                            <linearGradient id={`sg${sparkColor.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={sparkColor} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={sparkColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="v"
                            stroke={sparkColor}
                            strokeWidth={1.5}
                            fill={`url(#sg${sparkColor.replace("#", "")})`}
                            dot={false}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}





