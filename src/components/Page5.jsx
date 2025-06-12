import React from 'react'
import { Container } from 'react-bootstrap'
import AppInventorySearchBar from './AppInventorySearchBar.jsx';
import AppInventoryProductList from './AppInventoryProductList.jsx';
import AppSideAction from './AppSideAction.jsx';
import AppSalesReport from './AppSalesReport.jsx';
import AppWeeklySalesReport from './AppWeeklySalesReport.jsx';

export default function Page4() {
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
        className="container">
        <AppInventorySearchBar
          onSearchChange={handleSearchChange}
          onAddProduct={handleAddProduct}
        />
       <AppWeeklySalesReport/>
      </div>
      <AppSideAction />
    </div>
  )
}
