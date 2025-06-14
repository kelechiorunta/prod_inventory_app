import React from 'react';
import { Card, ListGroup, Image, Row, Col } from 'react-bootstrap';
import { BsClock } from 'react-icons/bs';
import mac from './MacbookPro.png'
import iphone from './iphone 14 pro.png'
import zoom75 from './zoom75.png'
import airpods from './airpodsPro.png'
import samsung from './samsung_galaxy_fold.png'
// Sample activity data (replace with real-time data or props)
const recentActivities = [
  {
    type: 'Restocked',
    quantity: 6,
    productName: 'Macbook Pro',
    image: mac,
    timeAgo: '1 m ago',
  },
  {
    type: 'Sold',
    quantity: 2,
    productName: 'iPhone 14 pro',
    image: iphone,
    timeAgo: '12 m ago',
  },
  {
    type: 'Sold',
    quantity: 1,
    productName: 'Zoom75',
    image: zoom75,
    timeAgo: '23 m ago',
  },
  {
    type: 'Restocked',
    quantity: 12,
    productName: 'Zoom75',
    image: airpods,
    timeAgo: '42 m ago',
  },
  {
    type: 'Sold',
    quantity: 3,
    productName: 'Samsung Odyssey',
    image: samsung,
    timeAgo: '2 h ago',
  },
];

const AppRecentActivity = () => {
  return (
    <Card className="p-4 shadow-sm border-0" style={{ borderRadius: '12px', marginTop: -35, padding: 24 }}>
      <h5><strong>Recent Activity</strong></h5>
      <ListGroup variant="flush">
        {recentActivities.map((activity, idx) => (
          <div key={idx} className="mt-2">
            <div style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: '500' }}>
                {activity.type}{' '}
                <span style={{ color: '#0d6efd' }}>
                  {activity.quantity} {activity.quantity > 1 ? 'Products' : 'Product'}
                </span>
              </span>
            </div>
            <ListGroup.Item className="border-0 px-0 py-2">
              <Row className="align-items-center">
                <Col xs="auto">
                  <img
                    src={activity.image}
                    alt={activity.productName}
                    width={35}
                    height={35}
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
                </Col>
                <Col className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {activity.productName}
                </Col>
                <Col xs="auto" className="text-end text-muted" style={{ fontSize: '0.75rem' }}>
                  <BsClock className="me-1" />
                  {activity.timeAgo}
                </Col>
              </Row>
            </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </Card>
  );
};

export default AppRecentActivity;
