import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import './App.css';

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Thiệp Sinh Nhật Bé Kem', image: '/bekem.jpg', tag: 'Chibi Bé Gái', price: '5.000đ' },
  { id: 2, name: 'Thiệp Sinh Nhật Duy Khánh', image: '/duykhan.jpg', tag: 'Chibi Bé Trai', price: '5.000đ' },
  { id: 3, name: 'Thiệp Sinh Nhật Gia Hân', image: '/giahan.jpg', tag: 'Chibi Bông Hồng', price: '5.000đ' },
  { id: 4, name: 'Bao Thư Liền Khối Cao Cấp', image: '/background.jpg', tag: 'Hot Trend', price: '5.000đ' },
  { id: 5, name: 'Mẫu Thiệp Mời Xinh', image: '/anh.png', tag: 'Mẫu Mới', price: '5.000đ' },
  { id: 6, name: 'Mẫu Thiệp Mời Thiết Kế', image: '/anh1.png', tag: 'Yêu Thích', price: '5.000đ' },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Khởi tạo state từ localStorage nếu có, nếu chưa có thì lấy mặc định
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('my_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  // Mỗi khi products thay đổi, lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem('my_products', JSON.stringify(products));
  }, [products]);

  return (
    <Router>
      <div className="app-container">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {activeTab === 'home' && (
                  <main className="page-content fade-in">
                    <Hero onExplore={() => setActiveTab('products')} />
                    <Features />
                  </main>
                )}

                {activeTab === 'products' && (
                  <main className="page-content fade-in">
                    <section className="products-section">
                      <div className="products-header">
                        <h2 className="section-title">Bộ Sưu Tập Thiệp Chibi</h2>
                        <p>Những mẫu thiệp sinh nhật mới nhất và được yêu thích nhất</p>
                      </div>

                      <div className="products-grid">
                        {products.map((item) => (
                          <ProductCard key={item.id} product={item} />
                        ))}
                      </div>
                    </section>
                  </main>
                )}
              </>
            }
          />

          <Route
            path="/admin"
            element={<Admin products={products} setProducts={setProducts} />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;