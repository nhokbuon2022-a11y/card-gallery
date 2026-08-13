import React, { useState } from 'react';

export default function Admin({ products, setProducts }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    image: '',
    tag: '',
    price: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Vui lòng điền tên và giá sản phẩm!');
      return;
    }

    if (isEditing) {
      setProducts(products.map(p => p.id === formData.id ? formData : p));
      setIsEditing(false);
    } else {
      const newProduct = {
        ...formData,
        id: Date.now(),
        image: formData.image || '/anh.png'
      };
      setProducts([...products, newProduct]);
    }

    setFormData({ id: null, name: '', image: '', tag: '', price: '' });
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ id: null, name: '', image: '', tag: '', price: '' });
  };

  return (
    <main className="page-content fade-in">
      <section className="admin-section" style={{ maxWidth: '900px', margin: '30px auto', padding: '20px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '20px', color: '#ff5277' }}>
          Trang Quản Lý Sản Phẩm (Admin)
        </h2>

        {/* Form Thêm/Sửa */}
        <form onSubmit={handleSaveProduct} style={{ background: '#fff5f7', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #ffe1e8' }}>
          <h3>{isEditing ? '✏️ Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <input
              type="text"
              name="name"
              placeholder="Tên sản phẩm"
              value={formData.name}
              onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="price"
              placeholder="Giá (VD: 5.000đ)"
              value={formData.price}
              onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="tag"
              placeholder="Nhãn (VD: Hot Trend, Chibi Bé Gái)"
              value={formData.tag}
              onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
            <input
              type="text"
              name="image"
              placeholder="Đường dẫn ảnh (VD: /bekem.jpg)"
              value={formData.image}
              onChange={handleInputChange}
              style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ background: '#ff5277', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {isEditing ? 'Lưu Cập Nhật' : 'Thêm Sản Phẩm'}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancelEdit} style={{ background: '#888', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
                Hủy
              </button>
            )}
          </div>
        </form>

        {/* Bảng Danh Sách */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3>📋 Danh Sách Hiện Tại ({products.length})</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
            <thead>
              <tr style={{ background: '#fff0f3', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Ảnh</th>
                <th style={{ padding: '10px' }}>Tên</th>
                <th style={{ padding: '10px' }}>Tag</th>
                <th style={{ padding: '10px' }}>Giá</th>
                <th style={{ padding: '10px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  </td>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.name}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ background: '#ffe8ee', color: '#ff5277', padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
                      {item.tag}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>{item.price}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => handleEditProduct(item)} style={{ background: '#ffc107', border: 'none', padding: '6px 12px', borderRadius: '6px', marginRight: '6px', cursor: 'pointer' }}>
                      Sửa
                    </button>
                    <button onClick={() => handleDeleteProduct(item.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}