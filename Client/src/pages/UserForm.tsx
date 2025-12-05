import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowRight, Save, UserCog } from "lucide-react";
import { toast } from "sonner";
import { userService } from "../data/userService";
import {
  Branch_Query_GetBranchesDocument,
  User_Mutation_CreateUserDocument,
  User_Query_GetUserByIdDocument,
  UserRoles,
} from "../gql/graphql";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";

export const UserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: UserRoles.Operator,
    branchId: 0,
    isActive: true,
  });

  //Query---------------------------------------------------------
  const { data: branchesData } = useQuery(Branch_Query_GetBranchesDocument);

  const branches = branchesData?.branchesQuery.branches?.items ?? [];

  const [fetchUser] = useLazyQuery(User_Query_GetUserByIdDocument);

  //Mutation---------------------------------------------------------
  const [mutateCreateUser, { loading: isLoadingMutateCreateUser }] =
    useMutation(User_Mutation_CreateUserDocument);

  useEffect(() => {
    (async () => {
      if (id) {
        const userRes = await fetchUser({ variables: { id: Number(id) } });
        const user = userRes.data?.usersQuery?.userById;
        if (user) {
          setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: "",
            role: user.role,
            branchId: user.branch!.id,
            isActive: user.isActive,
          });
        }
      }
    })();
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
      mutateCreateUser({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            password: formData.password,
            role: formData.role,
            branchId: formData.branchId ? Number(formData.branchId) : null,
          },
        },
      });

      toast.success("کاربر با موفقیت ثبت شد");
    }

    navigate("/users");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/users")}
          className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <ArrowRight className="h-6 text-gray-600 w-6" />
        </button>

        <div>
          <h1 className="mb-2 text-2xl text-gray-900">
            {isEdit ? "ویرایش کاربر" : "افزودن کاربر جدید"}
          </h1>
          <p className="text-gray-600">اطلاعات کاربر را وارد کنید</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Info */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl">
          <div className="flex gap-3 items-center mb-6">
            <div className="bg-blue-100 flex h-12 items-center justify-center rounded-full w-12">
              <UserCog className="h-6 text-blue-600 w-6" />
            </div>
            <h2 className="text-gray-900 text-lg">اطلاعات کاربری</h2>
          </div>

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
                نام کاربری *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="username"
                dir="ltr"
                required
              />
            </div>

            {!isEdit && (
              <div>
                <label className="block mb-2 text-gray-700 text-sm">
                  رمز عبور *
                </label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                  placeholder="حداقل ۶ کاراکتر"
                  dir="ltr"
                  required
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-gray-700 text-sm">نقش *</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                required
              >
                <option value={UserRoles.Operator}>اپراتور</option>
                <option value={UserRoles.Admin}>مدیر</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 text-sm">شعبه</label>
              <select
                value={formData.branchId}
                onChange={(e) =>
                  setFormData({ ...formData, branchId: Number(e.target.value) })
                }
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
              >
                <option value="">بدون شعبه</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            {isEdit && (
              <div className="md:col-span-2">
                <label className="cursor-pointer flex gap-3 items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 h-5 rounded text-blue-600 w-5"
                  />
                  <span className="text-gray-700">کاربر فعال است</span>
                </label>
              </div>
            )}
          </div>

          {isEdit && (
            <div className="bg-yellow-50 border border-yellow-200 mt-6 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>توجه:</strong> برای تغییر رمز عبور این کاربر، از صفحه
                لیست کاربران استفاده کنید.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-6 py-3 rounded-lg text-white transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>{isEdit ? "ذخیره تغییرات" : "ذخیره کاربر"}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-lg text-gray-700 transition-colors"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
};
