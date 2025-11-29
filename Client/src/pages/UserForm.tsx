import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowRight, Save, UserCog } from "lucide-react";
import { toast } from "sonner";
import { userService } from "../data/userService";
import { mockBranches } from "../data/mockData";

export const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "Operator" as "Manager" | "Operator",
    branchId: "",
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      const user = userService.getById(Number(id));
      if (user) {
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: "",
          role: user.role,
          branchId: user.branchId?.toString() || "",
          isActive: user.isActive,
        });
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!isEdit && !formData.password) {
      toast.error("رمز عبور الزامی است");
      return;
    }

    if (!isEdit && formData.password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    // Check username uniqueness
    const allUsers = userService.getAll();
    const usernameExists = allUsers.some(
      (u) => u.username === formData.username && u.id !== Number(id)
    );

    if (usernameExists) {
      toast.error("این نام کاربری قبلاً استفاده شده است");
      return;
    }

    if (isEdit) {
      // Update existing user
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        role: formData.role,
        branchId: formData.branchId ? Number(formData.branchId) : undefined,
        isActive: formData.isActive,
      };

      userService.update(Number(id), updateData);
      toast.success("کاربر با موفقیت ویرایش شد");
    } else {
      // Create new user
      userService.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        role: formData.role,
        branchId: formData.branchId ? Number(formData.branchId) : undefined,
        isActive: formData.isActive,
      });
      toast.success("کاربر با موفقیت ثبت شد");
    }

    navigate("/users");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/users")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowRight className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">
            {isEdit ? "ویرایش کاربر" : "افزودن کاربر جدید"}
          </h1>
          <p className="text-gray-600">اطلاعات کاربر را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCog className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-lg text-gray-900">اطلاعات کاربری</h2>
          </div>

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
                نام کاربری *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="username"
                dir="ltr"
                required
              />
            </div>

            {!isEdit && (
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  رمز عبور *
                </label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-gray-700 mb-2">نقش *</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "Manager" | "Operator",
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Operator">اپراتور</option>
                <option value="Manager">مدیر</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">شعبه</label>
              <select
                value={formData.branchId}
                onChange={(e) =>
                  setFormData({ ...formData, branchId: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">بدون شعبه</option>
                {mockBranches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {isEdit && (
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">کاربر فعال است</span>
                </label>
              </div>
            )}
          </div>

          {isEdit && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>توجه:</strong> برای تغییر رمز عبور این کاربر، از صفحه
                لیست کاربران استفاده کنید.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>{isEdit ? "ذخیره تغییرات" : "ذخیره کاربر"}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
