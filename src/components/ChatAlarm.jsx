import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSubscription } from '@apollo/client';
import { NEW_INCOMING_MESSAGE } from '../constants';

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

const ChatAlarm = () => {
  const location = useLocation();
  const { data, error } = useSubscription(NEW_INCOMING_MESSAGE);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const shownMessages = useRef(new Set()); // store shown message IDs

  useEffect(() => {
    if (error) {
      console.error('Subscription error:', error);
    }

    if (data?.incomingMessage) {
      const msg = data.incomingMessage;

      // ✅ Only show toast if not on chat pages
      const onChatPage = location.pathname.startsWith('/chat') || location.pathname === '/chat-notification';
      const alreadyShown = shownMessages.current.has(msg.id);

      if (!onChatPage && !alreadyShown) {
        setMessage(`📩 New message from ${msg.senderName}`);
        setVisible(true);
        shownMessages.current.add(msg.id); // Mark as shown

        const timer = setTimeout(() => setVisible(false), 4000);
        return () => clearTimeout(timer);
      }
    }
  }, [data, location, error]);

  if (!visible) return null;

  return <div style={toastStyles}>{message}</div>;
};

export default ChatAlarm;

