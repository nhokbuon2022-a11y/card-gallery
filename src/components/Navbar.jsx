import React from 'react';
import './Navbar.css';

function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <img src="/logo.jpg" alt="Logo" className="nav-logo" />
        <span className="brand-title">Thiệp Xinh Chibi</span>
      </div>
      <nav className="nav-menu">
        <button 
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Trang Chủ
        </button>
        <button 
          className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Sản Phẩm
        </button>
      </nav>
      <a href="https://zalo.me" target="_blank" rel="noreferrer" className="btn-primary">
        Liên Hệ Zalo
      </a>
    </header>
  );
}

export default Navbar;