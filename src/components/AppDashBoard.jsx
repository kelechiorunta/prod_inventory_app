import React from 'react'
import { Container } from 'react-bootstrap'
import AppSearchBar from './AppSearchBar.jsx'
import AppSidebar from './AppSidebar.jsx'
import { Outlet } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton.jsx';

export default function AppDashBoard() {
    return (
      <>
        
      <Container xlg className='col-sm-12 col-md-12 col-lg-12 flex'
        style={{
            position: 'relative', marginTop: 50, maxWidth: '100%',
            flexDirection: 'column',
            fontfamily: 'Cinzel'
      }}>
          <AppSearchBar />
          <div xlg className='flex' style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                    <AppSidebar />
                    
            <div style={{display: 'block'}}>
              <Outlet />
            </div>
              
          </div>      
        </Container>
            
      </>
  )
}
