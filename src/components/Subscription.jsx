import React from 'react'
import { AUTH } from '../constants'
import { useSubscription } from '@apollo/client'

export default function Subscription({user}) {
    // const { data, loading } = useSubscription(AUTH)

    // if (loading) {
    //     return <h1>Welcome</h1>
    //     }
            
  return (
      <h1 style={{color: 'white', backgroundColor: 'black'}}>Welcome {user?.username}</h1>
  )
}
