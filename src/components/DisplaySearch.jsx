import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard'
import MainHeader from './MainHeader'

export default function DisplaySearch({results}) {
    return (
        <>
           {/* <MainHeader/> */}
            {(results && results.length > 0) && (
                <Row className="g-4"
                    style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                    {results.map((product, index) => (
                        <Col key={index} xs={12} lg={4}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
      
  )
}
