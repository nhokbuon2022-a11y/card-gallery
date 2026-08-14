import React from 'react';
import './ProductModal.css';

function ProductModal({ product, onClose }) {
  if (!product) return null;

  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('data:') || image.startsWith('http')) {
      return image;
    }
    const baseUrl = import.meta.env.BASE_URL;
    return image.startsWith('/') ? baseUrl + image.slice(1) : baseUrl + image;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img src={getImageUrl(product.image)} alt={product.name} />
          </div>
          
          <div className="modal-info">
            <h2>{product.name}</h2>
            {product.tag && <span className="modal-tag">{product.tag}</span>}
            <p className="modal-price">Giá: <strong>{product.price}</strong></p>
            
            <a 
              href="https://zalo.me" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-modal"
            >
              📱 Liên Hệ Zalo Để Đặt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
