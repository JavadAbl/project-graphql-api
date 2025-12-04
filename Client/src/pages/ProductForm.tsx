import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";

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
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/products")}
          className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <ArrowRight className="h-6 text-gray-600 w-6" />
        </button>
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">افزودن محصول جدید</h1>
          <p className="text-gray-600">اطلاعات محصول را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Info */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <h2 className="mb-4 text-gray-900 text-lg">اطلاعات محصول</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-700 text-sm">
                نام محصول *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="نام محصول را وارد کنید"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700 text-sm">
                توضیحات *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 resize-none rounded-lg w-full"
                placeholder="توضیحات محصول را وارد کنید"
                rows={3}
                required
              />
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
              <div>
                <label className="block mb-2 text-gray-700 text-sm">
                  کد SKU *
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                  placeholder="PROD-001"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 text-sm">
                  قیمت (تومان) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 text-sm">
                  موجودی *
                </label>
                <input
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) =>
                    setFormData({ ...formData, stockQuantity: e.target.value })
                  }
                  className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-6 py-3 rounded-lg text-white transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>ذخیره محصول</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-700 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
