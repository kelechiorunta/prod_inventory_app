import React, { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { AUTH, SUBSCRIBE_TO_AUTH_USER } from '../constants'

export default function Subscription({user}) {
  const { data, error, loading } = useSubscription(SUBSCRIBE_TO_AUTH_USER)
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState(user?.username)

  useEffect(() => {
    if (error) {
        console.error('Subscription error:', error.message);
      }
      
      if (data?.notifyAuthUser) {  
        // if (!visible || loading) return null  
          const currentUser = data?.notifyAuthUser;
          setUsername(`🎉${currentUser?.username==='Kelechi'? 'Admin:' : 'User:'} ${currentUser?.username}`);
          setVisible(true);
      }else if (user) {
          setUsername(user?.username)
          setVisible(true);
      }

    // Hide toast after 4 seconds    
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timeout);
  }, [data, error, user]);
    
if (!visible) return null

  return (
    username && (<div style={styles.toast}>
      👋 Welcome back, <strong>{username}</strong>!
    </div>)
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

