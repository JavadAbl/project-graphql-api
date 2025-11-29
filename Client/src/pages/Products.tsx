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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">محصولات</h1>
          <p className="text-gray-600">مدیریت محصولات و موجودی انبار</p>
        </div>
        <Link
          to="/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>افزودن محصول</span>
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
            placeholder="جستجو بر اساس نام، کد محصول یا توضیحات..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  محصول
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  کد SKU
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  قیمت
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  موجودی
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">
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
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        موجود
                      </span>
                    ) : product.stockQuantity > 0 ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        کم موجود
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        ناموجود
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/products/${product.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
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
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">محصولی یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا محصول جدیدی اضافه کنید
          </p>
        </div>
      )}
    </div>
  );
};
