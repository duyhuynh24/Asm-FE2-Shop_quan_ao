import React, { useState } from "react";
import "./ProductDetail.css";

const ProductDetail = () => {
    const [reviews] = useState([
        { id: 1, user: "Nguyễn Văn A", comment: "Sản phẩm rất tốt, chất lượng như mong đợi!", rating: 5 },
        { id: 2, user: "Trần Thị B", comment: "Giao hàng nhanh, đóng gói cẩn thận.", rating: 4 },
        { id: 3, user: "Lê Văn C", comment: "Màu sắc đẹp, chất liệu thoải mái.", rating: 5 }
    ]);
    const [quantity, setQuantity] = useState(1);

    return (
        <main className="container">
            {/* Thông tin sản phẩm */}
            <div className="product-info">
                <div className="product-image">
                    <img src={require('../../../assets/img/giaysneaker.webp')} alt="Sản phẩm" />
                </div>
                <div className="product-details">
                    <h2 className="product-name">Tên Sản Phẩm</h2>
                    <p className="price">
                        Giá gốc: <span className="original-price">700.000</span>
                        <span className="sale-text">Giảm còn</span>
                        <span className="discounted-price">500.000</span>
                    </p>
                    <p className="description">Mô tả ngắn về sản phẩm.</p>
                    <div className="options">
                        <label>Kích thước:</label>
                        <div className="size-options">
                            {['S', 'M', 'L'].map(size => (
                                <label key={size} className="size-label">
                                    <input type="radio" name="size" value={size} /> {size}
                                </label>
                            ))}
                        </div>
                        <label>Màu sắc:</label>
                        <div className="color-options">
                            <span className="color-box" style={{ backgroundColor: "red" }}></span>
                            <span className="color-box" style={{ backgroundColor: "blue" }}></span>
                            <span className="color-box" style={{ backgroundColor: "green" }}></span>
                        </div>
                        <label>Số lượng:</label>
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                            <input className="form-contol" type="number" min="1" value={quantity} readOnly />
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
                        <button className="btn-buy-now">Mua ngay</button>
                    </div>
                </div>
            </div>

            {/* Chi tiết sản phẩm & Đánh giá */}
            <div className="product-extra">
                <div className="product-description">
                    <h4>Chi Tiết Sản Phẩm</h4>
                    <p>Chất liệu: Cotton 100%</p>
                    <p>Xuất xứ: Việt Nam</p>
                    <p>Hướng dẫn bảo quản: Giặt tay hoặc giặt máy nhiệt độ thấp, không dùng chất tẩy mạnh.</p>
                </div>
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
            </div>
        </main>
    );
};

export default ProductDetail;
