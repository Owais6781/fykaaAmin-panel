

import { X, Package, ShoppingBag, MapPin } from "lucide-react";
 import OrderTracking from "./OrderTracking";

interface OrderModalProps {
    open: boolean;
    onClose: () => void;
    order: any;
    apiUrl: string;
}

const OrderModal = ({
    open,
    onClose,
    order,
    apiUrl,
}: OrderModalProps) => {
    if (!open || !order) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Cancelled":
                return "bg-red-100 text-red-700";
            case "Processing":
                return "bg-blue-100 text-blue-700";
            case "Shipped":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-slate-100 text-slate-700";
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b">
                    <div className="flex items-start justify-between">
                        <div  className="flex items-center justify-between gap-2">
                            <h2 className="text-2xl font-bold-sami">
                                Order Details
                            </h2>
                            <p className="mt-1">{order.orderId}</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                    <InfoCard
                        title="Order Status"
                        value={order.orderStatus}
                        badge={getStatusColor(order.orderStatus)}
                    />

                    <InfoCard
                        title="Payment"
                        value={order.paymentStatus}
                        badge={
                            order.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }
                    />

                    <InfoCard
                        title="Payment Method"
                        value={order.paymentMethod}
                    />

                    <InfoCard
                        title="Amount"
                        value={`₹${order.totalAmount}`}
                    />
                </div>

                {/* 🔥 ORDER TRACKING ADDED HERE */}
                <div className="px-6">
                    <OrderTracking
                        status={order.orderStatus}
                        createdAt={order.createdAt}
                        updatedAt={order.updatedAt}
                    />
                </div>

                {/* Customer & Address */}
                <div className="grid md:grid-cols-2 gap-6 px-6 mt-6">

                    <div className="bg-slate-50 border rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4 text-blue-600">
                            <ShoppingBag size={18} />
                            <h3 className="font-bold text-lg">
                                Customer Information
                            </h3>
                        </div>

                        <div className="space-y-3 text-slate-700">
                            <p><strong>Name:</strong> {order.userInfo?.fullName}</p>
                            <p><strong>Email:</strong> {order.userInfo?.email}</p>
                            <p><strong>Phone:</strong> {order.userInfo?.phone}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4 text-green-600">
                            <MapPin size={18} />
                            <h3 className="font-bold text-lg">
                                Shipping Address
                            </h3>
                        </div>

                        <div className="space-y-2 text-slate-700">
                            <p>{order.userInfo?.address?.line1}</p>
                            <p>
                                {order.userInfo?.address?.city},{" "}
                                {order.userInfo?.address?.state}
                            </p>
                            <p>{order.userInfo?.address?.country}</p>
                            <p>{order.userInfo?.address?.pincode}</p>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-5 text-purple-600">
                        <Package size={20} />
                        <h3 className="text-xl font-bold">
                            Ordered Products
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {order.items?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className="border rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition"
                            >
                                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100">
                                    {item.productId ? (
                                        <img
                                            src={`${apiUrl}/api/image/${item.image}`}
                                            alt={item.category}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Package size={28} />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg">
                                        {item.title}
                                    </h4>

                                    <p className="text-slate-500">
                                        {item.category}
                                    </p>

                                    <div className="flex gap-6 mt-2 text-sm">
                                        <span>
                                            Qty: <strong>{item.quantity}</strong>
                                        </span>

                                        <span>
                                            Price:{" "}
                                            <strong>
                                                ₹{item.discountPrice || item.price}
                                            </strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t p-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-900 text-white rounded-xl"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const InfoCard = ({
    title,
    value,
    badge,
}: {
    title: string;
    value: string;
    badge?: string;
}) => (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <p className="text-sm text-slate-500">{title}</p>

        {badge ? (
            <span className={`inline-flex px-3 py-1 rounded-full mt-2 ${badge}`}>
                {value}
            </span>
        ) : (
            <p className="text-lg font-bold mt-2">{value}</p>
        )}
    </div>
);

export default OrderModal;