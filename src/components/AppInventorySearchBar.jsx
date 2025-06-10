import React from 'react';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const AppInventorySearchBar = ({ onSearchChange, onAddProduct }) => {
  const location = useLocation();
  return (
    <Row className="align-items-center p-3 bg-light" style={{ borderRadius: '8px' }}>
      <Col xs="auto">
        <strong style={{ fontSize: '1.1rem' }}>{location.pathname === '/dashboard/page2' ? 'Inventory' : 'Sales Order'}</strong>
      </Col>

      <Col>
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            onChange={onSearchChange}
          />
        </InputGroup>
      </Col>

      <Col xs="auto">
        <Button
          variant="info"
          className="text-white fw-bold d-flex align-items-center"
          onClick={onAddProduct}
        >
          <FaPlus className="me-2" /> {location.pathname === '/dashboard/page2'? 'Edit Product' : 'Place Order'}
        </Button>
      </Col>
    </Row>
  );
};

export default AppInventorySearchBar;
