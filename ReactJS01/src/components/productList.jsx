import React from 'react';
import ProductCard from '../components/productCart';

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return <div>Chưa có sản phẩm</div>;
  }
  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}