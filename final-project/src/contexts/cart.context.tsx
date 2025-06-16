"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import type { Cart } from "@/app/actions/cart.actions";
import {
  getCart,
  addItem,
  updateItem,
  removeItem,
  updateAddress,
  deleteCart,
} from "@/app/actions/cart.actions";
import { useSession } from "@/contexts/session.context";

type CartContextType = {
  cart: Cart | null;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  increaseQuantity: (productId: number) => Promise<void>;
  decreaseQuantity: (productId: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  setShippingAddress: (address: string) => Promise<void>;
  reloadCart: () => Promise<void>;
  totalQuantity: number;
  totalDiscount: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useSession();
  const userId = user?.id;

  const [cart, setCart] = useState<Cart | null>(null);

  const reloadCart = async () => {
    if (!userId) return;
    try {
      const data = await getCart(userId);

      data.cartItems.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });

      setCart(data);
    } catch {}
  };

  useEffect(() => {
    reloadCart();
  }, [userId]);

  const addToCart = async (productId: number, quantity = 1) => {
    if (!userId) return;
    try {
      await addItem(userId, productId, quantity);
      await reloadCart();
    } catch {}
  };

  const updateCartItem = async (productId: number, quantity: number) => {
    if (!userId) return;
    try {
      await updateItem(userId, productId, quantity);
      await reloadCart();
    } catch {}
  };

  const increaseQuantity = async (productId: number) => {
    if (!cart) return;
    const item = cart.cartItems.find((i) => i.product.id === productId);
    if (item) {
      await updateCartItem(productId, item.quantity + 1);
    } else {
      await addToCart(productId, 1);
    }
  };

  const decreaseQuantity = async (productId: number) => {
    if (!cart) return;
    const item = cart.cartItems.find((i) => i.product.id === productId);
    if (!item) return;
    if (item.quantity <= 1) {
      await removeFromCart(item.id);
    } else {
      await updateCartItem(productId, item.quantity - 1);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!userId) return;
    try {
      await removeItem(userId, cartItemId);
      setCart((prev) => {
        if (!prev) return prev;
        const filteredItems = prev.cartItems.filter((i) => i.id !== cartItemId);
        return { ...prev, cartItems: filteredItems };
      });
    } catch {}
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await deleteCart(userId);
      setCart(null);
    } catch {}
  };

  const setShippingAddress = async (address: string) => {
    if (!userId) return;
    try {
      await updateAddress(userId, address);
      await reloadCart();
    } catch {}
  };

  const totalQuantity = cart
    ? cart.cartItems.reduce((acc, i) => acc + i.quantity, 0)
    : 0;

  const totalDiscount = cart
    ? cart.cartItems.reduce((acc, item) => {
        const originalPrice = Number(item.product.price) || 0;
        const discountedPrice = Number(item.discountedPrice) || originalPrice;
        const quantity = item.quantity || 1;

        const savingsPerItem = (originalPrice - discountedPrice) * quantity;

        return acc + (savingsPerItem > 0 ? savingsPerItem : 0);
      }, 0)
    : 0;

  //   const subTotal = cart
  //     ? cart.cartItems.reduce((acc, i) => acc + i.discountedPrice, 0)
  //     : 0;

  const totalAmount = useMemo(() => {
    if (!cart || !cart.cartItems) return 0;

    return cart.cartItems.reduce((acc, item) => {
      const subTotal = Number(item.subTotal) || 0;
      return acc + subTotal;
    }, 0);
  }, [cart?.cartItems]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartItem,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        setShippingAddress,
        reloadCart,
        totalQuantity,
        totalDiscount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
