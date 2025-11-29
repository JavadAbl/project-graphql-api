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
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Close Button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h1 className="text-xl text-blue-600">سیستم فاکتور</h1>
              <p className="text-sm text-gray-500 mt-1">مدیریت فروش</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                {user?.firstName[0]}
              </div>
              <div>
                <p className="text-sm">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === "Manager" ? "مدیر" : "اپراتور"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map(
                (item) =>
                  item.show && (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 lg:p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <p className="text-gray-600">
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
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
