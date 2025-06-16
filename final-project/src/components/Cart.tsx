"use client";
import Link from "next/link";
import CartItem from "./CartItem";
import { useCart } from "@/contexts/cart.context";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

interface Props {
  isCartOpen: boolean;
  setIsCartOpen: (isCartOpen: boolean) => void;
}

const Cart = ({ isCartOpen, setIsCartOpen }: Props) => {
  const {
    cart,
    totalQuantity,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent.current]);

  return (
    <div className="custom-scrollbar w-full sm:w-[400px] h-screen bg-white dark:bg-neutral-900 px-5 pb-5 flex flex-col overflow-auto text-neutral-800 dark:text-neutral-200 relative">
      <div className="flex gap-2 items-end py-3">
        <h2 className="bg-white dark:bg-neutral-900 sticky top-0 text-xl font-semibold dark:text-white">
          My Cart ({totalQuantity})
        </h2>
        <button
          onClick={() => clearCart()}
          className="cursor-pointer text-sm text-neutral-500/90 hover:text-red-500 transition font-semibold underline"
        >
          Empty Cart
        </button>
      </div>
      <button
        onClick={() => setIsCartOpen(false)}
        className="absolute top-3 right-3 text-neutral-500 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors cursor-pointer"
        aria-label="Close menu"
      >
        ✕
      </button>
      <div ref={parent}>
        {!cart || cart.cartItems.length === 0 ? (
          <p className="mt-10 text-center">Your cart is empty.</p>
        ) : (
          <>
            {cart.cartItems.map((item) => (
              <CartItem
                key={item.id}
                product={item.product}
                quantity={item.quantity}
                total={item.subTotal}
                discount={item.discountedPrice}
                increaseQuantity={() => increaseQuantity(item.product.id)}
                decreaseQuantity={() => decreaseQuantity(item.product.id)}
                removeItem={() => removeFromCart(item.id)}
              />
            ))}

            <div className="flex justify-between items-end pt-4 border-t border-neutral-300 dark:border-neutral-700">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="cursor-pointer uppercase px-4 py-2 text-xs tracking-wide font-semibold bg-black text-white border dark:border-0"
              >
                View Order
              </Link>
              <p className="text-right font-semibold text-lg">
                Total: ${totalAmount.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
