import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [reviews] = useState([
        { id: 1, user: "Nguyễn Văn A", comment: "Sản phẩm rất tốt, chất lượng như mong đợi!", rating: 5 },
        { id: 2, user: "Trần Thị B", comment: "Giao hàng nhanh, đóng gói cẩn thận.", rating: 4 },
        { id: 3, user: "Lê Văn C", comment: "Màu sắc đẹp, chất liệu thoải mái.", rating: 5 }
    ]);

    // Lấy chi tiết sản phẩm & biến thể
    useEffect(() => {
        fetch(`http://localhost:3001/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data.data))
            .catch(err => console.error("❌ Lỗi tải sản phẩm:", err));

        fetch(`http://localhost:3001/variant/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("[DEBUG] Dữ liệu biến thể:", data);
                const list = Array.isArray(data.data) ? data.data : [];
                setVariants(list);

                const uniqueSizes = [...new Set(list.map(v => v.size?.size_label))];
                const uniqueColors = [...new Set(list.map(v => v.color?.color_code))];
                setSizes(uniqueSizes);
                setColors(uniqueColors);
            })

            .catch(err => console.error("❌ Lỗi tải biến thể:", err));
    }, [id]);

    // Xác định biến thể được chọn
    useEffect(() => {
        const variant = variants.find(v =>
            v.size?.size_label === selectedSize && v.color?.color_code === selectedColor
        );
        setSelectedVariant(variant || null);
    }, [selectedSize, selectedColor, variants]);

    // Gửi vào giỏ hàng
    function handleAddToCart() {
        if (!selectedVariant) {
            alert("❗ Vui lòng chọn kích thước và màu sắc!");
            return;
        }

        const cartItem = {
            variant_id: selectedVariant.id,
            quantity: quantity
        };

        fetch("http://localhost:3001/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItem)
        })
            .then(res => res.json())
            .then(data => {
                alert("✅ Đã thêm vào giỏ hàng!");
            })
            .catch(err => {
                console.error("❌ Lỗi thêm giỏ hàng:", err);
                alert("Không thể thêm vào giỏ hàng.");
            });
    }

    if (!product) return <p>Đang tải thông tin sản phẩm...</p>;

    return (
        <main className="product-detail-container">
            <div className="product-detail-info">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-detail-details">
                    <h2 className="product-detail-name">{product.name}</h2>
                    <p className="product-detail-price">
                        Giá gốc: <span className="product-detail-original-price">{parseInt(product.price).toLocaleString()}đ</span>
                        <span className="product-detail-sale-text">Giảm còn</span>
                        <span className="product-detail-discounted-price">{parseInt(product.sale_price).toLocaleString()}đ</span>
                    </p>
                    <p className="product-detail-description">{product.description}</p>

                    <div className="product-detail-options">
                        <label>Kích thước:</label>
                        <div className="product-detail-size-options">
                            {sizes.map(function (size) {
                                return (
                                    <label key={size} className="product-detail-size-label">
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size}
                                            checked={selectedSize === size}
                                            onChange={() => setSelectedSize(size)}
                                        /> {size}
                                    </label>
                                );
                            })}
                        </div>

                        <label>Màu sắc:</label>
                        <div className="product-detail-color-options">
                            {colors.map(function (color, index) {
                                return (
                                    <span
                                        key={index}
                                        className={`product-detail-color-box ${selectedColor === color ? "selected" : ""}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    ></span>
                                );
                            })}
                        </div>

                        <label>Số lượng:</label>
                        <div className="product-detail-quantity-selector">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                            <input className="form-control" type="number" value={quantity} readOnly />
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    <div className="product-detail-action-buttons">
                        <button className="product-detail-btn-add-to-cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                        <button className="product-detail-btn-buy-now">Mua ngay</button>
                    </div>

                    {selectedVariant && (
                        <p className="product-detail-stock-info">Còn lại: {selectedVariant.stock} sản phẩm</p>
                    )}
                </div>
            </div>

            <div className="product-detail-extra">
                <div className="product-detail-description-block">
                    <h4>Chi Tiết Sản Phẩm</h4>
                    <p>Chất liệu: Cotton 100%</p>
                    <p>Xuất xứ: Việt Nam</p>
                    <p>Hướng dẫn bảo quản: Giặt tay hoặc giặt máy nhiệt độ thấp, không dùng chất tẩy mạnh.</p>
                </div>
                <div className="product-detail-reviews">
                    <h4>Đánh Giá & Nhận Xét</h4>
                    <p>⭐ 4.5 / 5 (Dựa trên {reviews.length} đánh giá)</p>
                    <ul className="product-detail-review-list">
                        {reviews.map(function (review) {
                            return (
                                <li key={review.id} className="product-detail-review-item">
                                    <strong>{review.user}</strong> ({'⭐'.repeat(review.rating)})<br />
                                    {review.comment}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </main>

    );
};

export default ProductDetail;
