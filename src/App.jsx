import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Dữ liệu mẫu mặc định
  const FALLBACK_PRODUCTS = [
    {
      id: 1,
      name: 'Thiệp QTTN - bé trai ( Ngựa bấm mắc cáo )',
      price: '4.900₫',
      tag: 'Hot',
      image: '/anh.png'
    },
    {
      id: 2,
      name: 'Thiệp QTTN - Nơ mắc cáo',
      price: '4.900₫',
      tag: 'Hot',
      image: '/anh1.png'
    },
    {
      id: 3,
      name: 'Thiệp TGR -',
      price: '2.800₫',
      tag: 'Best Seller',
      image: '/giahan.jpg'
    }
  ];

  // Hàm lấy danh sách sản phẩm từ Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setProducts(data);
      } else {
        // Nếu database trống, dùng fallback data
        setProducts(FALLBACK_PRODUCTS);
      }
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error.message);
      // Nếu lỗi, dùng fallback data
      setProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

                      {loading ? (
                        <p style={{ textAlign: 'center' }}>Đang tải sản phẩm...</p>
                      ) : (
                        <div className="products-grid">
                          {products.map((item) => (
                            <ProductCard 
                              key={item.id} 
                              product={item}
                              onImageClick={setSelectedProduct}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  </main>
                )}
              </>
            }
          />

          <Route
            path="/admin"
            element={<Admin products={products} refreshProducts={fetchProducts} />}
          />
        </Routes>

        {selectedProduct && (
          <ProductModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}

        <Footer />
      </div>
    </Router>
  );
}

export default App;