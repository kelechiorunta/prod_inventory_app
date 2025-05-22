import React from 'react'
import { AUTH } from '../constants'
import { useSubscription } from '@apollo/client'

export default function Subscription() {
    const { data, loading } = useSubscription(AUTH)

    if (loading) {
        return <h1>Welcome</h1>
        }
            
  return (
      <h1>Welcome {data?.username}</h1>
  )
}
