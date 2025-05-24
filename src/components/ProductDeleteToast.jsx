// ProductDeleteToast.tsx
import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_TO_DELETE_PRODUCTS } from '../constants';

const toastStyles = {
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  backgroundColor: '#e53935',
  color: 'white',
  padding: '1rem 1.5rem',
  borderRadius: '8px',
  zIndex: 9999,
  transition: 'opacity 0.5s ease-in-out',
};

const ProductDeleteToast = () => {
  const { data, error } = useSubscription(SUBSCRIBE_TO_DELETE_PRODUCTS);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error) {
      console.error('Subscription error:', error.message);
    }

    if (data?.notifyDeleteProduct?.id) {
      setMessage(`🗑️ Product Deleted (ID: ${data.notifyDeleteProduct.id})`);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [data, error]);

  if (!visible) return null;
  return <div style={toastStyles}>{message}</div>;
};

export default ProductDeleteToast;
