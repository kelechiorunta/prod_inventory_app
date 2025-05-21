import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { VERIFY_PAYMENT } from '../constants';
import { Spinner, Alert, Container, Card } from 'react-bootstrap';

// Helper to parse query params
function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPayment = () => {
  const query = useQueryParams();
  const reference = query.get('reference'); // e.g., l362vz1vxu

  const { loading, error, data } = useQuery(VERIFY_PAYMENT, {
    variables: { token: reference },
    skip: !reference, // Avoid running the query if no token
  });

  if (!reference) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No payment reference found in URL.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
        <Container xlg style={{
            position: 'fixed', display: 'flex',
            width: '100%', inset: 0, top: 0, left: 0,
            zIndex: 20,
            // backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
        }}
            className="text-center mt-5">
            <Spinner animation="border" fill={'white' } />
        {/* <p>Verifying payment...</p> */}
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  const { reference: ref, amount, status, customerEmail, gatewayResponse } = data.verifyPayment;

  return (
    <Container className="mt-5" style={{marginTop: '100px', paddingTop: '100px'}}>
      <Card className="shadow p-4">
        <h3 className="text-success">Payment Verified</h3>
        <p><strong>Reference:</strong> {ref}</p>
        <p><strong>Amount:</strong> ₦{(amount / 100).toFixed(2)}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Customer Email:</strong> {customerEmail}</p>
        <p><strong>Gateway Response:</strong> {gatewayResponse}</p>
      </Card>
    </Container>
  );
};

export default VerifyPayment;
