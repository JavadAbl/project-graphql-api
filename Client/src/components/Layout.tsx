import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Package,
  MapPin,
  FileText,
  LogOut,
  Menu,
  X,
  UserCog,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isManager } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", label: "داشبورد", icon: LayoutDashboard, show: true },
    { path: "/customers", label: "مشتریان", icon: Users, show: true },
    { path: "/factors", label: "فاکتورها", icon: FileText, show: true },
    { path: "/products", label: "محصولات", icon: Package, show: isManager },
    { path: "/branches", label: "شعبه‌ها", icon: MapPin, show: isManager },
    { path: "/users", label: "کاربران", icon: UserCog, show: isManager },
  ];

  return (
    <div className="bg-gray-50 flex min-h-screen" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="border-b border-gray-200 flex items-center justify-between p-4">
            <div>
              <h1 className="text-blue-600 text-lg">سیستم فاکتور</h1>
              <p className="mt-0.5 text-gray-500 text-xs">مدیریت فروش</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="hover:text-gray-700 lg:hidden text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 border-b border-gray-200 p-3">
            <div className="flex gap-3 items-center">
              <div className="bg-blue-600 flex h-10 items-center justify-center rounded-full text-white w-10">
                {user?.firstName[0]}
              </div>
              <div>
                <p className="text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-gray-500 text-xs">
                  {user?.role === "Manager" ? "مدیر" : "اپراتور"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {menuItems.map(
                (item) =>
                  item.show && (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </nav>

          {/* Logout */}
          <div className="border-gray-200 border-t p-3">
            <button
              onClick={handleLogout}
              className="flex gap-3 hover:bg-red-50 items-center px-3 py-2.5 rounded-lg text-red-600 transition-colors w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="bg-black bg-opacity-50 fixed inset-0 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 lg:px-6 lg:py-4 px-4 py-3">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="hover:text-gray-900 lg:hidden text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">
                {new Date().toLocaleDateString("fa-IR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 lg:p-5 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};
