// import React from 'react'
// import { Container } from 'react-bootstrap'
// import AppStockChart from './AppStockChart.jsx'
// import AppSalesSummary from './AppSalesSummary.jsx'
// import AppSideAction from './AppSideAction.jsx'

// export default function Page1() {
//   return (
//     <div className='flex col-md-12 col-sm-12' style={{ display: 'flex', fontFamily: 'Cinzel' }}>
//       <div style={{ display: 'flex', flexDirection: 'column' }}>
//         <AppSalesSummary/>
//         <AppStockChart/>
//       </div>
//       <AppSideAction/>
//     </div>
    
//   )
// }

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppStockChart from './AppStockChart.jsx';
import AppSalesSummary from './AppSalesSummary.jsx';
import AppSideAction from './AppSideAction.jsx';

export default function Page1() {
  return (
    <Container fluid style={{ fontFamily: 'Cinzel' }}>
      <Row>
        {/* Left Section: Summary + Chart */}
        <Col lg={8} md={8} sm={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AppSalesSummary />
            <AppStockChart />
          </div>
        </Col>

        {/* Right Section: Side Action */}
        <Col lg={4} md={4} sm={12}>
          <AppSideAction />
        </Col>
      </Row>
    </Container>
  );
}
