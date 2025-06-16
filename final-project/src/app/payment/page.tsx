"use client"
import CheckoutForm from '@/components/CheckOut';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RYrdLD6BKSockfTEX1OTaIpvs7f3d87K8xOHQYIPLzoqq3TajypVOIVqD9ZMO6w8KTCGgwjDLx8gQ9O1QNexd2M00ZKYhdJBh');

export default function CheckoutPage() {
  const clientSecret = 'pi_3RYtRjD6BKSockfT1xPrTlWQ_secret_21JBcmatjoAekksJfqoItQWdz';

  if (!clientSecret) return <p>clientSecret</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
