// import React, { useState, useRef, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Button, Container, Form as BootstrapForm, Alert, NavLink, Row, Col } from 'react-bootstrap';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// const LoginSchema = Yup.object().shape({
//   username: Yup.string().required('Username is required'),
//   password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// export default function Login() {
//   const navigate = useNavigate();
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
  

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//         const response = await fetch('/signin', {
//         credentials: 'include',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Login failed');
//       }

//        setSuccessMessage(data.message || 'Login successful');
//       setServerError('');
//       window.location.href = '/'
//       //  navigate('/', {state: data.user})
//       // Optionally redirect or store session
//     } catch (err) {
//       setServerError(err.message);
//       setSuccessMessage('');
//       localStorage.removeItem('username');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
    
//       <Container xlg className='col-lg-6 col-xs-12 col-md-6 col-sm-12 flex-wrap' style={{minWidth: 300, display: 'flex', gap: '20px', maxWidth: '90%', marginTop: '100px' }}>
       
//           <Row
//           style={{minWidth: '300px', minHeight: '400px'}}
//           as={Col}
//           xlg className="col-xlg-6 px-4 py-2 ">
//           <h2 style={{fontFamily: 'Cinzel'}}
//             className="mb-4 text-center fs-1">Login</h2>

//           {serverError && <Alert style={{fontSize: '18px'} } variant="danger" className=''>{serverError}</Alert>}
//             {successMessage && <Alert style={{fontSize: '18px'} } variant="success" className=''>{successMessage}</Alert>}

//             <Formik
//               initialValues={{ username: '', password: '' }}
//               validationSchema={LoginSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form>
//                   <BootstrapForm.Group className="mb-2">
//                   <BootstrapForm.Label style={{fontFamily: 'Cinzel'}}
//                     className='fs-4 text-left'>Username</BootstrapForm.Label>
//                     <Field type="text" name="username" className="form-control" />
//                     <ErrorMessage style={{fontSize: '18px'} } name="username" component="div" className="text-danger" />
//                   </BootstrapForm.Group>

//                   <BootstrapForm.Group className="mb-2">
//                   <BootstrapForm.Label style={{fontFamily: 'Cinzel'}}
//                     className='fs-4'>Password</BootstrapForm.Label>
//                     <Field type="password" name="password" className="form-control" />
//                     <ErrorMessage style={{fontSize: '18px'} } name="password" component="div" className="text-danger" />
//                   </BootstrapForm.Group>

//                 <div
//                   style={{fontFamily: 'Cinzel'}}
//                   className="d-grid">
//                     <Button type="submit" className='fs-5' disabled={isSubmitting} variant="primary">
//                       {isSubmitting ? 'Logging in...' : 'Login'}
//                     </Button>
//                     <NavLink
//                     style={{fontFamily: 'Cinzel', width: '100%', borderRadius: '10px', color: 'white'}}
//                     href='/google' className='bg-primary fs-5 mt-2 p-2 mx-auto text-center'>
//                       Sign In with Google
//                     </NavLink>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//         </Row>       
//       </Container>
//   );
// }

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Container, Form as BootstrapForm, Alert, NavLink, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaGoogle } from 'react-icons/fa';

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
      window.location.href = '/';
    } catch (err) {
      setServerError(err.message);
      setSuccessMessage('');
      localStorage.removeItem('username');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: '100vh', maxWidth: '500px' }}
    >
      <Row className="w-100 shadow p-4 rounded bg-white">
        <Col>
          <h2 className="text-center mb-4" style={{ fontFamily: 'Cinzel' }}>Login</h2>

          {serverError && <Alert variant="danger">{serverError}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label style={{ fontFamily: 'Cinzel' }} className="fs-5">
                    <FaUser className="me-2" />
                    Username
                  </BootstrapForm.Label>
                  <Field type="text" name="username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label style={{ fontFamily: 'Cinzel' }} className="fs-5">
                    <FaLock className="me-2" />
                    Password
                  </BootstrapForm.Label>
                  <Field type="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <div className="d-grid mb-3">
                  <Button style={{ fontFamily: 'Cinzel' }} type="submit" disabled={isSubmitting} variant="primary" className="fs-5">
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </div>

                <div className="d-grid mb-3">
                  <NavLink
                    href="/google"
                    // className="btn btn-outline-primary text-center d-flex align-items-center justify-content-center"
                    // style={{ fontFamily: 'Cinzel' }}
                    style={{fontFamily: 'Cinzel', width: '100%', borderRadius: '10px', color: 'white'}}
                    className='bg-primary fs-5 mt-2 p-2 mx-auto text-center btn btn-outline-primary text-center d-flex align-items-center justify-content-center'
                  >
                    <FaGoogle className="me-2" /> Sign In with Google
                  </NavLink>
                </div>

                <div className="text-center mt-3">
                  <span style={{ fontFamily: 'Cinzel' }}>Don’t have an account? </span>
                  <NavLink href="/signup" className="text-primary" style={{ fontFamily: 'Cinzel', fontWeight: 'bold' }}>
                    Sign up
                  </NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
