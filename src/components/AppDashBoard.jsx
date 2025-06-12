// import React from 'react'
// import { Container } from 'react-bootstrap'
// import AppSearchBar from './AppSearchBar.jsx'
// import AppSidebar from './AppSidebar.jsx'
// import { Outlet } from 'react-router-dom';
// import ThemeToggleButton from './ThemeToggleButton.jsx';

// export default function AppDashBoard() {
//     return (
//       <>
        
//       <Container xlg className='col-sm-12 col-md-12 col-lg-12 flex'
//         style={{
//             position: 'relative', marginTop: 50, maxWidth: '100%',
//             flexDirection: 'column',
//             fontfamily: 'Cinzel'
//       }}>
//           <AppSearchBar />
//           <div className='flex' style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
//             <div style={{display: 'inline-block'}}>
//                 <AppSidebar />
//             </div>       
                    
//             <div style={{display: 'inline-block'}}>
//               <Outlet />
//             </div>
              
//           </div>      
//         </Container>
            
//       </>
//   )
// }

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppSearchBar from './AppSearchBar.jsx';
import AppSidebar from './AppSidebar.jsx';
import { Outlet } from 'react-router-dom';

export default function AppDashBoard() {
  return (
    <Container fluid className="mt-4 px-3" style={{marginTop:100, fontFamily: 'Cinzel' }}>
      {/* <div style={{marginTop: 100}}> */}
        <AppSearchBar />  
      {/* </div> */}

      <Row className="mt-3 gx-3">
        {/* Sidebar - takes full width on mobile, fixed width on desktop */}
        <Col xs={12} md={4} lg={3} xl={2} className="mb-3">
          <AppSidebar />
        </Col>

        {/* Main content - full width on mobile, grows on desktop */}
        <Col xs={12} md={8} lg={9} xl={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
