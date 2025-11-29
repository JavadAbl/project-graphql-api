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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl text-gray-900 mb-2">سیستم مدیریت فاکتور</h1>
            <p className="text-gray-600">برای ورود اطلاعات خود را وارد کنید</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-700 mb-2"
              >
                نام کاربری
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="نام کاربری خود را وارد کنید"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 mb-2"
              >
                رمز عبور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">اطلاعات ورود نمایشی:</p>
            <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-4 rounded-lg">
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
