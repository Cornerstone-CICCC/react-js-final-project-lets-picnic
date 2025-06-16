"use client";

import CartItem from "@/components/CartItem";
import Payment from "@/components/Payment";
import StripeWrapper from "@/components/StripeWrapper";
import { useCart } from "@/contexts/cart.context";
import autoAnimate from "@formkit/auto-animate";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const {
    cart,
    totalQuantity,
    totalDiscount,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const parent = useRef(null);

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const cartId = cart?.id;

  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  const userId = cart?.user?.id;

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const addressString = `${streetAddress}, ${city}, ${province}, ${postalCode}, ${country}`;

    if (!userId) {
      alert("User ID missing, please login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/cart/address/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ shippingAddress: addressString }),
      });

      if (!res.ok) {
        throw new Error("Failed to update address");
      }

      setShippingAddress(addressString);
      toast.success("Shipping address updated!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating address");
    }
  };

  const handleCheckout = async () => {
    if (!shippingAddress) {
      toast.error("Please add a shipping address before checking out.");
      return;
    }

    if (!cartId) {
      toast.error("Missing cart ID.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/payment/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ cartId }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.clientSecret) {
        throw new Error("Failed to create payment intent");
      }

      setClientSecret(data.clientSecret);
      localStorage.setItem("clientSecret", data.clientSecret);
      console.log(data.clientSecret)
      setShowPayment(true);
    } catch (error) {
      console.error(error);
      toast.error("Could not start checkout");
    }
  };

  return (
    <main className="flex flex-col md:flex-row py-12 gap-6 w-full bg-white dark:bg-black text-black dark:text-white px-4">
      {showPayment && clientSecret && (
        <StripeWrapper
          clientSecret={clientSecret}
          onClose={() => {
            setShowPayment(false);
            setClientSecret("");
          }}
        />
      )}

      <section className="w-full md:w-4/6 bg-white dark:bg-neutral-900 p-5 flex flex-col gap-5 order-1 md:order-none">
        <div ref={parent} className="flex flex-col">
          <h2 className="text-xl font-semibold pb-3">
            My Cart ({totalQuantity})
          </h2>
          {cart?.cartItems.map((item) => (
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
        </div>

        <div>
          <h2 className="text-xl font-semibold">Delivery Information</h2>

          {shippingAddress && (
            <p className="mb-4 font-semibold text-black dark:text-white">
              Shipping Address: {shippingAddress}
            </p>
          )}

          <form
            onSubmit={handleAddressSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <input
              type="text"
              placeholder="Street Address"
              className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Province / State"
              className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <select
              className="border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white text-black dark:text-white"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              <option value="Canada">Canada</option>
              <option value="United States">United States</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Japan">Japan</option>
              <option value="Korea">Korea</option>
              <option value="Mexico">Mexico</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="submit"
              value="Add Address"
              className="cursor-pointer text-center uppercase px-4 py-2 text-xs tracking-wide font-semibold bg-black text-white border border-black"
            />
          </form>
        </div>
      </section>

      <aside className="w-full md:w-2/6 sticky md:top-12 h-fit bg-white dark:bg-neutral-900 p-5 flex flex-col gap-3 text-neutral-500 dark:text-neutral-400 text-sm order-2">
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden flex border text-neutral-700 dark:text-neutral-300 border-gray-300 dark:border-neutral-600 font-semibold rounded w-fit">
            <span className="border border-gray-300 dark:border-neutral-600 rounded p-2">
              Free
            </span>
            <span className="p-2 bg-gray-100 dark:bg-neutral-700">
              Express: $9.99
            </span>
          </div>

          {shippingAddress && <p>Address: {shippingAddress}</p>}

          <h2 className="text-xl font-semibold text-black dark:text-white">
            Order Summary
          </h2>
          <p className="flex justify-between">
            Subtotal:<span>${totalAmount.toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            Delivery:<span>$8.99</span>
          </p>
          <p className="flex justify-between">
            You save:<span>${totalDiscount.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-black dark:text-white font-semibold text-base">
            Total:<span>${(totalAmount + 8.99).toFixed(2)}</span>
          </p>

          <button
            onClick={handleCheckout}
            className="cursor-pointer text-center uppercase px-4 py-2 text-xs tracking-wide font-semibold bg-black dark:text-neutral-900 text-white dark:bg-white border dark:border-white"
          >
            Checkout
          </button>
          <Link
            href="/"
            className="cursor-pointer text-center uppercase px-4 py-2 text-xs tracking-wide font-semibold bg-white dark:bg-neutral-900 text-black dark:text-white border dark:border-white"
          >
            Continue Shopping
          </Link>
        </div>
      </aside>
    </main>
  );
};

export default Page;
