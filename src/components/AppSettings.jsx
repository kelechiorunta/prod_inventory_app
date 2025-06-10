import React from 'react'
import { Container } from 'react-bootstrap'
import AppProfile from './AppProfile.jsx'

export default function AppSettings() {
  return (
      <Container xlg style={{flexDirection: 'column', fontFamily: 'Cinzel'}} className='flex col-12-sm col-12-lg col-6-md'>
        <AppProfile/>
      </Container>
  )
}
