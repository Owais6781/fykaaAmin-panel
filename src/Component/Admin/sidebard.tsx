



import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  User,
  LayoutDashboard,
  ShoppingCart,
  // Users,
  Package,
  LogIn,
  LogOut,
  // Settings,
  ChevronRight,
} from "lucide-react";



const AdminLayout = () => {
  const navigate = useNavigate();
  
const storedAdmin = localStorage.getItem("admin");




const user = storedAdmin
  ? JSON.parse(storedAdmin)
  : null;

;



  // const navItems = [
  //  
  //   { to: "/dashboard/order-list", icon: ShoppingCart, label: "Order Book" },
  //   { to: "/dashboard/inventory", icon: Package, label: "Inventory" },
  //   { to: "/dashboard/users", icon: Users, label: "Users" },
  //   { to: "/register", icon: LogIn, label: "New Registation" },
  //   { to: "/dashboard/login", icon: LogIn, label: "Login" },
  //   { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  // ];




const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/order-list", icon: ShoppingCart, label: "Order Book" ,},
  { to: "/dashboard/inventory", icon: Package, label: "Inventory" },
  { to: "/dashboard/form", icon: Package, label: "Add Product" },
  { to: "/dashboard/register", icon: LogIn, label: "New Registation" },
];


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
              <p className="font-semibold">{user?.fullName ||"" }</p>
              <p className="text-xs text-gray-400">{user?.email ||""}</p>
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
                end={item.to === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
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
                      className={
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }
                    />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={16} />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Right Side Content */}
      <main className=" overflow-x-hidden flex-1 min-h-screen ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;









