
import { X } from "lucide-react";
import { useMemo, useState } from "react";

type OrderItem = {
    productId: string;
    title: string;
    image: string;
    category: string;
    discountPrice: number;
    quantity: number;
};

type Order = {
    orderId?: string;
    orderStatus: string;
    items?: OrderItem[];
};

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    orders: Order[];
};



const Api = import.meta.env.VITE_API_URL

export default function OrderDetailsModal({
    open,
    onClose,
    title,
    orders,
}: Props) {
    if (!open) return null;

    const [search, setSearch] = useState("");

    const filteredOrders = useMemo(() => {
        if (!search.trim()) return orders;

        return orders.filter((order) =>
            order.orderId?.toLowerCase().includes(search.toLowerCase())
        );
    }, [orders, search]);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl overflow-hidden">

                {/* Header */}

                <div className="flex justify-between items-center border-b p-5 bg-gray-50">

                    <div>
                        <h2 className="text-xl font-bold">{title}</h2>
                        <p className="text-sm text-gray-500">
                            Order Details
                        </p>
                    </div>
                    <div className="flex items-center justify-between p-4 ">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search Order ID..."
                            className="w-72 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        onClick={onClose}
                        className="h-10 w-10 rounded-full hover:bg-red-100 flex  items-center justify-center text-red-500 transition"
                    >
                        <X className="text-red-500" />
                    </button>

                </div>





                {/* Table */}

                <div className="max-h-[400px] overflow-auto">

                    <table className="w-full">

                        <thead className="sticky top-0 bg-gray-100">
                            <tr>

                                <th className="px-5 py-3 text-left">Order ID</th>
                                <th className="px-5 py-3 text-left">Product</th>
                                <th className="px-5 py-3 text-left">Category</th>
                                <th className="px-5 py-3 text-left">Price</th>
                                <th className="px-5 py-3 text-left">Qty</th>
                                <th className="px-5 py-3 text-left">Status</th>

                            </tr>
                        </thead>

                        <tbody>

                            {filteredOrders .map((order) =>
                                order.items?.map((item) => (
                                    <tr
                                        key={`${order.orderId}-${item.productId}`}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-5 py-4 font-medium text-indigo-600">
                                            {order.orderId}
                                        </td>

                                        <td className="px-5 py-4">

                                            <div className="flex items-center gap-3">

                                                <img
                                                    src={`${Api}/api/image/${item.image}`}
                                                    alt={item.title}
                                                    className="w-12 h-12 rounded-lg object-cover border"
                                                />

                                                <div>
                                                    <p className="font-medium">
                                                        {item.title}
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-5 py-4">
                                            {item.category}
                                        </td>

                                        <td className="px-5 py-4">
                                            ₹{item.discountPrice}
                                        </td>

                                        <td className="px-5 py-4">
                                            {item.quantity}
                                        </td>

                                        <td className="px-5 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold
                          ${order.orderStatus === "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.orderStatus === "Cancelled"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {order.orderStatus}
                                            </span>

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>



                <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">

                    <span className="text-sm text-gray-500">
                        Showing {filteredOrders.length} Orders
                    </span>

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                    >
                        Close
                    </button>

                </div>


            </div>

        </div>
    );
}