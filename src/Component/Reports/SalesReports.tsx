import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"
import {
    Calendar,
    ChevronDown,
    DollarSign,
    ShoppingBag,
    Users,
    Wallet,
    MoreHorizontal
} from "lucide-react";

import {
    ResponsiveContainer,
    Area,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportExcel from "../ExcelDownload/ExportExcel";
import { useGetMyOrdersQuery } from "../../api/orderApi";

import OrderModal from "../../Component/CustomerInfo/OrderModal";

type UserInfo = {
    fullName: string;
    email: string;
    phone: string;
};



type OrderItem = {
    productId: string;
    title: string;
    price: number;
    discountPrice: number;
    quantity: number;
    image: string;
    category: string;
}
type Order = {
    _id: string;
    userId: string;
    orderId?: string;
    orderStatus: string;
    quantity: string;
    paymentStatus: string;
    paymentMethod: string;
    totalAmount?: number;
    createdAt: string;
    customerName?: string;
    items?: OrderItem[];
    userInfo?: UserInfo;

};

const tabs = ["Day", "Week", "Month", "Year"];

export default function SalesReport() {
    const navigate = useNavigate()
 const Api = import.meta.env.VITE_API_URL as string;
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [useCustomDate, setUseCustomDate] = useState(false);

    const [activeTab, setActiveTab] = useState("Week");

    ;

    const [chartType, setChartType] = useState<"orders" | "sales" | "revenue" | "customers">("orders");

    const { data, } = useGetMyOrdersQuery();

    const orders: Order[] = Array.isArray(data) ? data : [];



    const chartMap: Record<
        string,
        {
            orders: number;
            sales: number;
            revenue: number;
            customers: Set<string>;
        }
    > = {};


    const filteredOrders = useMemo(() => {
        const now = new Date();

        return orders.filter((order) => {
            const date = new Date(order.createdAt);

            if (useCustomDate && startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);

                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);

                return date >= start && date <= end;
            }




            switch (activeTab) {
                case "Day":
                    return (
                        date.getDate() === now.getDate() &&
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                    );

                case "Week": {
                    const start = new Date(now);
                    start.setDate(now.getDate() - 6);
                    start.setHours(0, 0, 0, 0);

                    return date >= start && date <= now;
                }

                case "Month":
                    return (
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                    );

                case "Year":
                    return date.getFullYear() === now.getFullYear();

                default:
                    return true;
            }
        });
    }, [orders, activeTab, startDate, endDate]);

    const previousOrders = useMemo(() => {
        const now = new Date();

        return orders.filter((order) => {
            const date = new Date(order.createdAt);

            switch (activeTab) {
                case "Day": {
                    const yesterday = new Date(now);
                    yesterday.setDate(now.getDate() - 1);

                    return (
                        date.getDate() === yesterday.getDate() &&
                        date.getMonth() === yesterday.getMonth() &&
                        date.getFullYear() === yesterday.getFullYear()
                    );
                }

                case "Week": {
                    const startPrev = new Date(now);
                    startPrev.setDate(now.getDate() - 13);
                    startPrev.setHours(0, 0, 0, 0);

                    const endPrev = new Date(now);
                    endPrev.setDate(now.getDate() - 7);
                    endPrev.setHours(23, 59, 59, 999);

                    return date >= startPrev && date <= endPrev;
                }

                case "Month":
                    return (
                        date.getMonth() === now.getMonth() - 1 &&
                        date.getFullYear() === now.getFullYear()
                    );

                case "Year":
                    return date.getFullYear() === now.getFullYear() - 1;

                default:
                    return false;
            }
        });
    }, [orders, activeTab]);


    filteredOrders.forEach((order) => {
        const date = order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            })
            : "Unknown";


        if (!chartMap[date]) {
            chartMap[date] = {
                orders: 0,
                sales: 0,
                revenue: 0,
                customers: new Set(),
            };
        }


        // Total Orders (all orders)
        chartMap[date].orders += 1;

        // Unique Customers (all orders)
        if (order.userId) {
            chartMap[date].customers.add(order.userId);
        }

        // Sales & Revenue (only delivered orders)
        if (order.orderStatus === "Delivered") {
            chartMap[date].sales += Number(order.quantity) || 1;
            chartMap[date].revenue += order.totalAmount || 0;
        }

    });



    const totalSales = filteredOrders.filter(
        (o) => o.orderStatus === "Delivered"
    ).length;


    const previousSales = previousOrders.filter(
        (o) => o.orderStatus === "Delivered"
    ).length;

    const previousRevenue = previousOrders
        .filter((o) => o.orderStatus === "Delivered")
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const previousCustomers = new Set(
        previousOrders.map((o) => o.userId)
    ).size;

    const previousTotalOrders = previousOrders.length;



    const getPercentageChange = (current: number, previous: number) => {
        if (previous === 0) {
            return {
                change: "0%",
                positive: true,
            };
        }

        const percent = ((current - previous) / previous) * 100;

        return {
            change: `${percent > 0 ? "+" : ""}${percent.toFixed(1)}%`,
            positive: percent >= 0,
        };
    };





    const totalOrders = filteredOrders.length;

    const totalRevenue = filteredOrders
        .filter((o) => o.orderStatus === "Delivered")
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const totalCustomers = new Set(
        filteredOrders.map((o) => o.userId)
    ).size;




    const salesChartData = Object.keys(chartMap).map((date) => ({
        date,
        orders: chartMap[date].orders,
        sales: chartMap[date].sales,
        revenue: chartMap[date].revenue,
        customers: chartMap[date].customers.size,
    }));

    const paymentData = [
        {
            name: "Credit Card",
            value: filteredOrders.filter(
                (o) => o.paymentMethod === "Credit Card"
            ).length,
        },
        {
            name: "UPI",
            value: filteredOrders.filter(
                (o) => o.paymentMethod === "UPI"
            ).length,
        },
        {
            name: "PayPal",
            value: filteredOrders.filter(
                (o) => o.paymentMethod === "PayPal"
            ).length,
        },
        {
            name: "Cash on Delivery",
            value: filteredOrders.filter(
                (o) => o.paymentMethod === "COD"
            ).length,
        },
        {
            name: "ONLINE",
            value: filteredOrders.filter(
                (o) => o.paymentMethod === "ONLINE"
            ).length,
        },
    ];

    const totalPayments = paymentData.reduce(
        (sum, item) => sum + item.value,
        0
    );


    const salesChange = getPercentageChange(totalSales, previousSales);

    const revenueChange = getPercentageChange(
        totalRevenue,
        previousRevenue
    );

    const customerChange = getPercentageChange(
        totalCustomers,
        previousCustomers
    );

    const orderChange = getPercentageChange(
        totalOrders,
        previousTotalOrders
    );



    const excelData = filteredOrders.map((order) => ({

        Order_ID: order.orderId ?? order._id,
        Customer: order.userInfo?.fullName ?? "N/A",
        Email: order.userInfo?.email ?? "N/A",
        Phone: order.userInfo?.phone ?? "N/A",

        Product: order.items?.[0]?.title ?? "N/A",
        Category: order.items?.[0]?.category ?? "N/A",
        Price: order.items?.[0]?.price ?? 0,
        Discount_Price: order.items?.[0]?.discountPrice ?? 0,
        Quantity: order.items?.[0]?.quantity ?? 0,


        Status: order.orderStatus,
        Payment_Status: order.paymentStatus,
        Payment_Method: order.paymentMethod,


        Total: order.totalAmount ?? 0,
        Date: new Date(order.createdAt).toLocaleDateString("en-IN"),
    }));



const deliveredOrders = filteredOrders.filter(
  (order) => order.orderStatus === "Delivered"
);


    const ITEMS_PER_PAGE = 10;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )





    const handleOrderBook = () => {
        navigate("/dashboard/order-list")

    }


  const handleModal = (order: any) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };



    const COLORS = [
        "#2563EB",
        "#22C55E",
        "#F97316",
        "#8B5CF6",
    ];


    const sparkData = {
        revenue: [12, 15, 11, 18, 22, 19, 25, 30, 27, 35],
        orders: [120, 160, 140, 200, 240, 210, 270, 320, 300, 380],
        customers: [1800, 2000, 1900, 2100, 2200, 2150, 2300, 2280, 2340, 2345],
        products: [900, 880, 870, 865, 860, 858, 856, 855, 857, 856],
        vendors: [110, 112, 115, 118, 120, 121, 122, 123, 124, 125],
    };



    const STATUS_BADGE_STYLES: Record<string, string> = {
        Pending: "bg-yellow-50 text-yellow-700",
        Confirmed: "bg-blue-50 text-blue-700",
        Processing: "bg-violet-50 text-violet-700",
        Shipped: "bg-amber-50 text-amber-700",
        Delivered: "bg-green-50 text-green-700",
        Cancelled: "bg-red-50 text-red-700",
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Sales Reports
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Overview of your sales performance
                    </p>
                </div>

                <div className="relative mt-4 md:mt-0">
                    <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="flex items-center gap-2  bg-white rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50"
                    >
                        <Calendar size={18} />

                        <span>
                            {startDate && endDate
                                ? `${startDate.toLocaleDateString("en-IN")} - ${endDate.toLocaleDateString("en-IN")}`
                                : "Select Date Range"}
                        </span>

                        <ChevronDown size={16} />
                    </button>

                    {showCalendar && (
                        <div className="absolute  right-0 mt-2 bg-white shadow-lg rounded-lg z-50">
                            <DatePicker
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                inline
                                onChange={(dates) => {
                                    const [start, end] = dates as [Date | null, Date | null];
                                    setStartDate(start);
                                    setEndDate(end);

                                    if (start && end) {
                                        setUseCustomDate(true);
                                        setShowCalendar(false);
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

            </div>

            {/* Tabs */}
            <div className="flex gap-2  mt-2">

                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab)
                            setUseCustomDate(false);

                        }}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all
                          ${activeTab === tab
                                ? "bg-blue-600 text-white shadow"
                                : "bg-white  text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {tab}
                    </button>

                ))}

            </div>


            {/* KPI Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                <StatCard

                    icon={<ShoppingBag size={18} />}
                    iconBg="bg-pink-50"
                    iconColor="text-pink-500"
                    label="Total Orders"
                    value={totalOrders}
                    change={orderChange.change}
                    positive={orderChange.positive}
                    sparkData={sparkData.orders}
                    sparkColor="#ec4899"
                />
                <StatCard
                    icon={<DollarSign size={18} />}
                    iconBg="bg-indigo-50"
                    iconColor="text-indigo-500"
                    label="Total Sales"
                    value={`₹${totalSales}`}
                    change={salesChange.change}
                    positive={salesChange.positive}
                    sparkData={sparkData.revenue}
                    sparkColor="#6366f1"
                />
                <StatCard
                    icon={<Wallet size={18} />}
                    iconBg="bg-green-50"
                    iconColor="text-green-500"
                    label="Revenue"

                    value={totalRevenue}
                    change={revenueChange.change}
                    positive={revenueChange.positive}
                    sparkData={sparkData.customers}
                    sparkColor="#22c55e"
                />
                <StatCard
                    icon={<Users size={18} />}

                    iconBg="bg-orange-50"
                    iconColor="text-orange-500"
                    label="Total Customers"

                    value={totalCustomers}
                    change={customerChange.change}
                    positive={customerChange.positive}
                    sparkData={sparkData.products}
                    sparkColor="#f97316"
                />
                {/* <StatCard
                                    icon={<Store size={18} />}
                                    iconBg="bg-purple-50"
                                    iconColor="text-purple-500"
                                    label="Total Vendors"
                                    value="125"
                                    change="+8.4%"
                                    positive
                                    sparkData={sparkData.vendors}
                                    sparkColor="#a855f7"
                                /> */}
            </div>

            {/* Next Part */}
            <div className="mt-8">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                    {/* Sales Overview */}

                    <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-[15px] font-semibold text-slate-800">Overview</h2>

                            </div>
                            <div className=" flex  gap-2">
                                <select
                                    className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
                                    value={chartType}
                                    onChange={(e) =>
                                        setChartType(
                                            e.target.value as "orders" | "sales" | "revenue" | "customers"
                                        )
                                    }
                                >
                                    <option value="orders">Orders</option>
                                    <option value="sales">Sales</option>
                                    <option value="revenue">Revenue</option>
                                    <option value="customers">Customers</option>
                                </select>
                            </div>
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


                                    formatter={(val) => {
                                        const value = Number(val);

                                        if (chartType === "revenue") {
                                            return [`₹${value.toLocaleString()}`, "Revenue"];
                                        }

                                        return [value, chartType.charAt(0).toUpperCase() + chartType.slice(1)];
                                    }}
                                />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey={chartType}
                                    stroke="#6366f1"
                                    strokeWidth={2.5}
                                    fill="url(#revGrad)"
                                    dot={false}
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey={chartType}
                                    stroke="#60a5fa"
                                    strokeWidth={2.5}
                                    fill="url(#ordGrad)"
                                    dot={false}
                                />



                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Payment Pie Chart */}

                    <div className="bg-white rounded-2xl border border-slate-100 p-5">
                        <h2 className="text-[15px] font-semibold text-slate-800 mb-4">Sales by Payment Method</h2>
                        <div className="relative flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={paymentData}
                                        dataKey="value"
                                        innerRadius={55}
                                        outerRadius={85}
                                        startAngle={90}
                                        endAngle={-270}
                                        paddingAngle={2}
                                        strokeWidth={0}
                                    >
                                        {paymentData.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
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

                                    {totalPayments}
                                </p>
                                <p className="text-[10px] text-slate-400">Total Orders</p>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="mt-3 space-y-2.5">
                            {paymentData.map((d, i) => (
                                <div key={i} className="flex items-center justify-between text-[12px]">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full shrink-0"
                                            style={{ background: COLORS[i] || "#cbd5e1" }}
                                        />
                                        <span className="text-slate-500">{d.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-700">{d.value}</span>
                                        <span className="text-slate-400">
                                            {((d.value / totalPayments) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>


                <div className="col-span-2 bg-white rounded-2xl border border-slate-100 p-5 mt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[15px] font-semibold text-slate-800">Sales Orders</h2>
                        <div className="flex">

                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    <MoreHorizontal size={18} />
                                </button>

                                {showMenu && (
                                    <div className="absolute right-0  w-34 rounded-xl   bg-white shadow-lg p-2 z-50">
                                        <div className="mb-2  text-[12px] text-indigo-500 font-medium  cursor-pointer">
                                            <ExportExcel
                                                data={excelData}
                                                fileName="Sales_Report"
                                                sheetName="Orders"
                                                buttonText="Export Excel"
                                            />
                                        </div>

                                        <button
                                            onClick={() => {
                                                handleOrderBook();
                                                setShowMenu(false);
                                            }}
                                            className="text-[12px] text-indigo-500 font-medium hover:underline  cursor-pointer"

                                        >
                                            View all
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-[12px] text-slate-800 font-bold border-b border-slate-100">
                                <th className="text-left pb-3 font-medium">Order ID</th>
                                <th className="text-left pb-3 font-medium">Date</th>
                                <th className="text-left pb-3 font-medium">Customer</th>
                                <th className="text-left pb-3 font-medium">Payment Method</th>

                                <th className="text-left pb-3 font-medium">Price</th>
                                <th className="text-left pb-3 font-medium">Status</th>
                                <th className="pb-3" />
                            </tr>
                        </thead>
                        <tbody>

                            {paginatedOrders .filter((order: any) => order.orderStatus === "Delivered")
                            .map((order: any) => (
                                <tr key={order._id} className="border-b border-slate-50 last:border-0">
                                    <td className="py-2 text-indigo-600 font-medium text-[13px] cursor-pointer"
                                    onClick={() => handleModal(order)}
                                    >
                                        {order.orderId || order._id}
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
                                        {order?.userInfo?.fullName}
                                    </td>

                                    <td className="py-3.5 text-slate-700 text-[13px]">
                                        {(order.paymentMethod || 0).toLocaleString()}
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
                                    <td className="py-3.5 text-slate-300 cursor-pointer">
                                        <MoreHorizontal size={15} 
                                        onClick={() => handleModal(order)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className="flex items-center justify-between mt-5">
                        <p className="text-sm text-gray-500">
                            Showing{" "}
                            {filteredOrders.length === 0
                                ? 0
                                : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                            {" - "}
                            {Math.min(currentPage * ITEMS_PER_PAGE, deliveredOrders.length)}
                            {" of "}
                            {deliveredOrders.length}
                        </p>

                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"                            >
                                Previous
                            </button>

                            <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold shadow-md">
                                {currentPage}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                              
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <OrderModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                order={selectedOrder}
                apiUrl={Api}
            />

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
