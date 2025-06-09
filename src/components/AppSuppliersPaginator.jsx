// File: components/AppSuppliersPaginator.jsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

const AppSuppliersPaginator = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={currentPage === index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );
};

export default AppSuppliersPaginator;
