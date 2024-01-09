import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from './StripeForm';
import { loadStripe } from '@stripe/stripe-js';
import { postRequest } from '@/lib/fetch';
import Loader from '@/components/Loader';

export const StripeCheckout = ({
  checkedItems,
  total,
  userFullName,
  userEmail,
}) => {
  const [clientSecret, setClientSecret] = React.useState();
  const [stripePromise, setStripePromise] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const uuid = localStorage.getItem('uuid');
  console.log('🚀 ~ file: StripeCheckout.tsx:23 ~ checkedItems:', checkedItems);

  console.log(
    '🚀 ~ file: StripeCheckout.tsx:23 ~ dataArray ~ dataArray:',
    checkedItems,
    userFullName,
    userEmail
  );

  useEffect(() => {
    setStripePromise(
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    );
  }, []);
  useEffect(() => {
    if (!stripePromise) return;
    const getClientSecret = async () => {
      setLoading(true);
      const checkoutSession = await postRequest({
        endPoint: '/api/stripe/checkout-session/checkout',
        formData: {
          checkedItems: checkedItems,
          amount: total,
          userFullName,
          userEmail,
          uuid,
        },
        isFormData: false,
      });

      setClientSecret(checkoutSession?.clientSecret);
      setLoading(false);
    };
    getClientSecret();
  }, [stripePromise]);
  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  ) : clientSecret ? (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeForm />
    </Elements>
  ) : null;
};
