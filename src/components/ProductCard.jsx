import React from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="card-image-box">
        <img src={product.image} alt={product.name} />
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="card-info">
        <h3>{product.name}</h3>
        <p className="product-price">
          Giá chỉ từ: <span>{product.price}</span>
        </p>
        <a href="https://zalo.me" target="_blank" rel="noreferrer" className="btn-card">
          Xem & Đặt Mẫu
        </a>
      </div>
    </div>
  );
}

export default ProductCard;