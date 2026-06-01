
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar,
} from "recharts";
type Order = {
    _id: string;
    orderId?: string;
    orderStatus: string;
    paymentStatus: string;
    totalAmount?: number;
    createdAt?: string; 
};


type GetMyOrdersResponse = {
    success?: boolean;
    orders: Order[];
};
import {
useGetMyOrdersQuery
    // useGetAllOrdersQuery
    

} from "../api/orderApi";

const STATUS_COLORS: Record<string, string> = {
    Pending: "#facc15",     // yellow
    Confirmed: "#3b82f6",   // blue
    Processing: "#8b5cf6",  // purple
    Shipped: "#6366f1",     // indigo
    Delivered: "#22c55e",   // green
    Cancelled: "#ef4444",   // red
};
const PAYMENT_STATUS_COLORS: Record<string, string> = {
    Paid: "#22c55e",      // green
    Pending: "#facc15",   // yellow
    Failed: "#ef4444",    // red
};



export default function Dashboard() {



        const { data , isLoading, isError } = useGetMyOrdersQuery() 
    //     as {
    //     data?: GetMyOrdersResponse;
    //     isLoading: boolean;
    //     isError: boolean;
    // };





    console.log("FULL RESULT:", data);
console.log("DATA:", data);
console.log("ERROR:", data);
console.log("STATUS:", data);


const orders: Order[] = Array.isArray(data) ? data : [];



console.log('RAW DATA:', data); // 👈 ye console me dekho
 console.log(orders)


    const revenueDataMap: Record<string, number> = {};
    const orderStatusMap: Record<string, number> = {};
    const paymentStatusMap: Record<string, number> = {};

    orders.forEach((order:Order) => {
        const date = order?.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
            })
            : "N/A";

        revenueDataMap[date] = (revenueDataMap[date] || 0) + (order.totalAmount || 0);
        orderStatusMap[order.orderStatus] = (orderStatusMap[order.orderStatus] || 0) + 1;
        paymentStatusMap[order.paymentStatus] = (paymentStatusMap[order.paymentStatus] || 0) + 1;
    });

    const revenueData = Object.keys(revenueDataMap).map((date) => ({
        date,
        revenue: revenueDataMap[date],
    }));

    const orderStatusData = Object.keys(orderStatusMap).map((status) => ({
        name: status,
        value: orderStatusMap[status],
    }));

    const paymentStatusData = Object.keys(paymentStatusMap).map((status) => ({
        name: status,
        count: paymentStatusMap[status],
    }));

    if (isLoading) {
        return <div className="p-6 ml-64">Loading charts...</div>;
    }

    if (isError) {
        return <div className="p-6 ml-64 text-red-500">Failed to load charts</div>;
    }

    return (
        <div className="ml-64 p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Order Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Order Status Pie Chart */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h2 className="text-lg font-semibold mb-4">Order Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={orderStatusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {orderStatusData.map((entry: any, index: number) => (
                                    //   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={STATUS_COLORS[entry.name] || "#9ca3af"} // fallback gray
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment Status Bar Chart */}
                <div className="bg-white rounded-2xl shadow p-5 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Payment Status</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={paymentStatusData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count">
                                {paymentStatusData.map((entry: any, index: number) => (
                                    // <Cell
                                    //     key={`cell-${index}`}
                                    //     fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]}
                                    // />
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={PAYMENT_STATUS_COLORS[entry.name] || "#9ca3af"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

//  const Dashboard=()=>{
//   return(<h1 className=" text-center bg-gray-100 top-center">   Booking / Order List</h1>)
//  }
//  export default Dashboard












// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const Api = import.meta.env.VITE_API_URL;

// export interface OrderPayloadItem {
//   productId: string;
//   quantity: number;
// }

// type Address = {
//   fullName: string;
//   phone: string;
//   email: string;
//   line1: string;
//   city: string;
//   state: string;
//   pincode: string;
//   country: string;
// };

// type CreateOrderPayload = {
//   items: {
//     productId: string;
//     quantity: number;
//   }[];
//   address: Address;
//   totalAmount: number;
//   paymentMethod: "COD" | "ONLINE";
// };

// export type OrderStatus =
//   | "PENDING"
//   | "CONFIRMED"
//   | "SHIPPED"
//   | "DELIVERED"
//   | "CANCELLED";

// export type OrderItem = {
//   productId: string;
//   quantity: number;
//   price: number;
//   name?: string;
//   image?: string;
// };


// export interface Order {
//   _id: string;
//   orderId?: string;
//   transactionId?: string;

//   orderStatus: string;
//   paymentStatus: string;

//   totalAmount?: number;
//   createdAt?: string;
//   updatedAt?: string;
//   deliveredAt?: string;
//   paymentMethod?: string;

//   userInfo?: {
//     fullName?: string;
//     email?: string;
//     phone?: string;
//     address?: {
//       line1?: string;
//       city?: string;
//       state?: string;
//       pincode?: string;
//       country?: string;
//     };
//   };

//   items?: {
//     productId?: string;
//     title?: string;
//     price?: number;
//     discountPrice?: number;
//     quantity?: number;
//     image?: string;
//     category?: string;
//   }[];
// }


// export const orderApi = createApi({
//   reducerPath: "orderApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${Api}/api`,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Orders", "SingleOrder"],
//   endpoints: (builder) => ({
//     // ── Create a new order ──────────────────────────────────────────
//     createOrder: builder.mutation<Order, CreateOrderPayload>({
//       query: (data) => ({
//         url: "/order/create",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Orders"],
//     }),

//     // ── Fetch logged-in user's orders ───────────────────────────────
//     getMyOrders: builder.query<Order[], void>({
//       query: () => ({
//         url: "/my-orders",
//         method: "GET",
//       }),
//       providesTags: ["Orders"],
//     }),

//     // ── Fetch ALL orders (admin) ────────────────────────────────────


//   getAllOrders: builder.query<{ success: boolean; orders: Order[] }, void>({
//   query: () => ({
//     url: "/orders",
//     method: "GET",
//   }),
// }),

//     // ── Fetch a single order by ID ──────────────────────────────────
//     // getOrderById: builder.query<Order, string>({
//     //   query: (orderId) => ({
//     //     url: `/order/${orderId}`,
//     //     method: "GET",
//     //   }),
//     //   providesTags: (_result, _error, orderId) => [
//     //     { type: "SingleOrder", id: orderId },
//     //   ],
//     // }),

//     // ── Update order status (admin) ─────────────────────────────────
//     updateOrderStatus: builder.mutation({
//       query: ({ id, orderStatus, paymentStatus }) => ({
//         url: `/order/update-status/${id}`,
//         method: "PUT",
//         body: { orderStatus, paymentStatus },
//       }),
//       invalidatesTags: ["Orders"],
//     }),
//     // ── Cancel an order ─────────────────────────────────────────────
//     cancelOrder: builder.mutation<Order, string>({
//       query: (orderId) => ({
//         url: `/order/${orderId}/cancel`,
//         method: "PATCH",
//       }),
//       invalidatesTags: (_result, _error, orderId) => [
//         "Orders",
//         { type: "SingleOrder", id: orderId },
//       ],
//     }),
//   }),
// });

// export const {
//   useCreateOrderMutation,
//   useGetMyOrdersQuery,
//   useGetAllOrdersQuery,
//   // useGetOrderByIdQuery,
//   useUpdateOrderStatusMutation,
//   useCancelOrderMutation,
// } = orderApi;