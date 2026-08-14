import React from 'react';
import './Hero.css';

function Hero({ onExplore }) {
  return (
    <section className="hero-banner">
      <div className="hero-text">
        <span className="badge">⭐ Thiệp Mời Thiết Kế Chibi ⭐</span>
        <h1>Gửi Yêu Thương Qua Từng Tấm Thiệp Xinh</h1>
        <p>
          Thiết kế liền khối độc đáo – Bao thư và ruột mời hòa làm một. 
          Giúp buổi tiệc của bé thêm phần ngộ nghĩnh và đáng nhớ!
        </p>
        <div className="hero-actions">
          <button className="btn-main" onClick={onExplore}>
            Khám Phá Mẫu Thiệp 🎀
          </button>
        </div>
      </div>
      <div className="hero-image-wrapper">
        <img src={`${import.meta.env.BASE_URL}background.jpg`} alt="Thiệp Mời Chibi" className="hero-img" />
      </div>
    </section>
  );
}

export default Hero;