import React from 'react'
import { Container } from 'react-bootstrap'
import AppInventorySearchBar from './AppInventorySearchBar.jsx';
import AppInventoryProductList from './AppInventoryProductList.jsx';
import AppSideAction from './AppSideAction.jsx';

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
        // padding: 200,
        width: '100%',
        height: '100%',
        display: 'flex',
        fontFamily: 'Cinzel',
        // alignItems: 'center'
      }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '80%' }}
        className="container">
        <AppInventorySearchBar
          onSearchChange={handleSearchChange}
          onAddProduct={handleAddProduct}
        />
        <AppInventoryProductList/>
      </div>
        <AppSideAction/>
    </div>
  )
}