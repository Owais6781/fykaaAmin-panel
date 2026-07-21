



import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  User,
  LayoutDashboard,
  ShoppingCart,
  Package,
  // LogIn,
  LogOut,
  ChevronDown,
  Menu,
  ShieldUser,
  Settings,
  FileText,
  Megaphone,

} from "lucide-react";
import { FaChartBar } from "react-icons/fa";

import { HiOutlineUsers } from "react-icons/hi";
import DashboardHeader from "./Header";


const AdminLayout = () => {

  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const storedAdmin = localStorage.getItem("admin");
  const user = storedAdmin ? JSON.parse(storedAdmin) : null;
  const role = user?.role;
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login", { replace: true });
  };

  


  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["Admin", "SuperAdmin"], },
    { to: "/dashboard/order-list", icon: ShoppingCart, label: "Order", roles: ["Admin", "SuperAdmin"], },
    {
      to: "/", icon: Package, label: "Inventory",
      roles: ["Admin", "SuperAdmin"],
      children: [
        { to: "/dashboard/inventory", label: "All Products", roles: ["Admin", "SuperAdmin"], },
        { to: "/dashboard/form", label: "Add Product", roles: ["Admin", "SuperAdmin"], },
        { to: "/dashboard/categories", label: "Categories", roles: ["SuperAdmin"], },
        { to: "/dashboard/Reviews", label: "Reviews List", roles: ["Admin", "SuperAdmin"], },
      ],
    },
    // { to: "/dashboard/form", icon: Package, label: "Add Product" },
    // { to: "/dashboard/register", icon: LogIn, label: "New Registration" },
    { to: "/dashboard/customer-list", icon: HiOutlineUsers, label: "Customers", roles: ["SuperAdmin"], },
    {
      to: "//", icon: Megaphone, label: "Marketing",
      roles: [ "Admin","SuperAdmin"],
      children: [
        { to: "/", label: "Coupons", roles: [ "SuperAdmin"], },
        { to: "/", label: "Banners", roles: [ "Admin","SuperAdmin"], },
        { to: "/", label: "Featured Product", roles: [ "Admin","SuperAdmin"], },

      ],
    },
    {
      to: "/", icon: FileText, label: "Content",
      roles: ["SuperAdmin"],
      children: [
        { to: "/", label: "Abouts ", roles: ["SuperAdmin"], },
        { to: "/", label: "Contents", roles: ["SuperAdmin"], },
        { to: "/", label: "Page", roles: ["SuperAdmin"], },
      ],
    },
    {
      to: "/", icon: FaChartBar, label: "Reports",
      roles: ["Admin", "SuperAdmin"],
      children: [
        { to: "/dashboard/SalesReport", label: "Sales Reports", roles: ["Admin", "SuperAdmin"], },
        { to: "/dashboard/RevenueReport", label: " Revenue Reports", roles: ["SuperAdmin"], },
        { to: "/dashboard/ProductReports", label: "Product Reports", roles: ["Admin", "SuperAdmin"], },

      ],
    },
    {
      to: "/", icon: Settings, label: "Settings",
      roles: ["Admin","SuperAdmin"],
      children: [
        // { to: "/dashboard/SellerRegister", label: "Seller ", roles: ["admin", "SuperAdmin"], },
        { to: "/dashboard/generalSetting", label: "General ", roles: ["Admin", "SuperAdmin"], },
        { to: "/", label: "Payment", roles: ["Admin", "SuperAdmin"], },
        { to: "/", label: "Shipping", roles: ["Admin", "SuperAdmin"], },
        { to: "/", label: "Notifications", roles: ["Admin", "SuperAdmin"], },

      ],
    },
    {
      to: "/", icon: ShieldUser, label: "Admins",
      roles: [ "SuperAdmin"],
      children: [
        { to: "/dashboard/Role-And-Permission", label: "Roles & Permission", roles: [ "SuperAdmin"], },
        { to: "/", label: "Activity Log", roles: ["SuperAdmin"], },
      ],
    },
    { to: "/dashboard/Test", icon: ShieldUser, label: "Test" },


  ];





  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;

    return item.roles.includes(role);
  });

  const Sidebar = () => (
    <div className="w-64 bg-gray-900 text-white h-screen  flex flex-col ">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-center">
          <span className="text-blue-500">Admin</span> Panel
        </h1>
      </div>

      {/* Nav */}

      {filteredNavItems.map((item, index) => {
        if (item.children) {

          const children = item.children?.filter(
            (child) => !child.roles || child.roles.includes(role)
          ) || [];

          return (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenMenu(openMenu === index ? null : index)
                }
                className="overflow-y-auto  w-full flex items-center justify-between p-3 rounded-lg text-gray-300 hover:bg-gray-800 "
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>

                <ChevronDown
                  size={16}
                  className={`transition-transform ${openMenu === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openMenu === index && (
                <div className="ml-9 mt-1 flex flex-col gap-1 ">
                  {children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm  ${isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:bg-gray-800"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg  ${isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        );
      })}

      {/* User */}
      {/* <div className="p-4 border-t border-gray-700     ">
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
      </div> */}

      {/* <div className="p-4 border-t border-gray-700 relative "> */}
        <div className="mt-auto border-t border-gray-700 p-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowLogout(true)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <User size={18} />
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <ChevronDown size={14} />
        </div>

        {showLogout && (
          <>
  
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowLogout(false)}
            />


            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
  <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <LogOut className="h-5 w-5 text-red-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Logout
          </h2>
          <p className="text-sm text-gray-500">
            End your current session
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowLogout(false)}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
      >
        ✕
      </button>
    </div>

    {/* Body */}
    <div className="px-6 py-5">
      <p className="text-sm leading-6 text-gray-600">
        Are you sure you want to sign out of your account?
        You will need to sign in again to access the dashboard.
      </p>
    </div>

    {/* Footer */}
    <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
      <button
        onClick={() => setShowLogout(false)}
        className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
      >
        No
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 transition"
      >
        Yes
      </button>
    </div>
  </div>
</div>
          </>
        )}
      </div> 
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-y-auto">

      {/* 🔥 Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-64 z-40">
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







