import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy danh sách sản phẩm từ Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) setProducts(data);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error.message);
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
                            <ProductCard key={item.id} product={item} />
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;