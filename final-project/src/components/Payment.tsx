"use client";

import { motion } from "framer-motion";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

interface ConfirmedProps {
  onClose: () => void;
  clientSecret: string;
}

const Payment = ({ onClose, clientSecret }: ConfirmedProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Test User",
          },
        },
      }
    );

    setLoading(false);

    if (error) {
      console.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setSuccess(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center z-50 w-full h-screen bg-black/30">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative text-center bg-white dark:bg-black text-black dark:text-white rounded-xl p-7 pt-16 w-full max-w-md shadow-xl"
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white text-xl"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
              Enter Payment Details
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="p-3">
                <CardElement />
              </div>
              <button
                type="submit"
                disabled={!stripe || !clientSecret || loading}
                className="bg-black hover:bg-gray-800 text-white font-semibold p-3 text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: 0 }}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-black dark:text-white">
            <svg
              width="60"
              height="60"
              viewBox="0 0 52 52"
              className="text-black w-30 h-30 pb-3"
            >
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-20"
              />
              <path
                d="M14 27 L22 35 L38 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw"
              />
            </svg>
            <h2 className="text-2xl font-bold tracking-tight">
              Order Confirmed
            </h2>
            <p className="w-3/4 pt-1 text-gray-700 dark:text-gray-300 text-sm tracking-tight font-semibold">
              We have received your order. You'll get a confirmation email to{" "}
              <span className="font-bold">letspicnic@mango.com</span>
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-black hover:bg-gray-800 text-white font-semibold p-3 text-sm transition"
              style={{ borderRadius: 0 }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Payment;
