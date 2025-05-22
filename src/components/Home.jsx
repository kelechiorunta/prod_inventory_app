import React from 'react'
import '../App.css'
import logo from '../logo.svg';
import { useQuery } from '@apollo/client';
import { FETCH_PRODUCTS } from '../constants';
import ProductCard from './ProductCard.jsx';
import MainHeader from './MainHeader.jsx';
import { Container } from 'react-bootstrap';
import Subscription from './Subscription.jsx';

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_PRODUCTS, {
  fetchPolicy: 'cache-first',
  nextFetchPolicy: 'cache-first',
});

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
      <div className="App">
          <MainHeader auth={data?.auth} />
          
          <Subscription />
          
          <Container style={{padding: '100px'}}>
            <div className="row g-4">
                {data && data.products.map((product, index) => (
                <div key={index} className="col-12 col-md-12 col-lg-6 col-xl-4">
                        <ProductCard product={product} auth={ data?.auth } />
                </div>
                ))}
            </div>
          </Container>
                        
      </div>
  )
}
