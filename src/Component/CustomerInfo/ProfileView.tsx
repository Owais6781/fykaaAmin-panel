
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CheckCircle,
  Clock3,
  XCircle,
  Pencil,
  Trash2,
  ListOrdered,
  BadgeCheck,
} from "lucide-react";
import { useParams } from "react-router-dom";
import OrderModal from "./OrderModal";
import { useGetUserOrdersQuery } from "../../api/orderApi";

const ProfileView = () => {
  const navigate = useNavigate()
  const { id } = useParams();

  const Api = import.meta.env.VITE_API_URL;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading, isError, } = useGetUserOrdersQuery(id)

  const customer = data?.user;
  const orders = data?.orders || [];
  const customerOrders = orders || [];


  console.log("orders 👉", customerOrders);

  console.log("img 👉",customerOrders?.[0]?.items?.[0]);



  const TotalOrders = customerOrders.length;
  const CompletedOrder = customerOrders.filter((order: any) => order.orderStatus === "Delivered").length;
  const PendingOrder = customerOrders.filter((order: any) => order.orderStatus === "Pending").length;
  const CancelledOrder = customerOrders.filter((order: any) => order.orderStatus === "Cancelled").length;




  const handleModal = (order: any) => {
    setSelectedOrder(order);
    setOpenModal(true);
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
          <p className="mt-6 text-gray-600 font-medium">Loading Customer info...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  if (isError) {
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
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold-sami text-slate-800">
            Customer Details
          </h1>

          <button className="flex items-center gap-2 border px-5 py-2 rounded-xl hover:bg-slate-50"
            onClick={() =>
              navigate(-1)
            }
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-5 overflow-hidden">

          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">

            {/* Profile Card */}
            <div className="bg-slate-50 rounded-2xl border p-8 flex flex-col items-center justify-center">
              <img
                //  src={customer?.image}
                alt=""
                className="w-44 h-44 rounded-full object-cover shadow"
              />

              <div className="mt-6 bg-blue-100 text-blue-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold">
                <User size={18} />
                {orders?.[0]?.userId}
              </div>
            </div>

            {/* Customer Info */}
            <div className="lg:col-span-2 border rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-blue-600 text-2xl font-semibold mb-6">
                <User size={24} />
                Customer Information
              </h2>

              <div className="space-y-5">

                <InfoRow
                  icon={<User size={20} />}
                  label="Name"
                  value={customer?.fullName || ""}
                />

                <InfoRow
                  icon={<BadgeCheck size={20} />}
                  label="Customer ID"
                  value={orders?.[0]?.userId}
                />

                <InfoRow
                  icon={<Mail size={20} />}
                  label="Email"
                  value={customer?.email || ""}
                />

                <InfoRow
                  icon={<Phone size={20} />}
                  label="Phone"
                  value={customer?.phone || ""}
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="px-5 pb-5">
            <div className="border rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-green-600 text-2xl font-semibold mb-5">
                <MapPin size={24} />
                Address Information
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-green-50 border border-green-100 rounded-xl p-6">

                <AddressBox title="Address" value={customer?.address?.line1 || ""} />

                <AddressBox title="City" value={customer?.address?.city || ""} />

                <AddressBox title="State" value={customer?.address?.state || ""} />

                <AddressBox title="Pincode" value={customer?.address?.pincode || ""} />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-5 pb-5">
            <div className="border rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-purple-600 text-2xl font-semibold mb-5">
                <Package size={24} />
                Order Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                <SummaryCard
                  icon={<Package />}
                  title="Total Orders"
                  value={String(TotalOrders)}


                  bg="bg-blue-50"
                />

                <SummaryCard
                  icon={<CheckCircle />}
                  title="Completed"
                  value={String(CompletedOrder)}
                  bg="bg-green-50"
                />

                <SummaryCard
                  icon={<Clock3 />}
                  title="Pending"
                  value={String(PendingOrder)}
                  bg="bg-orange-50"
                />

                <SummaryCard
                  icon={<XCircle />}
                  title="Cancelled"
                  value={String(CancelledOrder)}
                  bg="bg-red-50"
                />
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="px-5 pb-5">
            <div className="border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-blue-600 mb-5">
                Recent Orders
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="text-left px-6 py-4">Order ID</th>
                      <th className="text-left px-6 py-4">Order Date</th>
                      <th className="text-left px-6 py-4">Status</th>
                      <th className="text-left px-6 py-4">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {customerOrders.map((order: any) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-slate-50"
                      >

                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleModal(order)}
                            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                          >
                            {order.orderId}
                          </button>
                        </td>
                        <td className="px-6 py-4">{order.date}
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )
                            : "N/A"}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus === "Pending"
                                ? "bg-orange-100 text-orange-700"
                                : order.orderStatus === "Cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {order.totalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <OrderModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              order={selectedOrder}
              apiUrl={Api}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-wrap justify-center gap-6 p-6 border-t">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
              <Pencil size={18} />
              Edit Customer
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
              <Trash2 size={18} />
              Delete
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
              <ListOrdered size={18} />
              View Orders
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

/* Components */

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  return (
    <div className="grid grid-cols-2 border-b pb-4">
      <div className="flex items-center gap-3 text-slate-600">
        {icon}
        {label}
      </div>

      <div className="font-medium text-slate-800">
        {value}
      </div>
    </div>
  );
};

interface AddressBoxProps {
  title: string;
  value: string;
}

const AddressBox = ({ title, value }: AddressBoxProps) => {
  return (
    <div className="text-center">
      <h4 className="font-semibold text-green-600">
        {title}
      </h4>

      <p className="mt-2 text-slate-700">
        {value}
      </p>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bg: string;
}

const SummaryCard = ({
  icon,
  title,
  value,
  bg,
}: SummaryCardProps) => {
  return (
    <div className={`${bg} border rounded-xl p-5`}>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
};