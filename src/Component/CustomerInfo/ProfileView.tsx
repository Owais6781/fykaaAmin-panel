
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import {
//   ArrowLeft,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Package,
//   CheckCircle,
//   Clock3,
//   XCircle,
//   Pencil,
//   Trash2,
//   ListOrdered,
//   BadgeCheck,
// } from "lucide-react";
// import { useParams } from "react-router-dom";
// import OrderModal from "./OrderModal";
// import { useGetUserOrdersQuery } from "../../api/orderApi";

// const ProfileView = () => {
//   const navigate = useNavigate()
//   const { id } = useParams();

//   const Api = import.meta.env.VITE_API_URL;

//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

  
//   const { data, isLoading, isError, } = useGetUserOrdersQuery(id)


//   const customer = data?.user;
//   const orders = data?.orders || [];
//   const customerOrders = orders || [];

//   console.log("id:", id);
//   console.log("all use show", data)
//   const ordersPerPage = 10;

//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

//   const currentOrders = customerOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );

//   const totalPages = Math.ceil(customerOrders.length / ordersPerPage);





//   const TotalOrders = customerOrders.length;
//   const CompletedOrder = customerOrders.filter((order: any) => order.orderStatus === "Delivered").length;
//   const PendingOrder = customerOrders.filter((order: any) => order.orderStatus === "Pending").length;
//   const CancelledOrder = customerOrders.filter((order: any) => order.orderStatus === "Cancelled").length;




//   const handleModal = (order: any) => {
//     setSelectedOrder(order);
//     setOpenModal(true);
//   };


//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 mx-auto"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Package size={28} className="text-purple-600" />
//             </div>
//           </div>
//           <p className="mt-6 text-gray-600 font-medium">Loading Customer info...</p>
//           <p className="text-sm text-gray-400 mt-1">Please wait while we fetch your data</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center px-4">
//         <div className="text-center">
//           <div className="text-6xl mb-4">📡</div>

//           <h2 className="text-2xl font-bold text-slate-800 mb-2">
//             No Internet Connection
//           </h2>

//           <p className="text-slate-500 mb-6">
//             Please check your network and try again.
//           </p>

//           <button
//             onClick={() => window.location.reload()}
//             className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex justify-between items-center">
//           <h1 className="text-2xl font-bold-sami text-slate-800">
//             Customer Details
//           </h1>

//           <button className="flex items-center gap-2 border px-5 py-2 rounded-xl hover:bg-slate-50"
//             onClick={() =>
//               navigate(-1)
//             }
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mt-5 overflow-hidden">

//           {/* Top Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">

//             {/* Profile Card */}
//             <div className="bg-slate-50 rounded-2xl border p-8 flex flex-col items-center justify-center">
//               <img
//                 //  src={customer?.image}
//                 alt=""
//                 className="w-44 h-44 rounded-full object-cover shadow"
//               />

//               <div className="mt-6 bg-blue-100 text-blue-600 px-6 py-3 rounded-xl flex items-center gap-2 font-semibold">
//                 <User size={18} />
//                 {orders?.[0]?.userId}
//               </div>
//             </div>

//             {/* Customer Info */}
//             <div className="lg:col-span-2 border rounded-2xl p-6">
//               <h2 className="flex items-center gap-2 text-blue-600 text-2xl font-semibold mb-6">
//                 <User size={24} />
//                 Customer Information
//               </h2>

//               <div className="space-y-5">

//                 <InfoRow
//                   icon={<User size={20} />}
//                   label="Name"
//                   value={customer?.fullName || ""}
//                 />

//                 <InfoRow
//                   icon={<BadgeCheck size={20} />}
//                   label="Customer ID"
//                   value={orders?.[0]?.userId}
//                 />

//                 <InfoRow
//                   icon={<Mail size={20} />}
//                   label="Email"
//                   value={customer?.email || ""}
//                 />

//                 <InfoRow
//                   icon={<Phone size={20} />}
//                   label="Phone"
//                   value={customer?.phone || ""}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Address Section */}
//           <div className="px-5 pb-5">
//             <div className="border rounded-2xl p-6">
//               <h2 className="flex items-center gap-2 text-green-600 text-2xl font-semibold mb-5">
//                 <MapPin size={24} />
//                 Address Information
//               </h2>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-green-50 border border-green-100 rounded-xl p-6">

//                 <AddressBox title="Address" value={customer?.address?.line1 || ""} />

//                 <AddressBox title="City" value={customer?.address?.city || ""} />

//                 <AddressBox title="State" value={customer?.address?.state || ""} />

//                 <AddressBox title="Pincode" value={customer?.address?.pincode || ""} />
//               </div>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="px-5 pb-5">
//             <div className="border rounded-2xl p-6">
//               <h2 className="flex items-center gap-2 text-purple-600 text-2xl font-semibold mb-5">
//                 <Package size={24} />
//                 Order Summary
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

//                 <SummaryCard
//                   icon={<Package />}
//                   title="Total Orders"
//                   value={String(TotalOrders)}


//                   bg="bg-blue-50"
//                 />

//                 <SummaryCard
//                   icon={<CheckCircle />}
//                   title="Completed"
//                   value={String(CompletedOrder)}
//                   bg="bg-green-50"
//                 />

//                 <SummaryCard
//                   icon={<Clock3 />}
//                   title="Pending"
//                   value={String(PendingOrder)}
//                   bg="bg-orange-50"
//                 />

//                 <SummaryCard
//                   icon={<XCircle />}
//                   title="Cancelled"
//                   value={String(CancelledOrder)}
//                   bg="bg-red-50"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Recent Orders */}
//           <div className="px-5 pb-5">
//             <div className="border rounded-2xl p-6">
//               <h2 className="text-2xl font-semibold text-blue-600 mb-5">
//                 Recent Orders
//               </h2>

//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="bg-blue-50">
//                       <th className="text-left px-6 py-4">Order ID</th>
//                       <th className="text-left px-6 py-4">Order Date</th>
//                       <th className="text-left px-6 py-4">Status</th>
//                       <th className="text-left px-6 py-4">Amount</th>
//                     </tr>
//                   </thead>

//                   <tbody>

//                     {currentOrders.map((order: any) => (
//                       <tr
//                         key={order._id}
//                         className="border-b hover:bg-slate-50"
//                       >

//                         <td className="px-6 py-4">
//                           <button
//                             onClick={() => handleModal(order)}
//                             className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
//                           >
//                             {order.orderId}
//                           </button>
//                         </td>
//                         <td className="px-6 py-4">{order.date}
//                           {order.createdAt
//                             ? new Date(order.createdAt).toLocaleDateString(
//                               "en-IN",
//                               {
//                                 day: "2-digit",
//                                 month: "long",
//                                 year: "numeric",
//                               }
//                             )
//                             : "N/A"}
//                         </td>

//                         <td className="px-6 py-4">
//                           <span
//                             className={`px-4 py-1 rounded-full text-sm font-medium ${order.orderStatus === "Delivered"
//                               ? "bg-green-100 text-green-700"
//                               : order.orderStatus === "Pending"
//                                 ? "bg-orange-100 text-orange-700"
//                                 : order.orderStatus === "Cancelled"
//                                   ? "bg-red-100 text-red-700"
//                                   : "bg-gray-100 text-gray-700"
//                               }`}
//                           >
//                             {order.orderStatus}
//                           </span>
//                         </td>

//                         <td className="px-6 py-4">
//                           {order.totalAmount}
//                         </td>
//                       </tr>
//                     ))}

//                   </tbody>
//                 </table>
//                 <div className="flex items-center justify-between mt-6">
//                   <button
//                     onClick={() => setCurrentPage((prev) => prev - 1)}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Previous
//                   </button>

//                   <span className="text-sm font-medium">
//                     Page {currentPage} of {totalPages}
//                   </span>

//                   <button
//                     onClick={() => setCurrentPage((prev) => prev + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <OrderModal
//               open={openModal}
//               onClose={() => setOpenModal(false)}
//               order={selectedOrder}
//               apiUrl={Api}
//             />
//           </div>

//           {/* Footer Buttons */}
//           <div className="flex flex-wrap justify-center gap-6 p-6 border-t">

//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
//               <Pencil size={18} />
//               Edit Customer
//             </button>

//             <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
//               <Trash2 size={18} />
//               Delete
//             </button>

//             <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2">
//               <ListOrdered size={18} />
//               View Orders
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileView;

// /* Components */

// interface InfoRowProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }

// const InfoRow = ({ icon, label, value }: InfoRowProps) => {
//   return (
//     <div className="grid grid-cols-2 border-b pb-4">
//       <div className="flex items-center gap-3 text-slate-600">
//         {icon}
//         {label}
//       </div>

//       <div className="font-medium text-slate-800">
//         {value}
//       </div>
//     </div>
//   );
// };

// interface AddressBoxProps {
//   title: string;
//   value: string;
// }

// const AddressBox = ({ title, value }: AddressBoxProps) => {
//   return (
//     <div className="text-center">
//       <h4 className="font-semibold text-green-600">
//         {title}
//       </h4>

//       <p className="mt-2 text-slate-700">
//         {value}
//       </p>
//     </div>
//   );
// };

// interface SummaryCardProps {
//   icon: React.ReactNode;
//   title: string;
//   value: string;
//   bg: string;
// }

// const SummaryCard = ({
//   icon,
//   title,
//   value,
//   bg,
// }: SummaryCardProps) => {
//   return (
//     <div className={`${bg} border rounded-xl p-5`}>
//       <div className="flex items-center gap-3 mb-3">
//         {icon}
//         <span className="font-medium">{title}</span>
//       </div>

//       <h3 className="text-3xl font-bold">
//         {value}
//       </h3>
//     </div>
//   );
// };








import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Pencil,
  Trash2,
  ListOrdered,
  BadgeCheck,
  RefreshCw,
  Calendar,
} from "lucide-react";
import OrderModal from "./OrderModal";
import { useGetUserOrdersQuery } from "../../api/orderApi";

const ProfileView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const Api = import.meta.env.VITE_API_URL;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetUserOrdersQuery(id);

  const customer = data?.user;
  const customerOrders: any[] = data?.orders || [];

  const ordersPerPage = 10;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const currentOrders = customerOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(customerOrders.length / ordersPerPage) || 1;

  const TotalOrders = customerOrders.length;
  const CompletedOrder = customerOrders.filter(
    (order: any) => order.orderStatus === "Delivered"
  ).length;
  const PendingOrder = customerOrders.filter(
    (order: any) => order.orderStatus === "Pending"
  ).length;
  const CancelledOrder = customerOrders.filter(
    (order: any) => order.orderStatus === "Cancelled"
  ).length;

  const handleModal = (order: any) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
          <RefreshCw size={18} className="animate-spin text-gray-400" />
          Loading Customer Profile...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-[#F8FAFC] min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm font-medium flex justify-between items-center">
          <span>Failed to load customer details. Please check connection.</span>
          <button
            onClick={() => refetch?.() || window.location.reload()}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-xs hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-[#0B0F19]">Customer Details</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Profile overview and order history
            </p>
          </div>

          <button
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Left: Avatar Card */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                {customer?.image ? (
                  <img
                    src={customer.image}
                    alt={customer?.fullName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-slate-400" />
                )}
              </div>

              <div className="mt-4 bg-white border border-slate-200 text-slate-700 px-4 py-1.5 rounded-full flex items-center gap-2 font-mono text-xs shadow-xs">
                <BadgeCheck size={14} className="text-indigo-600" />
                ID: {id || customerOrders?.[0]?.userId || "N/A"}
              </div>
            </div>

            {/* Right: Personal Info */}
            <div className="lg:col-span-2 border border-slate-200 rounded-xl p-6 bg-white">
              <h2 className="flex items-center gap-2 text-[#0B0F19] text-base font-bold mb-4 pb-3 border-b border-gray-100">
                <User size={18} className="text-slate-500" />
                Personal Information
              </h2>

              <div className="space-y-4">
                <InfoRow
                  icon={<User size={16} />}
                  label="Full Name"
                  value={customer?.fullName || "N/A"}
                />
                <InfoRow
                  icon={<BadgeCheck size={16} />}
                  label="Customer ID"
                  value={id || customerOrders?.[0]?.userId || "N/A"}
                />
                <InfoRow
                  icon={<Mail size={16} />}
                  label="Email Address"
                  value={customer?.email || "N/A"}
                />
                <InfoRow
                  icon={<Phone size={16} />}
                  label="Phone Number"
                  value={customer?.phone || "N/A"}
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="p-6">
            <h2 className="flex items-center gap-2 text-[#0B0F19] text-base font-bold mb-4">
              <MapPin size={18} className="text-slate-500" />
              Address Information
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
              <AddressBox
                title="Address Line"
                value={customer?.address?.line1 || "N/A"}
              />
              <AddressBox
                title="City"
                value={customer?.address?.city || "N/A"}
              />
              <AddressBox
                title="State"
                value={customer?.address?.state || "N/A"}
              />
              <AddressBox
                title="Pincode"
                value={customer?.address?.pincode || "N/A"}
              />
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="p-6 space-y-4">
            <h2 className="flex items-center gap-2 text-[#0B0F19] text-base font-bold">
              <Package size={18} className="text-slate-500" />
              Order Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <SummaryCard
                icon={<Package size={18} className="text-slate-700" />}
                title="Total Orders"
                value={String(TotalOrders)}
                bg="bg-slate-50 border-slate-200"
              />
              <SummaryCard
                icon={<CheckCircle2 size={18} className="text-emerald-600" />}
                title="Completed"
                value={String(CompletedOrder)}
                bg="bg-emerald-50/50 border-emerald-200/60 text-emerald-900"
              />
              <SummaryCard
                icon={<Clock size={18} className="text-amber-600" />}
                title="Pending"
                value={String(PendingOrder)}
                bg="bg-amber-50/50 border-amber-200/60 text-amber-900"
              />
              <SummaryCard
                icon={<XCircle size={18} className="text-rose-600" />}
                title="Cancelled"
                value={String(CancelledOrder)}
                bg="bg-rose-50/50 border-rose-200/60 text-rose-900"
              />
            </div>
          </div>

          {/* Order Table Section */}
          <div className="p-6">
            <h2 className="text-base font-bold text-[#0B0F19] mb-4">
              Recent Orders
            </h2>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Order Date</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Amount</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {currentOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-8 text-center text-gray-400 text-xs"
                        >
                          No recent orders found.
                        </td>
                      </tr>
                    ) : (
                      currentOrders.map((order: any) => (
                        <tr
                          key={order._id}
                          className="hover:bg-slate-50/60 transition"
                        >
                          <td className="px-6 py-3.5">
                            <button
                              onClick={() => handleModal(order)}
                              className="font-mono text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                            >
                              #{order.orderId || order._id}
                            </button>
                          </td>
                          <td className="px-6 py-3.5 text-gray-600 text-xs">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={12} className="text-gray-400" />
                              {order.createdAt
                                ? new Date(
                                    order.createdAt
                                  ).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : order.date || "N/A"}
                            </span>
                          </td>

                          <td className="px-6 py-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                order.orderStatus === "Delivered"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                  : order.orderStatus === "Pending"
                                  ? "bg-amber-50 text-amber-600 border border-amber-200"
                                  : order.orderStatus === "Cancelled"
                                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                                  : "bg-gray-100 text-gray-600 border border-gray-200"
                              }`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>

                          <td className="px-6 py-3.5 font-semibold text-[#0B0F19]">
                            ₹{order.totalAmount ?? 0}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-slate-50/50">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>

                  <span className="text-xs text-gray-500 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            <OrderModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              order={selectedOrder}
              apiUrl={Api}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap justify-end gap-3 p-6 bg-slate-50/50">
            <button className="bg-[#0B0F19] hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition shadow-xs">
              <Pencil size={15} />
              Edit Customer
            </button>

            <button className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition">
              <Trash2 size={15} />
              Delete Profile
            </button>

            <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition">
              <ListOrdered size={15} />
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

/* Sub-components */

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 text-xs">
      <div className="flex items-center gap-2 text-gray-500 font-medium">
        <span className="text-gray-400">{icon}</span>
        {label}
      </div>
      <div className="font-semibold text-[#0B0F19] text-sm">{value}</div>
    </div>
  );
};

interface AddressBoxProps {
  title: string;
  value: string;
}

const AddressBox = ({ title, value }: AddressBoxProps) => {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h4>
      <p className="mt-1 text-sm font-medium text-[#0B0F19]">{value}</p>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  bg: string;
}

const SummaryCard = ({ icon, title, value, bg }: SummaryCardProps) => {
  return (
    <div className={`${bg} border rounded-xl p-4 transition shadow-xs`}>
      <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
        {icon}
        <span>{title}</span>
      </div>
      <h3 className="text-2xl font-bold text-[#0B0F19]">{value}</h3>
    </div>
  );
};