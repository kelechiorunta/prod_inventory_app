import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form as BootstrapForm, Button, Alert, Card } from 'react-bootstrap';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Signup() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSuccessMessage(data.message || 'Signup successful');
      setServerError('');
      resetForm();
      navigate('/'); // Or redirect as needed
    } catch (error) {
      setServerError(error.message);
      setSuccessMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #667eea, #764ba2)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/assets/product-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: '1rem',
      }}
    >
      <Container style={{ maxWidth: '500px' }}>
        <Card className="shadow-lg p-4" style={{ borderRadius: '20px', backgroundColor: 'rgba(255,255,255,0.95)' }}>
          <h2 className="text-center mb-4" style={{ fontFamily: 'Cinzel' }}>Create Account</h2>

          {serverError && <Alert variant="danger">{serverError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label className="fs-5" style={{ fontFamily: 'Cinzel' }}>
                    <FaEnvelope className="me-2" />
                    Email
                  </BootstrapForm.Label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label className="fs-5" style={{ fontFamily: 'Cinzel' }}>
                    <FaUser className="me-2" />
                    Username
                  </BootstrapForm.Label>
                  <Field type="text" name="username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label className="fs-5" style={{ fontFamily: 'Cinzel' }}>
                    <FaLock className="me-2" />
                    Password
                  </BootstrapForm.Label>
                  <Field type="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <div className="d-grid">
                  <Button type="submit" disabled={isSubmitting} variant="primary" className="fs-5">
                    {isSubmitting ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <span style={{ fontFamily: 'Cinzel' }}>Already have an account? </span>
                  <a href="/login" className="text-primary" style={{ fontWeight: 'bold' }}>Login</a>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    </div>
  );
}
