import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LogIn, AlertCircle } from "lucide-react";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(username, password);

    if (success) {
      navigate("/dashboard");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است یا کاربر غیرفعال شده است");
    }
    setLoading(false);
  };

  return (
    <div
      className="bg-gradient-to-br flex from-blue-50 items-center justify-center min-h-screen p-4 to-indigo-100"
      dir="rtl"
    >
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="bg-blue-600 h-16 inline-flex items-center justify-center mb-4 rounded-full w-16">
              <LogIn className="h-8 text-white w-8" />
            </div>
            <h1 className="mb-2 text-2xl text-gray-900">سیستم مدیریت فاکتور</h1>
            <p className="text-gray-600">برای ورود اطلاعات خود را وارد کنید</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 flex gap-3 items-center mb-6 p-4 rounded-lg text-red-800">
              <AlertCircle className="flex-shrink-0 h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-gray-700 text-sm"
              >
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="نام کاربری خود را وارد کنید"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-gray-700 text-sm"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-lg w-full"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-blue-700 px-4 py-3 rounded-lg text-white transition-colors w-full"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="border-gray-200 border-t mt-8 pt-6">
            <p className="mb-3 text-gray-600 text-sm">اطلاعات ورود نمایشی:</p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-gray-700 text-xs">
              <div>
                <span className="inline-block w-20">مدیر:</span>
                <span className="text-blue-600">manager / manager123</span>
              </div>
              <div>
                <span className="inline-block w-20">اپراتور:</span>
                <span className="text-blue-600">operator / operator123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
