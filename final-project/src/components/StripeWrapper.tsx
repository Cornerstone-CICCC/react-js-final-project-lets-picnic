"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

const stripePromise = loadStripe(
  "pk_test_51RYrdLD6BKSockfTEX1OTaIpvs7f3d87K8xOHQYIPLzoqq3TajypVOIVqD9ZMO6w8KTCGgwjDLx8gQ9O1QNexd2M00ZKYhdJBh"
);

interface Props {
  clientSecret: string;
  onClose: () => void;
}

const StripeWrapper = ({ clientSecret, onClose }: Props) => {
  if (!clientSecret) return null;

  const appearance = {
    theme: "flat" as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Payment clientSecret={clientSecret} onClose={onClose} />
    </Elements>
  );
};

export default StripeWrapper;
