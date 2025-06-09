import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';

const AppSuppliersSearchBar = ({ onSearch }) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text><FiSearch /></InputGroup.Text>
      <Form.Control
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </InputGroup>
  );
};

export default AppSuppliersSearchBar;