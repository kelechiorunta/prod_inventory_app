import React from 'react';
import { Image, Row, Col, Dropdown } from 'react-bootstrap';

const AppAdmin = () => {
  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <Image
          src="https://i.pravatar.cc/40?img=1"
          roundedCircle
          width={40}
          height={40}
          alt="Admin"
        />
      </Col>
      <Col>
        <div className="fw-bold">Bryan Doe</div>
        <small className="text-muted">Admin</small>
      </Col>
      <Col xs="auto">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            size="sm"
            id="dropdown-basic"
            style={{ border: 'none' }}
          >
            ⋮
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default AppAdmin;
