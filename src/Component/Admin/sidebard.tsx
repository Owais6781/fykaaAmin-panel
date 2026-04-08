
// import { NavLink, Outlet } from "react-router-dom";
// import { 
//   User, 
//   LayoutDashboard, 
//   Users, 
//   Package, 
//   LogIn, 
//   LogOut,
//   Settings,
// } from "lucide-react";

// const AdminLayout = () => {
//   const user = { name: "Arsh", role: "Administrator" };

//   const navItems = [
//     { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
//     { to: "/sellerRegister", icon: Users, label: "Users" },
//     { to: "/products", icon: Package, label: "Products" },
//     { to: "/settings", icon: Settings, label: "Settings" },
//     { to: "/login", icon: LogIn, label: "Login" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
      
//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white fixed h-full flex flex-col shadow-2xl">
        
//         {/* Logo */}
//         <div className="p-6">
//           <h1 className="text-2xl font-bold">
//             🛠️ <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin</span>
//           </h1>
//         </div>

//         {/* User Card */}
//         <div className="mx-4 p-4 bg-gray-800/50 rounded-xl mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
//               <User size={20} />
//             </div>
//             <div>
//               <p className="font-medium text-sm">{user.name}</p>
//               <p className="text-xs text-gray-400">{user.role}</p>
//             </div>
//             <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4">
//           <div className="flex flex-col gap-1">
//             {navItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end={item.end}
//                 className={({ isActive }) =>
//                   `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
//                   ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg"
//                       : "text-gray-400 hover:text-white hover:bg-gray-800/50"
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     {/* Active Indicator Bar */}
//                     {isActive && (
//                       <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full"></span>
//                     )}
                    
//                     <item.icon 
//                       size={20} 
//                       className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
//                     />
//                     <span>{item.label}</span>
                    
//                     {/* Active Badge */}
//                     {isActive && (
//                       <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
//                     )}
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </div>
//         </nav>

//         {/* Bottom Section */}
//         <div className="p-4 mt-auto">
//           <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl mb-4">
//             <p className="text-sm font-medium">Need Help?</p>
//             <p className="text-xs text-gray-400 mt-1">Check documentation</p>
//           </div>
          
//           <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200">
//             <LogOut size={20} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-64 flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;








import { NavLink,  } from "react-router-dom";
import { 
  User, 
  LayoutDashboard, 
  Users, 
  Package, 
  LogIn, 
  LogOut,
  Settings,
  ChevronRight
} from "lucide-react";


const AdminLayout = () => {
  const user = { name: "Arsh", role: "Administrator" };

  // Navigation items array for cleaner code
  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/inventory", icon: Package, label: "Inventory" },
    { to: "/Users", icon: Users, label: "Users" },
    { to: "/Login", icon: LogIn, label: "Login" },
     { to: "/Settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex bg-gray-100 ">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white fixed h-full flex flex-col">
        
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-center">
            <span className="text-blue-500">Admin</span> Panel
          </h1>
        </div>

        {/* User Profile Section */}
        <div className="p-5 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <User size={24} className="text-white" />
            </div>
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-xs text-gray-400">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">
            Main Menu
          </p>
          
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      size={20} 
                      className={isActive ? "text-white" : "text-gray-400 group-hover:text-white"} 
                    />
                    <span className="flex-1">{item.label}</span>
                    {isActive && (
                      <ChevronRight size={16} className="text-white" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 p-3 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

    
    </div>
  );
};

export default AdminLayout;