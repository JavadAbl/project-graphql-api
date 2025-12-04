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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">شعبه‌ها</h1>
          <p className="text-gray-600">مدیریت شعبات فروشگاه</p>
        </div>
        <Link
          to="/branches/new"
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-4 py-2 rounded-lg text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>افزودن شعبه</span>
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
            placeholder="جستجو بر اساس نام، تلفن یا موقعیت..."
            className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Branches Grid */}
      <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        {filteredBranches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white border border-gray-200 hover:shadow-lg p-6 rounded-xl transition-shadow"
          >
            {/* Branch Header */}
            <div className="flex gap-3 items-start mb-4">
              <div className="bg-gradient-to-br flex flex-shrink-0 from-orange-500 h-12 items-center justify-center rounded-full text-white to-red-600 w-12">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1 text-gray-900">{branch.name}</h3>
                <p className="text-gray-500 text-sm">کد شعبه: {branch.id}</p>
              </div>
            </div>

            {/* Branch Info */}
            <div className="mb-4 space-y-3">
              <div className="flex gap-2 items-start text-gray-600 text-sm">
                <MapPin className="flex-shrink-0 h-4 mt-0.5 w-4" />
                <span>{branch.location}</span>
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4" />
                <span dir="ltr">{branch.phone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="border-gray-200 border-t flex gap-2 pt-4">
              <Link
                to={`/branches/${branch.id}`}
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
      {filteredBranches.length === 0 && (
        <div className="bg-white border border-gray-200 p-12 rounded-xl text-center">
          <div className="bg-gray-100 flex h-16 items-center justify-center mb-4 mx-auto rounded-full w-16">
            <Search className="h-8 text-gray-400 w-8" />
          </div>
          <h3 className="mb-2 text-gray-900">شعبه‌ای یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا شعبه جدیدی اضافه کنید
          </p>
        </div>
      )}
    </div>
  );
};
