import { Product } from "@/types/product.types";

export type CartItem = {
  id: number;
  quantity: number;
  discountedPrice: number;
  subTotal: number;
  createdAt: string;
  updatedAt: string;
  product: Product
};

export type Cart = {
  id: number;
  status: string;
  totalDiscountedAmount: number;
  shippingAddress: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  };
  cartItems: CartItem[];
};

export async function getCart(userId: number): Promise<Cart> {
  const res = await fetch(`http://localhost:3000/cart/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addItem(userId: number, productId: number, quantity: number) {
  const res = await fetch(`http://localhost:3000/cart/item/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function updateItem(userId: number, productId: number, quantity: number) {
  const res = await fetch(`http://localhost:3000/cart/item/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to update item");
  return res.json();
}

export async function removeItem(userId: number, cartItemId: number) {
  const res = await fetch(`http://localhost:3000/cart/item/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItemId }),
  });
  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
}

export async function updateAddress(userId: number, shippingAddress: string) {
  const res = await fetch(`http://localhost:3000/cart/address/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shippingAddress }),
  });
  if (!res.ok) throw new Error("Failed to update address");
  return res.json();
}

export async function deleteCart(userId: number) {
  const res = await fetch(`http://localhost:3000/cart/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete cart");
  return res.json();
}
