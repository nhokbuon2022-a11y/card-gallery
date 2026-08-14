import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Admin.css';

export default function Admin({ products, refreshProducts }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    image: '',
    tag: '',
    price: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProcessFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    } else {
      alert('Vui lòng chọn file hình ảnh!');
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) handleProcessFile(e.dataTransfer.files[0]);
  };

const uploadImage = async (file) => {
  try {
    // Kiểm tra file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Chỉ chấp nhận file hình ảnh');
    }

    // Convert file to base64 để lưu trực tiếp vào database
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  } catch (error) {
    console.error('Lỗi xử lý ảnh:', error);
    throw error;
  }
};

  // Lưu hoặc Cập nhật Sản phẩm
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Vui lòng điền tên và giá sản phẩm!');
      return;
    }

    try {
      setUploading(true);
      let imageUrl = formData.image;

      // Nếu có chọn file ảnh mới từ máy, tiến hành upload lên Supabase Storage
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      } else if (imageUrl && !imageUrl.startsWith('data:') && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
        // Nếu là tên file từ /public, thêm / vào đầu
        imageUrl = '/' + imageUrl;
      }

      if (isEditing) {
        // Cập nhật database
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            price: formData.price,
            tag: formData.tag,
            image: imageUrl
          })
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        // Thêm mới vào database
        const { error } = await supabase.from('products').insert([
          {
            name: formData.name,
            price: formData.price,
            tag: formData.tag,
            image: imageUrl || '/anh.png'
          }
        ]);

        if (error) throw error;
      }

      alert(isEditing ? 'Cập nhật thành công!' : 'Thêm sản phẩm thành công!');
      handleCancelEdit();
      refreshProducts(); // Tải lại danh sách mới nhất
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditProduct = (product) => {
    setFormData(product);
    setSelectedFile(null);
    setIsEditing(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        refreshProducts();
      } catch (error) {
        alert('Không thể xóa: ' + error.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setFormData({ id: null, name: '', image: '', tag: '', price: '' });
  };

  return (
    <main className="page-content fade-in">
      <section className="admin-container">
        <h2 className="admin-title">Trang Quản Lý Sản Phẩm (Admin - Supabase)</h2>

        {/* Form Thêm/Sửa */}
        <form onSubmit={handleSaveProduct} className="admin-form">
          <h3>{isEditing ? '✏️ Sửa Sản Phẩm' : '➕ Thêm Sản Phẩm Mới'}</h3>

          {/* VÙNG KÉO THẢ ẢNH */}
          <div
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <p>📁 Kéo & thả ảnh vào đây hoặc <span>bấm để chọn từ máy tính</span></p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleProcessFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Giá</label>
              <input
                type="text"
                name="price"
                placeholder="VD: 5.000đ"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Nhãn (Tag)</label>
              <input
                type="text"
                name="tag"
                placeholder="VD: Hot Trend, Chibi Bé Gái"
                value={formData.tag}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Đường dẫn ảnh (hoặc URL)</label>
              <input
                type="text"
                name="image"
                placeholder="URL ảnh (nếu không chọn file)"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {formData.image && (
            <div className="image-preview-container" style={{ marginTop: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#666' }}>Ảnh xem trước:</span>
              <img src={formData.image} alt="Preview" className="preview-img" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
            </div>
          )}

          <div className="form-actions" style={{ marginTop: '16px' }}>
            <button type="submit" className="btn-save" disabled={uploading}>
              {uploading ? 'Đang lưu...' : isEditing ? 'Lưu Cập Nhật' : 'Thêm Sản Phẩm'}
            </button>
            {isEditing && (
              <button type="button" onClick={handleCancelEdit} className="btn-cancel">
                Hủy
              </button>
            )}
          </div>
        </form>

        {/* Bảng Danh Sách */}
        <div className="admin-list">
          <h3>📋 Danh Sách Hiện Tại ({products.length})</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Tag</th>
                  <th>Giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.name} className="product-img" />
                    </td>
                    <td className="product-name">{item.name}</td>
                    <td>
                      <span className="badge-tag">{item.tag}</span>
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEditProduct(item)} className="btn-edit">
                          Sửa
                        </button>
                        <button onClick={() => handleDeleteProduct(item.id)} className="btn-delete">
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}