import React, { useState } from "react";
import { Link } from "react-router";
import {
  Plus,
  Search,
  Edit,
  Lock,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { toast } from "sonner";
import { userService } from "../data/userService";
import { useQuery } from "@apollo/client/react";
import { User_Query_GetUsersDocument } from "../gql/graphql";

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const { data: usersData } = useQuery(User_Query_GetUsersDocument);
  const users = usersData?.users || [];

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.includes(searchTerm) ||
      user.lastName.includes(searchTerm) ||
      user.username.includes(searchTerm)
  );

  const handleToggleActive = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    if (user.role === "Manager" && user.isActive) {
      const activeManagers = users.filter(
        (u) => u.role === "Manager" && u.isActive
      ).length;
      if (activeManagers <= 1) {
        toast.error("حداقل یک مدیر فعال باید در سیستم وجود داشته باشد");
        return;
      }
    }

    userService.toggleActive(id);
    setUsers(userService.getAll());
    toast.success(user.isActive ? "کاربر غیرفعال شد" : "کاربر فعال شد");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId || !newPassword) return;

    if (newPassword.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    userService.changePassword(selectedUserId, newPassword);
    toast.success("رمز عبور با موفقیت تغییر کرد");
    setShowPasswordModal(false);
    setSelectedUserId(null);
    setNewPassword("");
  };

  const openPasswordModal = (userId: number) => {
    setSelectedUserId(userId);
    setNewPassword("");
    setShowPasswordModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">کاربران سیستم</h1>
          <p className="text-gray-600">مدیریت کاربران و دسترسی‌ها</p>
        </div>

        <Link
          to="/users/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>افزودن کاربر</span>
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
            placeholder="جستجو بر اساس نام، نام خانوادگی یا نام کاربری..."
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  کاربر
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  نام کاربری
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  نقش
                </th>
                <th className="px-6 py-4 text-right text-sm text-gray-600">
                  شعبه
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${
                          user.role === "Manager"
                            ? "bg-gradient-to-br from-purple-500 to-pink-600"
                            : "bg-gradient-to-br from-blue-500 to-cyan-600"
                        } rounded-full flex items-center justify-center text-white`}
                      >
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <p className="text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-gray-500">کد: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700" dir="ltr">
                      {user.username}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.role === "Manager"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role === "Manager" ? "مدیر" : "اپراتور"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{user.branch?.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "فعال" : "غیرفعال"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/users/${user.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="ویرایش"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openPasswordModal(user.id)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="تغییر رمز عبور"
                      >
                        <Lock className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(user.id)}
                        className={`p-2 ${
                          user.isActive
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                        } rounded-lg transition-colors`}
                        title={user.isActive ? "غیرفعال کردن" : "فعال کردن"}
                      >
                        {user.isActive ? (
                          <ToggleRight className="w-4 h-4" />
                        ) : (
                          <ToggleLeft className="w-4 h-4" />
                        )}
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
      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">کاربری یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا کاربر جدیدی اضافه کنید
          </p>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900">تغییر رمز عبور</h2>
                <p className="text-sm text-gray-600">
                  رمز عبور جدید را وارد کنید
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  رمز عبور جدید *
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  تغییر رمز عبور
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setSelectedUserId(null);
                    setNewPassword("");
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
