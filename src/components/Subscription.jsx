import React, { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { AUTH, SUBSCRIBE_TO_AUTH_USER } from '../constants'

export default function Subscription() {
  const { data, error, loading } = useSubscription(SUBSCRIBE_TO_AUTH_USER)
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (error) {
        console.error('Subscription error:', error.message);
      }
  
      if (data?.notifyAuthUser) {
          const user = data.notifyAuthUser;
          setUsername(`🎉${user?.username==='Kelechi'? 'Admin:' : 'User:'} ${user?.username}`);
        setVisible(true);
  
        // Hide toast after 4 seconds
        const timeout = setTimeout(() => {
          setVisible(false);
        }, 4000);
  
        return () => clearTimeout(timeout);
      }
  }, [data, error]);
    
  if (!visible || loading) return null

  return (
    <div style={styles.toast}>
      👋 Welcome back, <strong>{username}</strong>!
    </div>
  )
}

const styles = {
  toast: {
    position: 'fixed',
    top: 20,
    right: 20,
    backgroundColor: '#333',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    fontSize: '16px',
    animation: 'fadeIn 0.3s ease-out',
  },
}

