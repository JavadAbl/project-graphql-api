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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">مشتریان</h1>
          <p className="text-gray-600">مدیریت اطلاعات مشتریان</p>
        </div>
        <Link
          to="/customers/new"
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-4 py-2 rounded-lg text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>افزودن مشتری</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <div className="relative">
          <Search className="-translate-y-1/2 absolute h-5 right-3 text-gray-400 top-1/2 w-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو بر اساس نام، تلفن یا ایمیل..."
            className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Customers Grid */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white border border-gray-200 hover:shadow-lg p-6 rounded-xl transition-shadow"
          >
            {/* Customer Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3 items-center">
                <div className="bg-gradient-to-br flex from-blue-500 h-12 items-center justify-center rounded-full text-white to-purple-600 w-12">
                  {customer.firstName[0]}
                  {customer.lastName[0]}
                </div>
                <div>
                  <h3 className="text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    کد مشتری: {customer.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mb-4 space-y-2">
              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4" />
                <span dir="ltr" className="flex-1 text-left">
                  {customer.phone}
                </span>
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4" />
                <span className="truncate">{customer.email}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="border-gray-200 border-t flex gap-2 pt-4">
              <Link
                to={`/customers/${customer.id}`}
                className="bg-blue-50 flex flex-1 gap-2 hover:bg-blue-100 items-center justify-center px-3 py-2 rounded-lg text-blue-600 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span className="text-sm">ویرایش</span>
              </Link>
              <button className="bg-red-50 flex gap-2 hover:bg-red-100 items-center justify-center px-3 py-2 rounded-lg text-red-600 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="bg-white border border-gray-200 p-12 rounded-xl text-center">
          <div className="bg-gray-100 flex h-16 items-center justify-center mb-4 mx-auto rounded-full w-16">
            <Search className="h-8 text-gray-400 w-8" />
          </div>
          <h3 className="mb-2 text-gray-900">مشتری‌ای یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا مشتری جدیدی اضافه کنید
          </p>
        </div>
      )}
    </div>
  );
};
