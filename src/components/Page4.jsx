import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';
import AppSuppliersSearchBar from './AppSuppliersSearchBar.jsx';
import AppSuppliersList from './AppSuppliersList.jsx';
import AppSuppliersPaginator from './AppSuppliersPaginator.jsx';
import { GET_SUPPLIERS } from '../constants';
import AppSideAction from './AppSideAction.jsx';

export default function Page4() {
  const handleSearchChange = (e) => {
    console.log('Searching:', e.target.value);
  };

  const handleAddProduct = () => {
    console.log('Add product modal triggered');
  };
    
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, refetch } = useQuery(GET_SUPPLIERS, {
    variables: { search, page, limit },
  });

  useEffect(() => {
    refetch();
  }, [search, page, refetch, data]);

  const suppliers = data?.getSuppliers || [];
  const total = data?.totalSuppliers || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="my-4" style={
        {
          // padding: 200,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Cinzel',
          // alignItems: 'center'
          }}>
          <div style={{ marginLeft: 250, marginTop: 100, display: 'flex', flexDirection: 'column', height: '100%', width: '80%' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 style={{fontFamily: 'Cinzel'}}>Suppliers</h4>
                <Button variant="info">+ Edit Suppliers</Button>
            </div>
            {/* <div style={{width: '100%'}}> */}
                <AppSuppliersSearchBar onSearch={setSearch} />
                <AppSuppliersList suppliers={suppliers} />
                <AppSuppliersPaginator currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            {/* </div> */}
          </div>
          <AppSideAction/>
    </div>
  );
}