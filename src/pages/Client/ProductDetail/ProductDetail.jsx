import React, { useState } from "react";
import "./ProductDetail.css";

const ProductDetail = () => {
    const [reviews] = useState([
        { id: 1, user: "Nguyễn Văn A", comment: "Sản phẩm rất tốt, chất lượng như mong đợi!", rating: 5 },
        { id: 2, user: "Trần Thị B", comment: "Giao hàng nhanh, đóng gói cẩn thận.", rating: 4 },
        { id: 3, user: "Lê Văn C", comment: "Màu sắc đẹp, chất liệu thoải mái.", rating: 5 }
    ]);

    return (
        <main className="container">
            {/* Thông tin sản phẩm */}
            <div className="product-info">
                <div className="product-image">
                    <img src={require('../../../assets/img/giaysneaker.webp')} alt="Sản phẩm" />
                </div>
                <div className="product-details">
                    <h2>Tên Sản Phẩm</h2>
                    <p className="price">Giá gốc: <span className="original-price">700.000₫</span> - Giá khuyến mãi: 500.000₫</p>
                    <p className="description">Mô tả ngắn về sản phẩm.</p>
                    <div className="options">
                        <label>Kích thước:</label>
                        <select>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                        </select>
                        <label>Màu sắc:</label>
                        <div className="color-options">
                            <span className="color-box" style={{ backgroundColor: "red" }}></span>
                            <span className="color-box" style={{ backgroundColor: "blue" }}></span>
                            <span className="color-box" style={{ backgroundColor: "green" }}></span>
                        </div>
                        <label>Số lượng:</label>
                        <input type="number" min="1" defaultValue="1" className="quantity-selector" />
                    </div>
                    <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
                    <button className="btn-buy-now">Mua ngay</button>
                </div>
            </div>
            
            {/* Mô tả chi tiết sản phẩm */}
            <div className="product-description">
                <h4>Chi Tiết Sản Phẩm</h4>
                <p>Chất liệu: Cotton 100%</p>
                <p>Xuất xứ: Việt Nam</p>
                <p>Hướng dẫn bảo quản: Giặt tay hoặc giặt máy nhiệt độ thấp, không dùng chất tẩy mạnh.</p>
            </div>
            
            {/* Đánh giá sản phẩm */}
            <div className="product-reviews">
                <h4>Đánh Giá & Nhận Xét</h4>
                <p>⭐ 4.5 / 5 (Dựa trên 150 đánh giá)</p>
                <ul className="review-list">
                    {reviews.map(review => (
                        <li key={review.id} className="review-item">
                            <strong>{review.user}</strong> ({'⭐'.repeat(review.rating)})<br />
                            {review.comment}
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Sản phẩm liên quan */}
            <div className="related-products">
                <h4>Sản Phẩm Liên Quan</h4>
                <div className="related-list">
                    <div className="related-item">
                        <img src="related1.jpg" alt="Sản phẩm liên quan 1" />
                        <p>Sản phẩm 1 - 450.000₫</p>
                    </div>
                    <div className="related-item">
                        <img src="related2.jpg" alt="Sản phẩm liên quan 2" />
                        <p>Sản phẩm 2 - 550.000₫</p>
                    </div>
                    <div className="related-item">
                        <img src="related3.jpg" alt="Sản phẩm liên quan 3" />
                        <p>Sản phẩm 3 - 600.000₫</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
