



import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  User,
  LayoutDashboard,
  ShoppingCart,
  Package,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,

} from "lucide-react";

import DashboardHeader from "./Header";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const storedAdmin = localStorage.getItem("admin");
  const user = storedAdmin ? JSON.parse(storedAdmin) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/dashboard/order-list", icon: ShoppingCart, label: "Order" },
    { to: "/dashboard/inventory", icon: Package, label: "Inventory" },
    { to: "/dashboard/form", icon: Package, label: "Add Product" },
    { to: "/dashboard/register", icon: LogIn, label: "New Registration" },
    { to: "/dashboard/customer-list", icon: User, label: "Customer" },
  ];

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 text-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-center">
          <span className="text-blue-500">Admin</span> Panel
        </h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-700">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowLogout(!showLogout)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <User size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <ChevronDown
            size={14}
            className={`${showLogout ? "rotate-180" : ""}`}
          />
        </div>

        {showLogout && (
          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center gap-2 text-red-400 hover:text-red-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 Desktop Sidebar */}
      <div className="hidden md:block fixed h-full">
        <Sidebar />
      </div>

      {/* 🔥 Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-gray-900 text-white">
            <Sidebar />
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 md:ml-64 h-16 bg-white border-b z-40 flex items-center px-4">
        <button
          className="md:hidden mr-3"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </button>

        <div className="flex-1">
          <DashboardHeader />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 mt-16 md:ml-64 p-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;







