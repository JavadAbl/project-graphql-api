import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowRight,
  FileText,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Package,
  Printer,
} from "lucide-react";
import {
  mockFactors,
  mockCustomers,
  mockBranches,
  mockAddresses,
  mockProducts,
} from "../data/mockData";

export const FactorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const factor = mockFactors.find((f) => f.id === Number(id));

  if (!factor) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl text-gray-900 mb-2">فاکتور یافت نشد</h2>
          <p className="text-gray-600 mb-6">
            فاکتور مورد نظر در سیستم وجود ندارد
          </p>
          <button
            onClick={() => navigate("/factors")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            بازگشت به لیست فاکتورها
          </button>
        </div>
      </div>
    );
  }

  const customer = mockCustomers.find((c) => c.id === factor.customerId);
  const branch = mockBranches.find((b) => b.id === factor.branchId);
  const address = mockAddresses.find((a) => a.id === factor.deliveryAddressId);

  // Mock factor items
  const factorItems = [
    { id: 1, productId: 1, quantity: 1, unitPrice: 25000000 },
    { id: 2, productId: 2, quantity: 1, unitPrice: 2500000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تکمیل شده":
        return "bg-green-100 text-green-800";
      case "در حال پردازش":
        return "bg-blue-100 text-blue-800";
      case "در انتظار تایید":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/factors")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">
              جزئیات فاکتور #{factor.id}
            </h1>
            <p className="text-gray-600">
              ثبت شده در{" "}
              {new Date(factor.factorDate).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Printer className="w-5 h-5" />
          <span>چاپ فاکتور</span>
        </button>
      </div>

      {/* Factor Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl mb-2">فاکتور فروش</h2>
              <p className="text-blue-100">شماره: {factor.id}</p>
            </div>
            <div className="text-left">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(
                  factor.status
                )}`}
              >
                {factor.status}
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Customer Info */}
            <div>
              <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                اطلاعات مشتری
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="text-gray-500">نام:</span>{" "}
                  {customer?.firstName} {customer?.lastName}
                </p>
                <p>
                  <span className="text-gray-500">تلفن:</span> {customer?.phone}
                </p>
                <p>
                  <span className="text-gray-500">ایمیل:</span>{" "}
                  {customer?.email}
                </p>
              </div>
            </div>

            {/* Branch Info */}
            <div>
              <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                اطلاعات شعبه
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="text-gray-500">نام شعبه:</span>{" "}
                  {branch?.name}
                </p>
                <p>
                  <span className="text-gray-500">تلفن:</span> {branch?.phone}
                </p>
                <p>
                  <span className="text-gray-500">آدرس:</span>{" "}
                  {branch?.location}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            {address && (
              <div className="md:col-span-2">
                <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  آدرس تحویل
                </h3>
                <p className="text-gray-700">
                  {address.addressLine1}
                  {address.addressLine2 && `, ${address.addressLine2}`},{" "}
                  {address.city}, {address.state}, کد پستی: {address.postalCode}
                </p>
              </div>
            )}

            {/* Payment & Date Info */}
            <div>
              <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                تاریخ و زمان
              </h3>
              <p className="text-gray-700">
                {new Date(factor.factorDate).toLocaleDateString("fa-IR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                روش پرداخت
              </h3>
              <p className="text-gray-700">{factor.paymentMethod}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 text-lg text-gray-900 mb-4">
              <Package className="w-5 h-5 text-blue-600" />
              محصولات
            </h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">
                      ردیف
                    </th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">
                      محصول
                    </th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">
                      تعداد
                    </th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">
                      قیمت واحد
                    </th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">
                      جمع
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {factorItems.map((item, index) => {
                    const product = mockProducts.find(
                      (p) => p.id === item.productId
                    );
                    return (
                      <tr key={item.id}>
                        <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-gray-900">{product?.name}</p>
                            <p className="text-sm text-gray-500">
                              {product?.sku}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(item.unitPrice)} تومان
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {formatPrice(item.quantity * item.unitPrice)} تومان
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-xl text-gray-900">مبلغ کل فاکتور:</span>
              <span className="text-3xl text-blue-600">
                {formatPrice(factor.totalAmount)} تومان
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};
