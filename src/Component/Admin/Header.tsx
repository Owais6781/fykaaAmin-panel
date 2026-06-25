


// import React from "react";
// import {
//     Package,
//     Search,
//     Bell,
//     MessageSquare,
//     ChevronDown,
//     LogOut,

// } from "lucide-react";
// import { useNavigate } from "react-router-dom"
// import {

//     useGetMyOrdersQuery
// } from "../../api/orderApi";

// type OrderItem = {
//   productId?: string;
//   title?: string;
//   price?: number;
//   discountPrice?: number;
//   quantity?: number;
//   image?: string;
//   category?: string;
// };

// type Address = {
//   line1?: string;
//   city?: string;
//   state?: string;
//   pincode?: string;
//   country?: string;
// };

// type UserInfo = {
//   fullName?: string;
//   email?: string;
//   phone?: string;
//   address?: Address;
// };



// type Order = {
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
//   userInfo?: UserInfo;
//   items?: OrderItem[];
// };


// export default function DashboardHeader() {
//     const navigate = useNavigate();
//     const [openMenu, setOpenMenu] = React.useState(false);
//     const [search, setSearch] = React.useState("");
//     const inputRef = React.useRef<HTMLInputElement>(null);




//     const { data} = useGetMyOrdersQuery(undefined, {
//         pollingInterval: 5000, // har 5 sec me refresh
//         refetchOnFocus: true,
//         refetchOnReconnect: true,
//     })



//     const orders: Order[] = Array.isArray(data) ? data : [];

//     const pendingCount = orders.filter(
//         (o) => o.orderStatus === "Pending"
//     ).length;


//     const messageCount = 2;

//     const storedAdmin = localStorage.getItem("admin");

//     const user = storedAdmin
//         ? JSON.parse(storedAdmin)
//         : null;

//     ;

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("admin");
//         navigate("/login", { replace: true });
//     };


//     React.useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === "/") {
//                 e.preventDefault();
//                 inputRef.current?.focus();
//             }
//         };

//         window.addEventListener("keydown", handleKeyDown);
//         return () => window.removeEventListener("keydown", handleKeyDown);
//     }, []);


  

 
//     return (
//         <header className=" bg-white border-b border-gray-200   py-3 flex items-center justify-between sticky top-0 z-50">
//             {/* LEFT */}
//             <div className="flex items-center  gap-3">
//                 <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
//                     <Package size={16} className="text-indigo-600" />
//                 </div>
//                 <span className="text-[17px] font-semibold text-slate-800">
//                     Dashboard
//                 </span>
//             </div>

//             {/* SEARCH */}
//             <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-72">
//                 <Search size={14} className="text-slate-400 shrink-0" />
//                 <input
//                     ref={inputRef}
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
//                     placeholder="Search products, orders, users..."
//                 />
//                 <kbd className="text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">
//                     /
//                 </kbd>
//             </div>

//             {/* RIGHT */}
//             <div className="flex items-center gap-4">
//                 {/* Notifications */}
//                 <button className="relative text-slate-500 hover:text-slate-700">
//                     <Bell size={19} />
//                     {pendingCount > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
//                             {pendingCount}
//                         </span>
//                     )}
//                 </button>

//                 {/* Messages */}
//                 <button className="relative text-slate-500 hover:text-slate-700">
//                     <MessageSquare size={19} />
//                     {messageCount > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
//                             {messageCount}
//                         </span>
//                     )}
//                 </button>

//                 {/* Profile */}

//                 <div
//                     className="flex items-center gap-2.5 cursor-pointer"
//                     onClick={() => setOpenMenu((prev) => !prev)}
//                 >


//                     <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">

//                         {user?.fullName?.charAt(0).toUpperCase()}
//                     </div>

//                     <div>
//                         <p className="text-sm font-semibold text-slate-800 leading-none">
//                             {user?.fullName || ""}
//                         </p>


//                         {openMenu && (
//                             <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 shadow-md rounded-lg overflow-hidden z-50">

//                                 <div className="px-4 py-2 text-xs text-slate-400 border-b">
//                                     {user?.email}
//                                 </div>

//                                 <button
//                                     onClick={handleLogout}
//                                     className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                                 >
//                                     <LogOut size={16} />
//                                     Logout
//                                 </button>

//                             </div>
//                         )}
//                     </div>

//                     <ChevronDown
//                         size={14}
//                         className={`text-slate-400 transition-transform ${openMenu ? "rotate-180" : ""
//                             }`}
//                     />
//                 </div>


//             </div>
//         </header>

//     );
// }





import React from "react";
import {
  Package,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../api/orderApi";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { data } = useGetMyOrdersQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const orders = Array.isArray(data) ? data : [];
  const pendingCount = orders.filter((o: any) => o.orderStatus === "Pending").length;

  const messageCount = 2;

  const storedAdmin = localStorage.getItem("admin");
  const user = storedAdmin ? JSON.parse(storedAdmin) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login", { replace: true });
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="w-full bg-white  border-gray-200 px-3 sm:px-6 py-3 flex items-center justify-between relative">

      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
          <Package size={16} className="text-indigo-600" />
        </div>
        <span className="text-sm sm:text-[17px] font-semibold text-slate-800">
          Dashboard
        </span>
      </div>

      {/* SEARCH (desktop only) */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 w-64 lg:w-80">
        <Search size={14} className="text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-sm w-full"
          placeholder="Search..."
        />
        <kbd className="text-[10px] text-slate-400 bg-white border px-1.5 py-0.5 rounded">
          /
        </kbd>
      </div>

      {/* MOBILE SEARCH BUTTON */}
      <button
        className="md:hidden text-slate-500"
        onClick={() => setShowSearch(!showSearch)}
      >
        <Search size={18} />
      </button>

      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* Bell */}
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell size={18} />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>

        {/* Messages */}
        <button className="relative text-slate-500 hover:text-slate-700 hidden sm:block">
          <MessageSquare size={18} />
          {messageCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
              {messageCount}
            </span>
          )}
        </button>

        {/* Profile */}
        <div className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>
             <p className="text-sm font-semibold text-slate-800 leading-none">
                            {user?.fullName || ""}
                         </p>

          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform ${openMenu ? "rotate-180" : ""}`}
          />

          {/* DROPDOWN */}
          {openMenu && (
            <div className="absolute right-0 top-10 w-44 bg-white border shadow-md rounded-lg z-50">
              <div className="px-4 py-2 text-xs text-slate-400 border-b">
                {user?.email}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white border-t p-3 md:hidden">
          <div className="flex items-center gap-2 bg-slate-50 border rounded-lg px-3 py-2">
            <Search size={14} className="text-slate-400" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Search..."
            />
          </div>
        </div>
      )}
    </header>
  );
}