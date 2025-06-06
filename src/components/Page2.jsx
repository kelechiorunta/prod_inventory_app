import React from 'react'
import { Container } from 'react-bootstrap'
import AppInventorySearchBar from './AppInventorySearchBar.jsx';

export default function Page2() {
  const handleSearchChange = (e) => {
    console.log('Searching:', e.target.value);
  };

  const handleAddProduct = () => {
    console.log('Add product modal triggered');
  };
  return (
    <div style={
      {
        padding: 200,
        width: '100%',
        height: '100vh',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div className="container mt-4">
        <AppInventorySearchBar
          onSearchChange={handleSearchChange}
          onAddProduct={handleAddProduct}
        />
    </div>
    </div>
  )
}