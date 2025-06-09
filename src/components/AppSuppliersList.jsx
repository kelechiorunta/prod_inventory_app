import React from 'react';
import { Table, Image, Alert, Placeholder } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_SUPPLIERS } from '../constants';

const SkeletonRow = () => (
  <tr>
    {[...Array(5)].map((_, i) => (
      <td key={i}>
        <Placeholder as="span" animation="wave">
          <Placeholder xs={8} />
        </Placeholder>
      </td>
    ))}
  </tr>
);

const AppSuppliersList = () => {
  const { data, loading, error } = useQuery(GET_SUPPLIERS);
  const suppliers = data?.getSuppliers || [];

  return (
    <Table
      style={{ width: '100%', tableLayout: 'fixed' }}
      responsive
      hover
      bordered
    >
      <colgroup>
        <col style={{ width: '70%' }} />
        <col style={{ width: '100%' }} />
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
        <col style={{ width: '50%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>Supplier Name</th>
          <th>Email</th>
          <th>Contact No.</th>
          <th>Company</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          [...Array(5)].map((_, index) => <SkeletonRow key={index} />)
        ) : error ? (
          <tr>
            <td colSpan="5">
              <Alert variant="danger" className="mb-0">
                Failed to load suppliers.
              </Alert>
            </td>
          </tr>
        ) : (
          suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>
                <Image
                  src={supplier.logo || 'https://via.placeholder.com/30'}
                  roundedCircle
                  width={30}
                  className="me-2"
                />
                {supplier.name}
              </td>
              <td>{supplier.email}</td>
              <td>{supplier.contact}</td>
              <td>{supplier.company}</td>
              <td className="text-primary" style={{ cursor: 'pointer' }}>
                Order History
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default AppSuppliersList;

