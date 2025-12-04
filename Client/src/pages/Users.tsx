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
import { User_Query_GetUsersDocument, UserRoles } from "../gql/graphql";
import LoadingSpinner from "../components/loading-indicator";
import { cn } from "../components/ui/utils";

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");

  //Data----------------------------------------------------------------------
  const {
    data,
    loading: isLoadingQuery,
    refetch,
  } = useQuery(User_Query_GetUsersDocument);
  const users = data?.usersQuery.users?.items;

  const filteredUsers =
    users?.filter(
      (user) =>
        user.firstName.includes(searchTerm) ||
        user.lastName.includes(searchTerm) ||
        user.username.includes(searchTerm)
    ) ?? [];

  if (!users || isLoadingQuery) return <LoadingSpinner variant="spinner" />;

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

  if (!users || isLoadingQuery)
    return (
      <div className={cn("flex justify-center items-center h-full")}>
        <LoadingSpinner text="در حال بارگذاری.." />
      </div>
    );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl text-gray-900">کاربران سیستم</h1>
          <p className="text-gray-600">مدیریت کاربران و دسترسی‌ها</p>
        </div>
        <Link
          to="/users/new"
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-4 py-2 rounded-lg text-white transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>افزودن کاربر</span>
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
            placeholder="جستجو بر اساس نام، نام خانوادگی یا نام کاربری..."
            className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 rounded-lg w-full"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  کاربر
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  نام کاربری
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  نقش
                </th>
                <th className="px-6 py-4 text-gray-600 text-right text-sm">
                  شعبه
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div
                        className={`w-10 h-10 ${
                          user.role === UserRoles.Admin
                            ? "bg-linear-to-br from-purple-500 to-pink-600"
                            : "bg-linear-to-br from-blue-500 to-cyan-600"
                        } rounded-full flex items-center justify-center text-white`}
                      >
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </div>
                      <div>
                        <p className="text-gray-900">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-gray-500 text-sm">کد: {user.id}</p>
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
                        user.role === UserRoles.Admin
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role === UserRoles.Admin ? "مدیر" : "اپراتور"}
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
                    <div className="flex gap-2 items-center justify-center">
                      <Link
                        to={`/users/${user.id}`}
                        className="hover:bg-blue-50 p-2 rounded-lg text-blue-600 transition-colors"
                        title="ویرایش"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() => openPasswordModal(user.id)}
                        className="cursor-pointer hover:bg-purple-50 p-2 rounded-lg text-purple-600 transition-colors"
                        title="تغییر رمز عبور"
                      >
                        <Lock className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleToggleActive(user.id)}
                        className={`p-2 ${
                          user.isActive
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                        } rounded-lg transition-colors cursor-pointer`}
                        title={user.isActive ? "غیرفعال کردن" : "فعال کردن"}
                      >
                        {user.isActive ? (
                          <ToggleRight className="h-4 w-4" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
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
        <div className="bg-white border border-gray-200 p-12 rounded-xl text-center">
          <div className="bg-gray-100 flex h-16 items-center justify-center mb-4 mx-auto rounded-full w-16">
            <Search className="h-8 text-gray-400 w-8" />
          </div>
          <h3 className="mb-2 text-gray-900">کاربری یافت نشد</h3>
          <p className="text-gray-600">
            جستجوی خود را تغییر دهید یا کاربر جدیدی اضافه کنید
          </p>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="bg-black/40 fixed flex inset-0 items-center justify-center p-4 z-50">
          <div
            className="bg-white max-w-md p-6 rounded-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3 items-center mb-6">
              <div className="bg-purple-100 flex h-12 items-center justify-center rounded-full w-12">
                <Lock className="h-6 text-purple-600 w-6" />
              </div>
              <div>
                <h2 className="text-gray-900 text-xl">تغییر رمز عبور</h2>
                <p className="text-gray-600 text-sm">
                  رمز عبور جدید را وارد کنید
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700 text-sm">
                  رمز عبور جدید *
                </label>
                <input
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 flex-1 hover:bg-blue-700 px-4 py-3 rounded-lg text-white transition-colors"
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
                  className="bg-gray-100 flex-1 hover:bg-gray-200 px-4 py-3 rounded-lg text-gray-700 transition-colors"
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
