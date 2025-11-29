import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, MapPin, Phone, Edit, Trash2 } from "lucide-react";
import { mockBranches } from "../data/mockData";

export const Branches: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branches] = useState(mockBranches);

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.includes(searchTerm) ||
      branch.phone.includes(searchTerm) ||
      branch.location.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">شعبه‌ها</h1>
          <p className="text-gray-600">مدیریت شعبات فروشگاه</p>
        </div>
        <Link
          to="/branches/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>افزودن شعبه</span>
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
            placeholder="جستجو بر اساس نام، تلفن یا موقعیت..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Branch Header */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">{branch.name}</h3>
                <p className="text-sm text-gray-500">کد شعبه: {branch.id}</p>
              </div>
            </div>

            {/* Branch Info */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{branch.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span dir="ltr">{branch.phone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Link
                to={`/branches/${branch.id}`}
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
      {filteredBranches.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">شعبه‌ای یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا شعبه جدیدی اضافه کنید
          </p>
        </div>
      )}
    </div>
  );
};
