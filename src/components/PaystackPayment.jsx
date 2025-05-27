// PaystackPayment.js
import React from 'react';
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ email, amount, onSuccess, onClose }) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;

  const componentProps = {
    email,
    amount: amount * 100, // Convert to kobo
    currency: 'NGN',
    publicKey,
    text: "Pay Now",
    onSuccess: (reference) => {
      console.log("Payment success:", reference);
      onSuccess(reference);
    },
    onClose: () => {
      console.log("Payment closed");
      onClose();
    },
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackPayment;
