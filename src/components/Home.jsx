
import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../logo.svg';
import { useQuery, useSubscription } from '@apollo/client';
import { FETCH_PRODUCTS, AUTH } from '../constants.js';
import ProductCard from './ProductCard.jsx';
import MainHeader from './MainHeader.jsx';
import { Container, Spinner } from 'react-bootstrap';
import Subscription from './Subscription.jsx';
import Modal from './Modal.jsx';
import { ViewProvider, ViewChild } from './ViewContext.jsx';

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_PRODUCTS, {
    fetchPolicy: 'cache-first',
  });

  const { data: authSubData, loading: authSubLoading } = useSubscription(AUTH);

  const [active, setActive] = useState(null);

  useEffect(() => {
    if (loading) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [loading]);

  
  if (error) return <h1>Something went wrong</h1>;

  return (
    <div className="App">
      <MainHeader auth={data?.auth} />
      <Container style={{ padding: '100px 50px' }}>
      
        {/* {(active) && */}
          <Modal isActive={active}>
            <Spinner animation="border" role="status" />
            <Subscription user={authSubData?.authUpdate} />
          </Modal>
        {/* } */}
        <ViewProvider>
          <div className="row g-4">
            {data?.products.map((product, index) => (
              
              <div key={index} className="col-12 col-md-12 col-lg-6 col-xl-4">
                <ViewChild loading={loading && data} index={index} id={`product${index}`}>
                  <ProductCard product={product} auth={data?.auth} />
                </ViewChild>
                </div>
             
            ))}
          </div>
        </ViewProvider>
        
      </Container>
    </div>
  );
}
