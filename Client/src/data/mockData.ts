import type { Customer, Product, Branch, Address, Factor } from "../types";

export const mockBranches: Branch[] = [
  {
    id: 1,
    name: "شعبه مرکزی",
    phone: "021-12345678",
    location: "تهران، خیابان ولیعصر",
  },
  {
    id: 2,
    name: "شعبه شمال",
    phone: "021-87654321",
    location: "تهران، خیابان شریعتی",
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 1,
    firstName: "محمد",
    lastName: "رضایی",
    email: "mohammad@example.com",
    phone: "09121234567",
  },
  {
    id: 2,
    firstName: "فاطمه",
    lastName: "کریمی",
    email: "fatemeh@example.com",
    phone: "09129876543",
  },
  {
    id: 3,
    firstName: "حسین",
    lastName: "نوری",
    email: "hossein@example.com",
    phone: "09123456789",
  },
];

export const mockAddresses: Address[] = [
  {
    id: 1,
    customerId: 1,
    addressLine1: "خیابان آزادی، کوچه ۱۵",
    addressLine2: "پلاک ۲۳",
    city: "تهران",
    state: "تهران",
    postalCode: "1234567890",
    country: "ایران",
    addressType: "منزل",
  },
  {
    id: 2,
    customerId: 2,
    addressLine1: "خیابان انقلاب، نبش کوچه ۸",
    city: "تهران",
    state: "تهران",
    postalCode: "9876543210",
    country: "ایران",
    addressType: "محل کار",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "لپ‌تاپ ایسوس",
    description: "لپ‌تاپ ایسوس مدل Vivobook",
    sku: "LAP-001",
    price: 25000000,
    stockQuantity: 15,
  },
  {
    id: 2,
    name: "موس بی‌سیم لاجیتک",
    description: "موس بی‌سیم لاجیتک MX Master 3",
    sku: "MOU-002",
    price: 2500000,
    stockQuantity: 50,
  },
  {
    id: 3,
    name: "کیبورد مکانیکال",
    description: "کیبورد مکانیکال RGB",
    sku: "KEY-003",
    price: 3000000,
    stockQuantity: 30,
  },
  {
    id: 4,
    name: "مانیتور Dell 27 اینچ",
    description: "مانیتور Dell مدل UltraSharp",
    sku: "MON-004",
    price: 12000000,
    stockQuantity: 20,
  },
  {
    id: 5,
    name: "هدفون Sony",
    description: "هدفون بی‌سیم Sony WH-1000XM4",
    sku: "HDP-005",
    price: 8000000,
    stockQuantity: 25,
  },
];

export const mockFactors: Factor[] = [
  {
    id: 1,
    customerId: 1,
    branchId: 1,
    deliveryAddressId: 1,
    userId: 1,
    factorDate: "2025-11-25T10:30:00",
    totalAmount: 27500000,
    paymentMethod: "نقدی",
    status: "تکمیل شده",
  },
  {
    id: 2,
    customerId: 2,
    branchId: 1,
    userId: 2,
    factorDate: "2025-11-26T14:15:00",
    totalAmount: 12000000,
    paymentMethod: "کارت به کارت",
    status: "در حال پردازش",
  },
  {
    id: 3,
    customerId: 3,
    branchId: 2,
    userId: 1,
    factorDate: "2025-11-28T09:00:00",
    totalAmount: 5500000,
    paymentMethod: "چک",
    status: "در انتظار تایید",
  },
];
