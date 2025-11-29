import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { mockCustomers } from "../data/mockData";

export const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState(mockCustomers);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.firstName.includes(searchTerm) ||
      customer.lastName.includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      customer.email.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">مشتریان</h1>
          <p className="text-gray-600">مدیریت اطلاعات مشتریان</p>
        </div>
        <Link
          to="/customers/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>افزودن مشتری</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو بر اساس نام، تلفن یا ایمیل..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                  {customer.firstName[0]}
                  {customer.lastName[0]}
                </div>
                <div>
                  <h3 className="text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    کد مشتری: {customer.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span dir="ltr" className="text-left flex-1">
                  {customer.phone}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{customer.email}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Link
                to={`/customers/${customer.id}`}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">ویرایش</span>
              </Link>
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">مشتری‌ای یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا مشتری جدیدی اضافه کنید
          </p>
        </div>
      )}
    </div>
  );
};
