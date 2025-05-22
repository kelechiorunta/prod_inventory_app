import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import { CREATE_NEW_PRODUCT } from '../constants';
import MainHeader from './MainHeader';

const AddProductForm = () => {
    const [createNewProduct, { data, loading, error }] = useMutation(CREATE_NEW_PRODUCT);

    // const [fieldValue, setFieldValue] = useState('')
    const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    price: Yup.number().positive('Must be positive').required('Required'),
    description: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    rate: Yup.number().min(0).max(5).required('Required'),
    count: Yup.number().integer().min(0).required('Required'),
    imageFile: Yup
        .mixed()
        .required('Image is required')
        .test(
        'fileSize',
        'File is too large (max 1MB)',
        value => value && value.size <= 1024 * 1024
        )
        .test(
        'fileType',
        'Unsupported file format. Use PNG or JPEG.',
        value => value && ['image/jpeg', 'image/png'].includes(value.type)
        ),
    });

    const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = (error) => reject(error);
    });


    return (
      <Container md className='col-6-xlg col-12-md col-12-sm mt-100' style={{marginTop: '100px'}}>
        {/* <MainHeader/> */}
        <Formik
        initialValues={{
            title: '',
            price: '',
            description: '',
            category: '',
            rate: '',
            count: '',
            image: '',      // base64 string for GraphQL
            imageFile: null // actual file object for validation
            }}

        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
            const variables = {
            title: values.title,
            price: parseFloat(values.price),
            description: values.description,
            category: values.category,
            image: values.image,
            rating: {
                rate: parseFloat(values.rate),
                count: parseInt(values.count),
            },
            };

            createNewProduct({ variables }).then(() => resetForm());
        }}
        >
        {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue, // ✅ This line is required
        }) => (
            <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error.message}</Alert>}
            {data && <Alert variant="success">Product created: {data.createNewProduct.title}</Alert>}

            <Form.Group controlId="title" className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                as="textarea"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="category" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                type="text"
                name="category"
                value={values.category}
                onChange={handleChange}
                isInvalid={touched.category && !!errors.category}
                />
                <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group controlId="image" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                type="text"
                name="image"
                value={values.image}
                onChange={handleChange}
                isInvalid={touched.image && !!errors.image}
                />
                <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
            </Form.Group> */}
                        
         <Form.Group controlId="image" className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
                type="file"
                accept="image/*"
                onChange={async (event) => {
                const file = event.currentTarget.files[0];
                setFieldValue('imageFile', file); // For validation
                if (file) {
                    const base64 = await toBase64(file);
                    setFieldValue('image', base64); // For actual GraphQL mutation
                }
                }}
                isInvalid={touched.imageFile && !!errors.imageFile}
            />
            <Form.Control.Feedback type="invalid">{errors.imageFile}</Form.Control.Feedback>

            {values.image && (
                <div className="mt-2">
                <img src={values.image} alt="Preview" style={{ maxHeight: '150px' }} />
                </div>
            )}
            </Form.Group>



            <Row>
                <Col md={6}>
                <Form.Group controlId="rate" className="mb-3">
                    <Form.Label>Rating (0–5)</Form.Label>
                    <Form.Control
                    type="number"
                    step="0.1"
                    name="rate"
                    value={values.rate}
                    onChange={handleChange}
                    isInvalid={touched.rate && !!errors.rate}
                    />
                    <Form.Control.Feedback type="invalid">{errors.rate}</Form.Control.Feedback>
                </Form.Group>
                </Col>

                <Col md={6}>
                <Form.Group controlId="count" className="mb-3">
                    <Form.Label>Rating Count</Form.Label>
                    <Form.Control
                    type="number"
                    name="count"
                    value={values.count}
                    onChange={handleChange}
                    isInvalid={touched.count && !!errors.count}
                    />
                    <Form.Control.Feedback type="invalid">{errors.count}</Form.Control.Feedback>
                </Form.Group>
                </Col>
            </Row>

            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Add Product'}
            </Button>
            </Form>
        )}
            </Formik>
            
        </Container>
  );
};

export default AddProductForm;