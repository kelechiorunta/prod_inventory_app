import React from 'react'
import { Container } from 'react-bootstrap'
import AppStockChart from './AppStockChart.jsx'
import AppSalesSummary from './AppSalesSummary.jsx'
import AppSideAction from './AppSideAction.jsx'

export default function Page1() {
  return (
    <div style={{ display: 'flex', fontFamily: 'Cinzel' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AppSalesSummary/>
        <AppStockChart/>
      </div>
      <AppSideAction/>
    </div>
    
  )
}
