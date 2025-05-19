import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Form as BootstrapForm, Alert, NavLink, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';




const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
        const response = await fetch('/signin', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

       setSuccessMessage(data.message || 'Login successful');
       setServerError('');
       navigate('/', {state: data.user})
      // Optionally redirect or store session
    } catch (err) {
      setServerError(err.message);
      setSuccessMessage('');
      localStorage.removeItem('username');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    
      <Container xlg className='col-xlg-12 flex-wrap' style={{display: 'flex', gap: '20px', maxWidth: '90%', marginTop: '50px' }}>
       
          <Row
          style={{minWidth: '400px', minHeight: '400px'}}
          as={Col}
          xlg className="col-xlg-6 px-4 py-2 ">
          <h2 style={{fontFamily: 'Cinzel'}}
            className="mb-4 text-center fs-1">Login</h2>

          {serverError && <Alert style={{fontSize: '18px'} } variant="danger" className=''>{serverError}</Alert>}
            {successMessage && <Alert style={{fontSize: '18px'} } variant="success" className=''>{successMessage}</Alert>}

            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <BootstrapForm.Group className="mb-2">
                  <BootstrapForm.Label style={{fontFamily: 'Cinzel'}}
                    className='fs-4 text-left'>Username</BootstrapForm.Label>
                    <Field type="text" name="username" className="form-control" />
                    <ErrorMessage style={{fontSize: '18px'} } name="username" component="div" className="text-danger" />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-2">
                  <BootstrapForm.Label style={{fontFamily: 'Cinzel'}}
                    className='fs-4'>Password</BootstrapForm.Label>
                    <Field type="password" name="password" className="form-control" />
                    <ErrorMessage style={{fontSize: '18px'} } name="password" component="div" className="text-danger" />
                  </BootstrapForm.Group>

                <div
                  style={{fontFamily: 'Cinzel'}}
                  className="d-grid">
                    <Button type="submit" className='fs-5' disabled={isSubmitting} variant="primary">
                      {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                  {/* <NavLink
                    style={{fontFamily: 'Cinzel', borderRadius: '10px'}}
                    href='/google' className='bg-primary fs-5 mt-2 p-1'>
                      Sign In with Google
                    </NavLink> */}
                  </div>
                </Form>
              )}
            </Formik>
        </Row>       
      </Container>
  );
}