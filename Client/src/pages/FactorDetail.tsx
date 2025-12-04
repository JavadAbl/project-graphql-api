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
        <div className="bg-white border border-gray-200 p-12 rounded-xl text-center">
          <FileText className="h-16 mb-4 mx-auto text-gray-400 w-16" />
          <h2 className="mb-2 text-gray-900 text-xl">فاکتور یافت نشد</h2>
          <p className="mb-6 text-gray-600">
            فاکتور مورد نظر در سیستم وجود ندارد
          </p>
          <button
            onClick={() => navigate("/factors")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white transition-colors"
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
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate("/factors")}
            className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <ArrowRight className="h-6 text-gray-600 w-6" />
          </button>
          <div>
            <h1 className="mb-2 text-2xl text-gray-900">
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
          className="bg-blue-600 flex gap-2 hover:bg-blue-700 items-center px-4 py-2 rounded-lg text-white transition-colors"
        >
          <Printer className="h-5 w-5" />
          <span>چاپ فاکتور</span>
        </button>
      </div>

      {/* Factor Card */}
      <div className="bg-white border border-gray-200 overflow-hidden rounded-xl">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 p-8 text-white to-blue-700">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-3xl">فاکتور فروش</h2>
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
          <div className="gap-8 grid grid-cols-1 mb-8 md:grid-cols-2">
            {/* Customer Info */}
            <div>
              <h3 className="flex gap-2 items-center mb-4 text-gray-900 text-lg">
                <User className="h-5 text-blue-600 w-5" />
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
              <h3 className="flex gap-2 items-center mb-4 text-gray-900 text-lg">
                <MapPin className="h-5 text-blue-600 w-5" />
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
                <h3 className="flex gap-2 items-center mb-4 text-gray-900 text-lg">
                  <MapPin className="h-5 text-blue-600 w-5" />
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
              <h3 className="flex gap-2 items-center mb-4 text-gray-900 text-lg">
                <Calendar className="h-5 text-blue-600 w-5" />
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
              <h3 className="flex gap-2 items-center mb-4 text-gray-900 text-lg">
                <CreditCard className="h-5 text-blue-600 w-5" />
                روش پرداخت
              </h3>
              <p className="text-gray-700">{factor.paymentMethod}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <h3 className="flex gap-2 items-center mb-4 text-gray-900 text-lg">
              <Package className="h-5 text-blue-600 w-5" />
              محصولات
            </h3>
            <div className="border border-gray-200 overflow-hidden rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-gray-600 text-right text-sm">
                      ردیف
                    </th>
                    <th className="px-6 py-3 text-gray-600 text-right text-sm">
                      محصول
                    </th>
                    <th className="px-6 py-3 text-gray-600 text-right text-sm">
                      تعداد
                    </th>
                    <th className="px-6 py-3 text-gray-600 text-right text-sm">
                      قیمت واحد
                    </th>
                    <th className="px-6 py-3 text-gray-600 text-right text-sm">
                      جمع
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-gray-200 divide-y">
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
                            <p className="text-gray-500 text-sm">
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
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 text-xl">مبلغ کل فاکتور:</span>
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
