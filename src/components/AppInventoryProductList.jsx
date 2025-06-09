// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Table, Image, Form } from 'react-bootstrap';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import { FETCH_PRODUCTS } from '../constants';



// const ProductSkeletonRow = () => (
//   <tr>
//     <td><Form.Check type="checkbox" disabled /></td>
//     <td><Skeleton width={100} /></td>
//     <td><Skeleton width={50} /></td>
//     <td><Skeleton width={70} /></td>
//     <td><Skeleton width={60} /></td>
//     <td><Skeleton width={40} /></td>
//     <td><Skeleton height={50} width={50} circle /></td>
//   </tr>
// );

// const AppInventoryProductList = () => {
//   const { data, loading, error } = useQuery(FETCH_PRODUCTS);

//   return (
//     <div className="mt-4">
//       <h5><strong>Product List</strong></h5>
//       <div className="table-responsive">
//         <Table bordered hover className="align-middle text-center" style={{ borderRadius: '12px', overflow: 'hidden' }}>
//           <thead className="table-light">
//             <tr>
//               <th><Form.Check type="checkbox" /></th>
//               <th>Name</th>
//               <th>Code</th>
//               <th>Type</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && Array.from({ length: 6 }).map((_, idx) => <ProductSkeletonRow key={idx} />)}

//             {!loading && !error && data?.products?.map((product) => (
//               <tr key={product.id} style={{ backgroundColor: '#f9fbfd' }}>
//                 <td><Form.Check type="checkbox" /></td>
//                 <td>{product.title}</td>
//                 <td>#{product.id}</td>
//                 <td>{product.category}</td>
//                 <td>${product.price.toLocaleString()}</td>
//                 <td>{product.rating.count}</td>
//                 <td>
//                   <Image
//                     src={product.image}
//                     rounded
//                     style={{ width: '60px', height: 'auto', objectFit: 'cover' }}
//                     alt={product.title}
//                   />
//                 </td>
//               </tr>
//             ))}

//             {!loading && error && (
//               <tr>
//                 <td colSpan="7" className="text-danger">Failed to load products.</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default AppInventoryProductList;

import React, { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Table, Image, Form } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FETCH_PAGINATED_PRODUCTS } from '../constants';
import AppPaginateBtns from './AppPaginateBtns';

const ProductSkeletonRow = () => (
  <tr>
    <td><Form.Check type="checkbox" disabled /></td>
    <td><Skeleton width={100} /></td>
    <td><Skeleton width={50} /></td>
    <td><Skeleton width={70} /></td>
    <td><Skeleton width={60} /></td>
    <td><Skeleton width={40} /></td>
    <td><Skeleton height={50} width={50} circle /></td>
  </tr>
);

const AppInventoryProductList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState('');
  const limit = 5;

  const totalRef = useRef(0); // 👈 cache totalProducts

  const [fetchProducts, { data, loading, error }] = useLazyQuery(FETCH_PAGINATED_PRODUCTS);

  useEffect(() => {
    fetchProducts({ variables: { page } });
  }, [page, fetchProducts]);

  // Cache totalProducts if it changes
  useEffect(() => {
    if (data?.totalProducts) {
        totalRef.current = data.totalProducts;
        setTotal(totalRef.current)
    }
  }, [data?.totalProducts, totalRef]);

  const products = data?.getProducts || [];
  const totalPages = Math.ceil(total / limit); // 👈 use cached total

  return (
    <div className="mt-4">
      <h5><strong>Product List</strong></h5>
      <div className="table-responsive">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-light">
            <tr>
              <th><Form.Check type="checkbox" /></th>
              <th>Name</th>
              <th>Code</th>
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {loading && Array.from({ length: 5 }).map((_, idx) => <ProductSkeletonRow key={idx} />)}

            {!loading && !error && products.map((product) => (
              <tr key={product.id}>
                <td><Form.Check type="checkbox" /></td>
                <td>{product.title}</td>
                <td>#{product.id}</td>
                <td>{product.category}</td>
                <td>${product.price.toLocaleString()}</td>
                <td>{product.rating.count}</td>
                <td>
                  <Image
                    src={product.image}
                    rounded
                    style={{ width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center' }}
                    alt={product.title}
                  />
                </td>
              </tr>
            ))}

            {!loading && error && (
              <tr>
                <td colSpan="7" className="text-danger">Failed to load products.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <AppPaginateBtns
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AppInventoryProductList;
