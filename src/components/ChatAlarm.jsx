import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import { gql } from '@apollo/client';
import { NEW_INCOMING_MESSAGE } from '../constants.js';



const toastStyles = {
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '1rem 1.5rem',
  fontSize: '12px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 9999,
  transition: 'opacity 0.5s ease-in-out',
};

const ChatAlarm = () => {
  const { data, error } = useSubscription(NEW_INCOMING_MESSAGE);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (error) {
      console.error('Subscription error:', error.message);
    }

    
      // Show toast ONLY when not on the /chat page
      if (data?.incomingMessage && !location.pathname.startsWith('/chat')) {
        const msg = data.incomingMessage;
        setMessage(`💬 New message from ${msg.senderName}: "${msg.content}"`);
        setVisible(true);

          const timeout = setTimeout(() => { setVisible(false); setMessage('') }, 4000);
        return () => clearTimeout(timeout);
      }

  }, [data, error, location]);

  if (!visible) return null;

  return <div style={toastStyles}>{message}</div>;
};

export default ChatAlarm;
