import React, { useEffect, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { AUTH } from '../constants'

export default function Subscription({user}) {
  const { data, loading } = useSubscription(AUTH)
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username)
      setVisible(true)

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => setVisible(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [user])

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

