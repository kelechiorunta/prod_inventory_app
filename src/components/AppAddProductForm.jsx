import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NEW_PRODUCT, FETCH_PAGINATED_PRODUCTS } from '../constants';

const AppAddProductForm = ({ show, handleClose }) => {
    const [total, setTotal] = useState('');
    const { data, loading, error } = useQuery(FETCH_PAGINATED_PRODUCTS);
    
    useEffect(() => {
        if (data?.totalProducts) {
            setTotal(data.totalProducts)
        }
    },[data?.totalProducts])
    
    const totalPages = Math.ceil(total/ 5)
    const [createProduct] = useMutation(CREATE_NEW_PRODUCT, {
        refetchQueries: [
          {
            query: FETCH_PAGINATED_PRODUCTS,
            variables: { page: totalPages }, // Always refresh page 1
          },
        ],
        awaitRefetchQueries: true,
    });
  const initialValues = {
    title: '',
    price: '',
    category: '',
    image: '',
    description: '',
    rating: {
      rate: '',
      count: '',
    },
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive(),
    category: Yup.string().required('Category is required'),
    image: Yup.string().required('Image is required'),
    description: Yup.string().required('Description is required'),
    rating: Yup.object({
      rate: Yup.number().required('Rate is required').min(0).max(5),
      count: Yup.number().required('Count is required').min(0),
    }),
  });

  const handleImageUpload = async (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue('image', reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      const { title, price, category, image, description, rating } = values;

      await createProduct({
        variables: {
          title,
          price: parseFloat(price),
          category,
          image,
          description,
          rating: {
            rate: parseFloat(rating.rate),
            count: parseInt(rating.count, 10),
          },
          },
          refetchQueries: [{ query: FETCH_PAGINATED_PRODUCTS, variables: { page: totalPages }, // Always refresh page 1
           }],
          awaitRefetchQueries: true,
      });

      actions.resetForm();
      handleClose();
    } catch (error) {
      console.error('Failed to create product:', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Modal style={{fontFamily: 'Cinzel'}} show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="g-2">
                <Col sm={6}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.title && !!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.price && !!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="g-2 mt-2">
                <Col sm={6}>
                  <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.category && !!errors.category}
                    />
                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="image">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setFieldValue)}
                      isInvalid={touched.image && !!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    {values.image && (
                      <img
                        src={values.image}
                        alt="Preview"
                        style={{ marginTop: 8, maxHeight: 100 }}
                      />
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="description" className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
              </Form.Group>

              <Row className="g-2 mt-2">
                <Col sm={6}>
                  <Form.Group controlId="rating.rate">
                    <Form.Label>Rating (0–5)</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating.rate"
                      value={values.rating.rate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.rating?.rate && !!errors.rating?.rate}
                    />
                    <Form.Control.Feedback type="invalid">{errors.rating?.rate}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="rating.count">
                    <Form.Label>Rating Count</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating.count"
                      value={values.rating.count}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.rating?.count && !!errors.rating?.count}
                    />
                    <Form.Control.Feedback type="invalid">{errors.rating?.count}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Add Product'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AppAddProductForm;
