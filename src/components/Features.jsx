import React from 'react';
import './Features.css';

function Features() {
  const featureList = [
    {
      icon: '✨',
      title: 'Thiết Kế Liền Khối',
      desc: 'Bao thư và ruột hòa làm một, rút thiệp mượt mà và độc đáo.'
    },
    {
      icon: '🎨',
      title: 'Vẽ Chibi Theo Yêu Cầu',
      desc: 'Họa nét Chibi dễ thương theo đúng gương mặt và thần thái của bé.'
    },
    {
      icon: '💌',
      title: 'Chất Liệu In Cao Cấp',
      desc: 'Giấy in dày dặn, màu sắc tươi sáng, chuẩn nét từng chi tiết.'
    }
  ];

  return (
    <section className="features-section">
      <h2 className="section-title">Tại Sao Các Mẹ Yêu Thích?</h2>
      <div className="features-grid">
        {featureList.map((item, index) => (
          <div key={index} className="feature-card">
            <span className="feature-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;