




 const Dashboard=()=>{
  return(<h1 className=" text-center bg-gray-100 top-center">   Booking / Order List</h1>)
 }
 export default Dashboard



// import { useEffect, useState } from "react";

// const Dashboard = () => {

//   const [orders, setOrders] = useState([]);

//   const Api = import.meta.env.VITE_API_URL;

//   const getOrders = async () => {
//     try {
//       const res = await fetch(`${Api}/api/orders`);
//       const data = await res.json();
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getOrders();
//   }, []);

//   return (
//     <div className="p-6 ml-64">

//       <h1 className="text-2xl font-bold mb-6 text-center">
//         Booking / Order List
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-300">

//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 border">Order ID</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Product</th>
//               <th className="p-2 border">Price</th>
//               <th className="p-2 border">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((order:any) => (
//               <tr key={order._id} className="text-center">
//                 <td className="border p-2">{order._id}</td>
//                 <td className="border p-2">{order.customerName}</td>
//                 <td className="border p-2">{order.productName}</td>
//                 <td className="border p-2">₹{order.price}</td>
//                 <td className="border p-2">{order.status}</td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;