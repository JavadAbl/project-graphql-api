import React, { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Package, Edit, Trash2 } from "lucide-react";
import { mockProducts } from "../data/mockData";

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products] = useState(mockProducts);

  const filteredProducts = products.filter(
    (product) =>
      product.name.includes(searchTerm) ||
      product.sku.includes(searchTerm) ||
      product.description.includes(searchTerm)
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">محصولات</h1>
          <p className="text-gray-600">مدیریت محصولات و موجودی انبار</p>
        </div>
        <Link
          to="/products/new"
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-4 py-2 rounded-lg text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>افزودن محصول</span>
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
            placeholder="جستجو بر اساس نام، کد محصول یا توضیحات..."
            className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  محصول
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  کد SKU
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  قیمت
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  موجودی
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="bg-blue-100 flex h-10 items-center justify-center rounded-lg w-10">
                        <Package className="h-5 text-blue-600 w-5" />
                      </div>
                      <div>
                        <p className="text-gray-900">{product.name}</p>
                        <p className="text-gray-500 text-sm">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700" dir="ltr">
                      {product.sku}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {formatPrice(product.price)} تومان
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">
                      {product.stockQuantity} عدد
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.stockQuantity > 10 ? (
                      <span className="bg-green-100 inline-flex items-center px-2 py-1 rounded-full text-green-800 text-xs">
                        موجود
                      </span>
                    ) : product.stockQuantity > 0 ? (
                      <span className="bg-yellow-100 inline-flex items-center px-2 py-1 rounded-full text-xs text-yellow-800">
                        کم موجود
                      </span>
                    ) : (
                      <span className="bg-red-100 inline-flex items-center px-2 py-1 rounded-full text-red-800 text-xs">
                        ناموجود
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center justify-center">
                      <Link
                        to={`/products/${product.id}`}
                        className="hover:bg-blue-50 p-2 rounded-lg text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="hover:bg-red-50 p-2 rounded-lg text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="bg-white border border-gray-200 p-12 rounded-xl text-center">
          <div className="bg-gray-100 flex h-16 items-center justify-center mb-4 mx-auto rounded-full w-16">
            <Search className="h-8 text-gray-400 w-8" />
          </div>
          <h3 className="mb-2 text-gray-900">محصولی یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا محصول جدیدی اضافه کنید
          </p>
        </div>
      )}
    </div>
  );
};
