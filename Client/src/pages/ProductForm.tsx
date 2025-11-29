import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Save } from "lucide-react";
import { toast } from "sonner@2.0.3";

export const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    price: "",
    stockQuantity: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast.success("محصول با موفقیت ثبت شد");
    navigate("/products");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/products")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">افزودن محصول جدید</h1>
          <p className="text-gray-600">اطلاعات محصول را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg text-gray-900 mb-4">اطلاعات محصول</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                نام محصول *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="نام محصول را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                توضیحات *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="توضیحات محصول را وارد کنید"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  کد SKU *
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="PROD-001"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  قیمت (تومان) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  موجودی *
                </label>
                <input
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) =>
                    setFormData({ ...formData, stockQuantity: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>ذخیره محصول</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
