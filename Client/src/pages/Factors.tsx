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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">فاکتورها</h1>
          <p className="text-gray-600">مدیریت فاکتورها و سفارشات</p>
        </div>
        <Link
          to="/factors/new"
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-4 py-2 rounded-lg text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>ثبت فاکتور جدید</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <Search className="-translate-y-1/2 absolute h-5 right-3 text-gray-400 top-1/2 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو بر اساس شماره فاکتور یا نام مشتری..."
              className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 rounded-lg w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="تکمیل شده">تکمیل شده</option>
            <option value="در حال پردازش">در حال پردازش</option>
            <option value="در انتظار تایید">در انتظار تایید</option>
          </select>
        </div>
      </div>

      {/* Factors Table */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  شماره فاکتور
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  مشتری
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  شعبه
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  تاریخ
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  مبلغ کل
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  روش پرداخت
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  وضعیت
                </th>
                <th className="px-6 py-4 text-center text-gray-600 text-sm">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="divide-gray-200 divide-y">
              {filteredFactors.map((factor) => (
                <tr key={factor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <FileText className="h-4 text-blue-600 w-4" />
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
                    <div className="flex gap-2 items-center text-gray-600">
                      <Calendar className="h-4 w-4" />
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
                        className="hover:bg-blue-50 p-2 rounded-lg text-blue-600 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
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
        <div className="bg-white border border-gray-200 p-12 rounded-xl text-center">
          <div className="bg-gray-100 flex h-16 items-center justify-center mb-4 mx-auto rounded-full w-16">
            <Search className="h-8 text-gray-400 w-8" />
          </div>
          <h3 className="mb-2 text-gray-900">فاکتوری یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا فاکتور جدیدی ثبت کنید
          </p>
        </div>
      )}
    </div>
  );
};
