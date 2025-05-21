import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_PRODUCT } from '../constants';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import ProductCard from './ProductCard';

const SearchProduct = () => {
  const [filters, setFilters] = useState({
    name: '',
    category: 'all',
    sort: 'asc',
    limit: 10,
  });

  const [results, setResults] = useState([]);

  const [searchProduct, { loading, error }] = useLazyQuery(SEARCH_PRODUCT, {
    onCompleted: (data) => {
      if (data && data.searchProduct) {
        setResults(data.searchProduct);
      }
    },
    onError: (err) => {
      console.error('Search error:', err);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProduct({ variables: filters });
  };

  return (
    <Container className="mt-5" style={{paddingTop: '100px'}}>
      <Card className="p-4 shadow">
        <h3 className="mb-4">Search Products</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={filters.name}
                  onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="all">All</option>
                  <option value="Men">Men's clothing</option>
                  <option value="Women">Women's clothing</option>
                  <option value="Perfumes">Perfumes</option>
                  <option value="electronics">Electronics</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="sort">
                <Form.Label>Sort by Price</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Asc"
                    type="radio"
                    name="sort"
                    checked={filters.sort === 'asc'}
                    onChange={() => setFilters({ ...filters, sort: 'asc' })}
                  />
                  <Form.Check
                    inline
                    label="Desc"
                    type="radio"
                    name="sort"
                    checked={filters.sort === 'desc'}
                    onChange={() => setFilters({ ...filters, sort: 'desc' })}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {error && <p className="text-danger mt-3">{error.message}</p>}

      {results.length > 0 && (
              <Row className="g-4" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
                {results.map((product, index) => (
                    <Col key={index} xs={12} lg={4}>
                    <ProductCard product={product} />
                    </Col>
                ))}
              </Row>
      )}
    </Container>
  );
};

export default SearchProduct;
