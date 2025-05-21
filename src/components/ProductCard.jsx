import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBill, FaTrash } from 'react-icons/fa';
import { DELETE_PRODUCT, FETCH_PRODUCTS } from '../constants';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product, auth }) {
    const navigate = useNavigate();
    const [deleteProduct, { data, error }] = useMutation(DELETE_PRODUCT)
    const handleDelete = async (product) => {
  try {
    await deleteProduct({
      variables: {
        id: product.id
      },
      update: (cache, { data: { deleteProduct } }) => {
        // Read the current list of products
        const existing = cache.readQuery({ query: FETCH_PRODUCTS });

        if (!existing?.products) return;

            // Filter out the deleted product by ID
            const updatedProducts = existing.products.filter(p => p.id !== product.id);

            // Write the new product list back to the cache
            cache.writeQuery({
            query: FETCH_PRODUCTS,
            data: {
                products: updatedProducts
            }
            });
        },
        onCompleted: () => {
            console.log("Product deleted successfully");
            // Optionally navigate or show toast
            // navigate('/'); // only if needed
        }
            });
        } catch (err) {
            console.error("Unable to delete Product", err || error);
        }
        };

    return (
     
        <div className="card h-100 shadow-sm ">
            <Link to={
                auth && auth.username.startsWith('Kelechi') &&
                `/product/${product.id}`}>
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
              <div className="d-flex justify-content-between align-items-center mt-4">
                <FaMoneyBill
                    onClick={() => { navigate(`/payment/${product.id}`, {state: product}) }}
                    size={20}
                    style={{ cursor: 'pointer' }}
                    className="text-dark"
                />
                    {auth?.username.startsWith("Kelechi") && 
                <FaTrash
                    onClick={() => handleDelete(product)}
                    size={20}
                    style={{ cursor: 'pointer' }}
                    className="text-dark"
                    />
                    }
              </div>
            </div>
          
        </div>
  );
}
