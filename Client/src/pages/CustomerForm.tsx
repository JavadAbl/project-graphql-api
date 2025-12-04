import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Address } from "../types";

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
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/customers")}
          className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <ArrowRight className="h-6 text-gray-600 w-6" />
        </button>
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">افزودن مشتری جدید</h1>
          <p className="text-gray-600">اطلاعات مشتری را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <h2 className="mb-4 text-gray-900 text-lg">اطلاعات شخصی</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-gray-700 text-sm">نام *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="نام را وارد کنید"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 text-sm">
                نام خانوادگی *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="نام خانوادگی را وارد کنید"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 text-sm">
                شماره تلفن *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="09121234567"
                dir="ltr"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 text-sm">
                ایمیل *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="example@email.com"
                dir="ltr"
                required
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 text-lg">آدرس‌ها</h2>
            <button
              type="button"
              onClick={addAddress}
              className="flex gap-2 hover:bg-blue-50 items-center px-3 py-2 rounded-lg text-blue-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">افزودن آدرس</span>
            </button>
          </div>

          <div className="space-y-6">
            {addresses.map((address, index) => (
              <div
                key={index}
                className="border border-gray-200 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">آدرس {index + 1}</h3>
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="hover:bg-red-50 p-2 rounded-lg text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-gray-700 text-sm">
                      آدرس خط اول *
                    </label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={(e) =>
                        updateAddress(index, "addressLine1", e.target.value)
                      }
                      className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                      placeholder="خیابان، کوچه، پلاک"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-2 text-gray-700 text-sm">
                      آدرس خط دوم
                    </label>
                    <input
                      type="text"
                      value={address.addressLine2}
                      onChange={(e) =>
                        updateAddress(index, "addressLine2", e.target.value)
                      }
                      className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                      placeholder="واحد، طبقه"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">
                      شهر *
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        updateAddress(index, "city", e.target.value)
                      }
                      className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                      placeholder="تهران"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">
                      استان *
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        updateAddress(index, "state", e.target.value)
                      }
                      className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                      placeholder="تهران"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">
                      کد پستی *
                    </label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) =>
                        updateAddress(index, "postalCode", e.target.value)
                      }
                      className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                      placeholder="1234567890"
                      dir="ltr"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700 text-sm">
                      نوع آدرس *
                    </label>
                    <select
                      value={address.addressType}
                      onChange={(e) =>
                        updateAddress(index, "addressType", e.target.value)
                      }
                      className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
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
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-6 py-3 rounded-lg text-white transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>ذخیره مشتری</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/customers")}
            className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-700 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
