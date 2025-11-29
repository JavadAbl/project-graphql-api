import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import type { Address } from "../types";

export const CustomerForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState<Partial<Address>[]>([
    {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "ایران",
      addressType: "منزل",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save
    toast.success("مشتری با موفقیت ثبت شد");
    navigate("/customers");
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "ایران",
        addressType: "منزل",
      },
    ]);
  };

  const removeAddress = (index: number) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter((_, i) => i !== index));
    }
  };

  const updateAddress = (index: number, field: string, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddresses(newAddresses);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/customers")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">افزودن مشتری جدید</h1>
          <p className="text-gray-600">اطلاعات مشتری را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg text-gray-900 mb-4">اطلاعات شخصی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">نام *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="نام را وارد کنید"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                نام خانوادگی *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="نام خانوادگی را وارد کنید"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                شماره تلفن *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="09121234567"
                dir="ltr"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                ایمیل *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
                dir="ltr"
                required
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">آدرس‌ها</h2>
            <button
              type="button"
              onClick={addAddress}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">افزودن آدرس</span>
            </button>
          </div>

          <div className="space-y-6">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">آدرس {index + 1}</h3>
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      آدرس خط اول *
                    </label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={(e) =>
                        updateAddress(index, "addressLine1", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="خیابان، کوچه، پلاک"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-2">
                      آدرس خط دوم
                    </label>
                    <input
                      type="text"
                      value={address.addressLine2}
                      onChange={(e) =>
                        updateAddress(index, "addressLine2", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="واحد، طبقه"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      شهر *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        updateAddress(index, "city", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="تهران"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      استان *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        updateAddress(index, "state", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="تهران"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      کد پستی *
                    </label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) =>
                        updateAddress(index, "postalCode", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234567890"
                      dir="ltr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      نوع آدرس *
                    </label>
                    <select
                      value={address.addressType}
                      onChange={(e) =>
                        updateAddress(index, "addressType", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="منزل">منزل</option>
                      <option value="محل کار">محل کار</option>
                      <option value="دیگر">دیگر</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>ذخیره مشتری</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/customers")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
