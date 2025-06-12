import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import AppAdmin from './AppAdmin';
import AppQuickActions from './AppQuickActions';
import AppFastMovingItems from './AppFastMovingItems';
import { useLocation } from 'react-router-dom';
import AppRecentActivity from './AppRecentActivity';

const AppSideAction = () => {
    const location = useLocation();
  return (
    <Container fluid  style={{ maxWidth: 320 }}>
      {/* Admin Section */}
      <Card className="mb-3 border-0 shadow-sm">
        <Card.Header className="bg-white border-0 fw-bold text-uppercase">
          Admin
        </Card.Header>
        <Card.Body className="p-2">
          <AppAdmin />
        </Card.Body>
      </Card>

      {/* Quick Actions */}
      <Card className="mb-3 border-0 shadow-sm">
        <Card.Header className="bg-white border-0 fw-bold text-uppercase">
          Quick Actions
        </Card.Header>
        <Card.Body className="p-2">
          <AppQuickActions />
        </Card.Body>
      </Card>

      {/* Fast Moving Items */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 fw-bold text-uppercase">
          {location.pathname!=='/dashboard/page1'? '' : 'Fast Moving Items'}
        </Card.Header>
        <Card.Body className="p-2">
          {location.pathname!=='/dashboard/page1'? <AppRecentActivity/> : <AppFastMovingItems />}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AppSideAction;
