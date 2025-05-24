// import React, { useEffect, useState } from 'react'
// import '../App.css'
// import logo from '../logo.svg';
// import { useQuery } from '@apollo/client';
// import { AUTH, FETCH_PRODUCTS } from '../constants';
// import ProductCard from './ProductCard.jsx';
// import MainHeader from './MainHeader.jsx';
// import { Container } from 'react-bootstrap';
// import Subscription from './Subscription.jsx';
// import Modal from './Modal.jsx';

// export default function Home() {
  
//   const [subscribeToAuth, {loading, error, data }] = useQuery(FETCH_PRODUCTS, {
//   fetchPolicy: 'cache-first',
//   nextFetchPolicy: 'cache-first',
//   });
  
//   const [active, setActive] = useState(null)

//   if (error) <h1>Something went wrong</h1>;
//   // if (loading) return <;

//   useEffect(() => {
//     // This assumes you want to wait to start the subscription
//     // after the query has loaded.
//     if (data) {
//       const unsubscribe = subscribeToAuth({
//         document: AUTH,
//         updateQuery: (prev, { subscriptionData }) => {
//           if (!subscriptionData.data) return prev;
//           const newUpdate = subscriptionData.data.authUpdate;

//           return Object.assign({}, prev, {
//             authUpdate: {
//               user: newUpdate,
//             },
//           });
//         },
//       });

//       return () => {
//         unsubscribe();
//       };
//     }
//   }, [data, subscribeToAuth]);

  
//   useEffect(() => {
  
//     loading && setActive(true) 

//     const timeoutId = setTimeout(() => {
//       setActive(false);
//     }, 5000);

//     return () => clearTimeout(timeoutId);
//   }, [loading])

//   return (
//       <div className="App">
//           <MainHeader auth={data?.auth} />
          
//       <Container style={{ padding: '100px' }}>
        
//         <Modal isActive={ active}><Subscription /></Modal>
        
//             <div className="row g-4">
//                 {data && data.products.map((product, index) => (
//                 <div key={index} className="col-12 col-md-12 col-lg-6 col-xl-4">
//                     <ProductCard product={product} auth={data?.auth} />
//                 </div>
//                 ))}
          
//             </div>
//       </Container>

          
//       </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../logo.svg';
import { useQuery, useSubscription } from '@apollo/client';
import { FETCH_PRODUCTS, AUTH } from '../constants.js';
import ProductCard from './ProductCard.jsx';
import MainHeader from './MainHeader.jsx';
import { Container } from 'react-bootstrap';
import Subscription from './Subscription.jsx';
import Modal from './Modal.jsx';
import ProductSubscriptionToast from './ProductSubscriptionToast.jsx';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const { loading, error, data } = useQuery(FETCH_PRODUCTS, {
    fetchPolicy: 'cache-first',
  });

  const { data: authSubData, loading: authSubLoading } = useSubscription(AUTH);

  const [active, setActive] = useState(null);

  useEffect(() => {
    if (loading) {
      setActive(true)
    }
      const timeoutId = setTimeout(() => {
        setActive(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
  }, [loading]);

  if (error) return <h1>Something went wrong</h1>;

  return (
    <div className="App">
      <MainHeader auth={data?.auth} />
      <Container style={{ padding: '100px' }}>
        <Modal isActive={active}>
          <Subscription user={authSubData?.authUpdate} />
        </Modal>

        <div className="row g-4">
          {data?.products.map((product, index) => (
            <div key={index} className="col-12 col-md-12 col-lg-6 col-xl-4">
              <ProductCard product={product} auth={data?.auth} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
