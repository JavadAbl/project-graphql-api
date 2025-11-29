import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Users,
  Package,
  FileText,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";
import { mockCustomers, mockProducts, mockFactors } from "../data/mockData";

export const Dashboard: React.FC = () => {
  const { user, isManager } = useAuth();

  const totalRevenue = mockFactors.reduce(
    (sum, factor) => sum + factor.totalAmount,
    0
  );
  const pendingFactors = mockFactors.filter(
    (f) => f.status === "در انتظار تایید"
  ).length;

  const stats = [
    {
      title: "کل فروش",
      value: `${(totalRevenue / 1000000).toFixed(1)} میلیون`,
      icon: DollarSign,
      color: "bg-green-500",
      show: true,
    },
    {
      title: "تعداد فاکتور",
      value: mockFactors.length.toString(),
      icon: FileText,
      color: "bg-blue-500",
      show: true,
    },
    {
      title: "مشتریان",
      value: mockCustomers.length.toString(),
      icon: Users,
      color: "bg-purple-500",
      show: true,
    },
    {
      title: "محصولات",
      value: mockProducts.length.toString(),
      icon: Package,
      color: "bg-orange-500",
      show: isManager,
    },
  ];

  const recentFactors = mockFactors.slice(0, 5);

  const quickActions = [
    {
      title: "ثبت فاکتور جدید",
      description: "ایجاد فاکتور برای مشتری",
      icon: ShoppingCart,
      link: "/factors/new",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
      show: true,
    },
    {
      title: "افزودن مشتری",
      description: "ثبت مشتری جدید",
      icon: Users,
      link: "/customers/new",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
      show: true,
    },
    {
      title: "افزودن محصول",
      description: "ثبت محصول جدید",
      icon: Package,
      link: "/products/new",
      color: "bg-orange-50 text-orange-600 hover:bg-orange-100",
      show: isManager,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تکمیل شده":
        return "bg-green-100 text-green-800";
      case "در حال پردازش":
        return "bg-blue-100 text-blue-800";
      case "در انتظار تایید":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">
          خوش آمدید، {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-600">خلاصه‌ای از فعالیت‌های امروز</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(
          (stat) =>
            stat.show && (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl text-gray-900">{stat.value}</p>
                  </div>
                  <div
                    className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg text-gray-900 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map(
            (action) =>
              action.show && (
                <Link
                  key={action.title}
                  to={action.link}
                  className={`${action.color} p-6 rounded-xl border border-gray-200 transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <action.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="mb-1">{action.title}</h3>
                      <p className="text-sm opacity-80">{action.description}</p>
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>

      {/* Recent Factors & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Factors */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">آخرین فاکتورها</h2>
            <Link
              to="/factors"
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              مشاهده همه
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentFactors.map((factor) => (
              <Link
                key={factor.id}
                to={`/factors/${factor.id}`}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-900">فاکتور #{factor.id}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        factor.status
                      )}`}
                    >
                      {factor.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(factor.factorDate).toLocaleDateString("fa-IR")}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-gray-900">
                    {(factor.totalAmount / 1000000).toFixed(1)} میلیون تومان
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Alerts & Summary */}
        <div className="space-y-6">
          {/* Pending Alert */}
          {pendingFactors > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-yellow-900 mb-1">نیاز به بررسی</h3>
                  <p className="text-sm text-yellow-700">
                    {pendingFactors} فاکتور در انتظار تایید است
                  </p>
                  <Link
                    to="/factors"
                    className="text-sm text-yellow-900 hover:underline mt-2 inline-block"
                  >
                    مشاهده فاکتورها
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Summary Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h3 className="mb-4">خلاصه عملکرد</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">کل مشتریان</span>
                <span className="text-xl">{mockCustomers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">فاکتورهای امروز</span>
                <span className="text-xl">
                  {
                    mockFactors.filter(
                      (f) =>
                        new Date(f.factorDate).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-400">
                <span className="text-blue-100">فروش امروز</span>
                <span className="text-xl">0 تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
