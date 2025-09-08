import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? <img src={product.image} alt={product.title} /> : <div className="no-image">No Image</div>}
      </div>
      <div className="product-body">
        <h3>{product.title}</h3>
        <div className="price">{product.price ? `${product.price} đ` : 'Giá'}</div>
        <div className="category">{product.category}</div>
      </div>
    </div>
  );
}