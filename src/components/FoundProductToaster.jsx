// SearchProductNotifier.tsx
import React, { useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_TO_SEARCHED_PRODUCTS } from '../constants';

const toastStyles = {
  position: 'fixed',
  bottom: '1rem',
  left: '1rem',
  backgroundColor: '#1976d2',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  color: 'white',
  padding: '1rem 1.5rem',
  borderRadius: '8px',
  zIndex: 9999,
  transition: 'opacity 0.5s ease-in-out',
};

const FoundProductToast = () => {
  const { data, error } = useSubscription(SUBSCRIBE_TO_SEARCHED_PRODUCTS);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error) {
      console.error('Search subscription error:', error.message);
    }

    if (data?.notifySearchProduct) {
        const titles = data.notifySearchProduct.map(p => p.title).join(', ');
        if (titles?.length > 0) {
            setMessage(`🔍 Searched Products: ${titles}`);
            setVisible(true);
        }
     
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [data, error]);

  if (!visible) return null;
  return <div style={toastStyles}>{message}</div>;
};

export default FoundProductToast;
