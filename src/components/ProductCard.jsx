import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
     
        <div className="card h-100 shadow-sm ">
           <Link to={`/newProduct/${product.id}`}>
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: '250px', objectFit: 'contain' }}
                />
            </Link> 
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted" style={{ flex: 1 }}>{product.description.slice(0, 100)}...</p>
                <div className="mt-auto">
                <h6 className="text-primary">${product.price.toFixed(2)}</h6>
                <p className="text-warning mb-0">
                    ⭐ {product.rating?.rate || 'N/A'} ({product.rating?.count || 0} reviews)
                </p>
                </div>
            </div>
          
        </div>
  );
}
