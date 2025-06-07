// AppPaginateBtns.jsx
import React from 'react';
import { Pagination } from 'react-bootstrap';

const AppPaginateBtns = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />
      {pages.map((page) => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
    </Pagination>
  );
};

export default AppPaginateBtns;
