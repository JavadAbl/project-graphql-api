import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Save, Plus, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  mockCustomers,
  mockProducts,
  mockBranches,
  mockAddresses,
} from "../data/mockData";

interface FactorItem {
  productId: number;
  quantity: number;
  unitPrice: number;
}

export const FactorForm: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("نقدی");
  const [status, setStatus] = useState("در انتظار تایید");
  const [items, setItems] = useState<FactorItem[]>([
    { productId: 0, quantity: 1, unitPrice: 0 },
  ]);

  const customerAddresses = mockAddresses.filter(
    (addr) => addr.customerId === Number(selectedCustomerId)
  );

  const addItem = () => {
    setItems([...items, { productId: 0, quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (
    index: number,
    field: keyof FactorItem,
    value: number
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Auto-fill unit price when product is selected
    if (field === "productId") {
      const product = mockProducts.find((p) => p.id === value);
      if (product) {
        newItems[index].unitPrice = product.price;
      }
    }

    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCustomerId || !selectedBranchId) {
      toast.error("لطفا مشتری و شعبه را انتخاب کنید");
      return;
    }

    const hasInvalidItems = items.some(
      (item) => item.productId === 0 || item.quantity <= 0
    );
    if (hasInvalidItems) {
      toast.error("لطفا همه محصولات را به درستی انتخاب کنید");
      return;
    }

    // Mock save
    toast.success("فاکتور با موفقیت ثبت شد");
    navigate("/factors");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/factors")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">ثبت فاکتور جدید</h1>
          <p className="text-gray-600">اطلاعات فاکتور و محصولات را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Factor Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg text-gray-900 mb-4">اطلاعات فاکتور</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                مشتری *
              </label>
              <select
                value={selectedCustomerId}
                onChange={(e) => {
                  setSelectedCustomerId(e.target.value);
                  setSelectedAddressId("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">انتخاب مشتری</option>
                {mockCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName} - {customer.phone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">شعبه *</label>
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">انتخاب شعبه</option>
                {mockBranches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                آدرس تحویل
              </label>
              <select
                value={selectedAddressId}
                onChange={(e) => setSelectedAddressId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={!selectedCustomerId}
              >
                <option value="">بدون آدرس تحویل</option>
                {customerAddresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.addressLine1}, {address.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                روش پرداخت *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="نقدی">نقدی</option>
                <option value="کارت به کارت">کارت به کارت</option>
                <option value="چک">چک</option>
                <option value="اقساطی">اقساطی</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                وضعیت *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="در انتظار تایید">در انتظار تایید</option>
                <option value="در حال پردازش">در حال پردازش</option>
                <option value="تکمیل شده">تکمیل شده</option>
              </select>
            </div>
          </div>
        </div>

        {/* Factor Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              محصولات فاکتور
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">افزودن محصول</span>
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-700 mb-2">
                        محصول *
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) =>
                          updateItem(index, "productId", Number(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value={0}>انتخاب محصول</option>
                        {mockProducts.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {formatPrice(product.price)} تومان
                            (موجودی: {product.stockQuantity})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        تعداد *
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(index, "quantity", Number(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">
                        قیمت واحد (تومان) *
                      </label>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(index, "unitPrice", Number(e.target.value))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="block text-sm text-gray-700 mb-2 opacity-0">
                      حذف
                    </label>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Item Total */}
                {item.productId > 0 && item.quantity > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">جمع:</span>
                      <span className="text-gray-900">
                        {formatPrice(item.quantity * item.unitPrice)} تومان
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div className="mt-6 pt-6 border-t-2 border-gray-300">
            <div className="flex justify-between items-center">
              <span className="text-lg text-gray-900">مجموع کل:</span>
              <span className="text-2xl text-blue-600">
                {formatPrice(calculateTotal())} تومان
              </span>
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
            <span>ذخیره فاکتور</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/factors")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
