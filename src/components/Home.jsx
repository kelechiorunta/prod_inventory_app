import React from 'react'
import '../App.css'
import logo from '../logo.svg';
import { useQuery } from '@apollo/client';
import { FETCH_PRODUCTS } from '../constants';
import ProductCard from './ProductCard.jsx';
import MainHeader from './MainHeader.jsx';

export default function Home() {
   const { loading, error, data } = useQuery(FETCH_PRODUCTS);
  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
      <div className="App">
          <MainHeader />
          {/* <a href='/logout'>Logout</a> */}
      
          {data && data.products.map((product) => (
              <ProductCard product={product} />
          ))}
    </div>
  )
}
