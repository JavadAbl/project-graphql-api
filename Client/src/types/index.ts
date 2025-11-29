export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: "Manager" | "Operator";
  branch?: Branch;
  isActive: boolean;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses?: Address[];
}

export interface Branch {
  id: number;
  name: string;
  phone: string;
  location: string;
}

export interface Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  customerId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stockQuantity: number;
}

export interface FactorOrder {
  id: number;
  factorId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product?: Product;
}

export interface Factor {
  id: number;
  customerId: number;
  branchId: number;
  deliveryAddressId?: number;
  userId: number;
  factorDate: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  customer?: Customer;
  branch?: Branch;
  user?: User;
  deliveryAddress?: Address;
  factorOrders?: FactorOrder[];
}
