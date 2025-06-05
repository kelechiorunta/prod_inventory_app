import { useQuery, useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Alert, Button, Card, Container, Spinner, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaEnvelope, FaImage, FaUser, FaSave, FaUnlock, FaUpload } from 'react-icons/fa';
import { FETCH_PRODUCTS, UPDATE_USER } from '../constants';

  
  const ProfileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    picture: Yup.string().required('Profile picture is required'),
    password: Yup.string().min(6, 'At least 6 characters'),
  });
  
  export default function AppProfile() {
    const { loading, error, data } = useQuery(FETCH_PRODUCTS);
    const [updateUser] = useMutation(UPDATE_USER);
  
    const skeleton = (
      <Card className="p-4 shadow-lg" style={{ maxWidth: 600, width: '100%', borderRadius: '20px' }}>
        <h3 className="text-center mb-4" style={{ fontFamily: 'Cinzel' }}>
          <Skeleton width={180} height={32} />
        </h3>
        <Skeleton height={50} className="mb-3" />
        <Skeleton height={50} className="mb-3" />
        <Skeleton height={50} className="mb-3" />
        <div className="text-center mb-3">
          <Skeleton circle width={150} height={150} />
        </div>
        <Skeleton height={50} className="mb-3" />
        <Skeleton height={48} className="mt-3" />
      </Card>
    );
  
    if (loading || !data) {
      return <Container className="py-5 d-flex justify-content-center">{skeleton}</Container>;
    }
  
    if (error) {
      return <Alert variant="danger">Failed to load profile.</Alert>;
    }
  
    const { email, username, picture } = data.auth;
  
    const convertToBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
  
    return (
      <Container className="py-5 d-flex justify-content-center">
        <Card className="p-4 shadow-lg" style={{ maxWidth: 600, width: '100%', borderRadius: '20px' }}>
          <h3 className="text-center mb-4" style={{ fontFamily: 'Cinzel' }}>Edit Profile</h3>
  
          <Formik
            initialValues={{ email, username, picture, password: '' }}
            validationSchema={ProfileSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const { password, ...rest } = values;
              const input = password ? values : rest;
  
              try {
                await updateUser({ variables: input });
                resetForm({ values });
              } catch (err) {
                console.error(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, isSubmitting, setFieldValue, handleChange, handleBlur }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label><FaEnvelope className="me-2" />Email</BootstrapForm.Label>
                  <Field type="email" name="email" className="form-control" readOnly />
                </BootstrapForm.Group>
  
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label><FaUser className="me-2" />Username</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </BootstrapForm.Group>
  
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label><FaImage className="me-2" />Profile Picture</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="picture"
                    className="form-control mb-2"
                    readOnly
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={async (event) => {
                      const file = event.currentTarget.files[0];
                      if (file) {
                        const base64 = await convertToBase64(file);
                        setFieldValue('picture', base64);
                      }
                    }}
                  />
                  <small className="text-muted"><FaUpload className="me-1" /> Upload to replace current picture</small>
                  <ErrorMessage name="picture" component="div" className="text-danger" />
                </BootstrapForm.Group>
  
                {values.picture && (
                  <div className="text-center mb-3">
                    <img
                      src={values.picture}
                      alt="Preview"
                      className="img-thumbnail rounded"
                      style={{ maxWidth: 150 }}
                    />
                  </div>
                )}
  
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label><FaUnlock className="me-2" />New Password</BootstrapForm.Label>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Leave blank to keep current"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </BootstrapForm.Group>
  
                <div className="d-grid mt-3">
                  <Button type="submit" disabled={isSubmitting} variant="primary" className="fs-5">
                    <FaSave className="me-2" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Container>
    );
  }
  

