// ProductSubscriptionToast.tsx
import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_TO_NEW_PRODUCTS } from '../constants';
import Modal from './Modal';

const toastStyles = {
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '1rem 1.5rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 9999,
  transition: 'opacity 0.5s ease-in-out',
};

const ProductSubscriptionToast = () => {
  const { data, error } = useSubscription(SUBSCRIBE_TO_NEW_PRODUCTS);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error) {
      console.error('Subscription error:', error.message);
    }

    if (data?.notifyNewProduct) {
      const product = data.notifyNewProduct;
      setMessage(`🎉 New Product Added: ${product.title}`);
      setVisible(true);

      // Hide toast after 4 seconds
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [data, error]);

  if (!visible) return null;

  return <div style={toastStyles}>{message}</div>
};

export default ProductSubscriptionToast;

