import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaChartLine, FaShoppingBag, FaDollarSign } from 'react-icons/fa';
import { MdOutlineInventory } from 'react-icons/md';

const summaryData = [
  {
    icon: <FaChartLine size={24} color="#4fc3f7" />,
    value: '143.3k',
    label: "Today's Sale",
    bg: '#e3f2fd',
  },
  {
    icon: <FaDollarSign size={24} color="#ab47bc" />,
    value: '$250,423',
    label: 'Yearly Total Sales',
    bg: '#f3e5f5',
  },
  {
    icon: <FaDollarSign size={24} color="#ffb74d" />,
    value: '$68.9k',
    label: 'Net Income',
    bg: '#fff3e0',
  },
  {
    icon: <FaShoppingBag size={24} color="#ec407a" />,
    value: '343',
    label: 'Products',
    bg: '#fce4ec',
    border: true,
  },
];

const AppSalesSummary = () => {
  return (
    <div style={{ backgroundColor: '#f5f7ff', padding: '1rem', borderRadius: '10px', width: '80%', marginLeft: 200 }}>
      <h5 className="mb-4">Sales Summary</h5>
      <Row>
        {summaryData.map((item, index) => (
          <Col key={index} md={3} sm={6} xs={12} className="mb-3">
            <Card
              className="shadow-sm"
              style={{
                border: item.border ? '2px solid #2196f3' : 'none',
                padding: '10px 15px',
                borderRadius: '12px',
              }}
            >
              <Card.Body className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: item.bg,
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 15,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h6 style={{ margin: 0 }}>{item.value}</h6>
                  <small className="text-muted">{item.label}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AppSalesSummary;
