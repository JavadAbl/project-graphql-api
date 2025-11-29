import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Eye, FileText, Calendar } from "lucide-react";
import { mockFactors, mockCustomers, mockBranches } from "../data/mockData";

export const Factors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [factors] = useState(mockFactors);

  const getCustomerName = (customerId: number) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    return customer ? `${customer.firstName} ${customer.lastName}` : "نامشخص";
  };

  const getBranchName = (branchId: number) => {
    const branch = mockBranches.find((b) => b.id === branchId);
    return branch ? branch.name : "نامشخص";
  };

  const filteredFactors = factors.filter((factor) => {
    const matchesSearch =
      factor.id.toString().includes(searchTerm) ||
      getCustomerName(factor.customerId).includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || factor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">فاکتورها</h1>
          <p className="text-gray-600">مدیریت فاکتورها و سفارشات</p>
        </div>
        <Link
          to="/factors/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>ثبت فاکتور جدید</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو بر اساس شماره فاکتور یا نام مشتری..."
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="تکمیل شده">تکمیل شده</option>
            <option value="در حال پردازش">در حال پردازش</option>
            <option value="در انتظار تایید">در انتظار تایید</option>
          </select>
        </div>
      </div>

      {/* Factors Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  شماره فاکتور
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  مشتری
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  شعبه
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  تاریخ
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  مبلغ کل
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  روش پرداخت
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  وضعیت
                </th>
                <th className="px-6 py-4 text-center text-sm text-gray-600">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFactors.map((factor) => (
                <tr key={factor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-900">#{factor.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {getCustomerName(factor.customerId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">
                      {getBranchName(factor.branchId)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(factor.factorDate).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {formatPrice(factor.totalAmount)} تومان
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">
                      {factor.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(
                        factor.status
                      )}`}
                    >
                      {factor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <Link
                        to={`/factors/${factor.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredFactors.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">فاکتوری یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا فاکتور جدیدی ثبت کنید
          </p>
        </div>
      )}
    </div>
  );
};
