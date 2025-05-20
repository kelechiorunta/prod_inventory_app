import React from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { INITIALIZE_PAYMENT } from '../constants';
import { useParams, useLocation } from 'react-router-dom';

const PaymentForm = () => {
  const params = useParams();
  const location = useLocation();
  const product = location.state;
  const [initializePayment, { data, loading, error }] = useMutation(INITIALIZE_PAYMENT);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    price: Yup.number().min(10, 'Minimum amount is 10').required('Price is required'),
  });

  return (
    <Container className="mt-5 col-md-6" style={{marginTop: '100px', paddingTop: '100px'}}>
      <h2 className="mb-4">Initialize Payment</h2>

        <Formik
        enableReinitialize
        initialValues={{ email: '', price: product && product?.price }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const { data } = await initializePayment({
              variables: {
                email: values.email,
                price: parseFloat(values.price),
              },
            });
            console.log('Payment initialized:', data.initializePayment);
            window.location.href = data.initializePayment.authorization_url; // Redirect to payment page
          } catch (err) {
            console.error('Payment initialization failed', err);
          }
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error.message}</Alert>}

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Amount (₦)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Minimum 1000"
                value={values.price}
                onChange={handleChange}
                isInvalid={touched.price && !!errors.price}
              />
              <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Initializing...' : 'Pay Now'}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default PaymentForm;
