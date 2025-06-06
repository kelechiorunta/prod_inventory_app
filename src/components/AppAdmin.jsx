import React from 'react';
import { Image, Row, Col, Dropdown } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FETCH_PRODUCTS } from '../constants';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const AppAdmin = () => {
    const { data, error, loading } = useQuery(FETCH_PRODUCTS);
    const navigate = useNavigate();

  if (loading) {
    return (
      <Row className="align-items-center">
        <Col xs="auto">
          <Skeleton circle width={40} height={40} />
        </Col>
        <Col>
          <Skeleton width={80} height={15} />
          <Skeleton width={50} height={10} />
        </Col>
        <Col xs="auto">
          <Skeleton width={20} height={20} />
        </Col>
      </Row>
    );
  }

  if (error) return <div className="text-danger">Error loading admin info</div>;

  return (
    <Row className="align-items-center">
      <Col xs="auto">
        <Image
          src={data?.auth?.picture || './avatar.png'}
          roundedCircle
          width={40}
          height={40}
          alt="Admin"
        />
      </Col>
      <Col>
        <div className="fw-bold">{data?.auth?.username}</div>
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
            <Dropdown.Item onClick={()=>navigate('/dashboard/settings')}>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => { window.location.href = '/logout' }}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default AppAdmin;
