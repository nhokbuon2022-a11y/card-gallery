import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onImageClick }) {
  // Xử lý URL ảnh với BASE_URL
  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('data:') || image.startsWith('http')) {
      return image; // Base64 hoặc URL đầy đủ
    }
    // Đường dẫn tương đối từ /public
    const baseUrl = import.meta.env.BASE_URL;
    return image.startsWith('/') ? baseUrl + image.slice(1) : baseUrl + image;
  };

  return (
    <div className="product-card">
      <div className="card-image-box" onClick={() => onImageClick(product)} style={{ cursor: 'pointer' }}>
        <img src={getImageUrl(product.image)} alt={product.name} />
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