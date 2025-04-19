import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Constants from "../../../Constants";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const [cookies] = useCookies(["token"]);
    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [reviews] = useState([
        { id: 1, user: "Nguyễn Văn A", comment: "Sản phẩm rất tốt!", rating: 5 },
        { id: 2, user: "Trần Thị B", comment: "Giao hàng nhanh.", rating: 4 },
        { id: 3, user: "Lê Văn C", comment: "Chất lượng tốt.", rating: 5 },
    ]);

    useEffect(() => {
        axios.get(`${Constants.DOMAIN_API}/product/${id}`)
            .then(function (res) {
                setProduct(res.data.data);
            })
            .catch(function (err) {
                console.error("❌ Lỗi tải sản phẩm:", err);
            });

        axios.get(`${Constants.DOMAIN_API}/variant/${id}`)
            .then(function (res) {
                const list = Array.isArray(res.data.data) ? res.data.data : [];
                setVariants(list);

                const allSizes = [...new Set(list.map(function (v) { return v.size?.size_label; }))];
                const allColors = [...new Map(list.map(function (v) {
                    return [v.color?.color_code, {
                        code: v.color?.color_code,
                        name: v.color?.color_name
                    }];
                })).values()];

                setSizes(allSizes);
                setColors(allColors);
            })
            .catch(function (err) { console.error("❌ Lỗi tải biến thể:", err); });
    }, [id]);

    useEffect(() => {
        const matched = variants.find(function (v) {
            return v.size?.size_label === selectedSize && v.color?.color_code === selectedColor;
        });
        setSelectedVariant(matched || null);
    }, [selectedSize, selectedColor, variants]);

    const handleAddToCart = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            alert("Bạn cần đăng nhập trước khi thêm vào giỏ hàng.");
            return;
        }

        const user = JSON.parse(storedUser);
        if (!user?.id) {
            alert("Không thể xác định người dùng.");
            return;
        }

        try {
            await axios.post(`${Constants.DOMAIN_API}/cart/add`, {
                variant_id: selectedVariant.id,
                quantity: quantity
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.token}`
                }
            });

            alert("✅ Đã thêm vào giỏ hàng!");
        } catch (err) {
            console.error("❌ Lỗi khi thêm vào giỏ hàng:", err);
            alert(err.response?.data?.message || "Không thể thêm vào giỏ hàng.");
        }
    };

    if (!product) return <p>Đang tải sản phẩm...</p>;

    const price = parseFloat(product.price) || 0;
    const salePrice = parseFloat(product.sale_price);
    const showSale = !isNaN(salePrice) && salePrice > 0 && salePrice < price;
    const noVariants = variants.length === 0;

    const availableSizes = [...new Set(
        variants
            .filter(function (v) { return !selectedColor || v.color?.color_code === selectedColor; })
            .map(function (v) { return v.size?.size_label; })
    )];

    const availableColors = [...new Map(
        variants
            .filter(function (v) { return !selectedSize || v.size?.size_label === selectedSize; })
            .map(function (v) {
                return [v.color?.color_code, {
                    code: v.color?.color_code,
                    name: v.color?.color_name
                }];
            })
    ).values()];

    return (
        <main className="product-detail-container">
            <div className="product-detail-info">
                <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-detail-details">
                    <h2 className="product-detail-name">{product.name}</h2>
                    <p className="product-detail-price">
                        {showSale ? (
                            <>
                                Giá gốc: <span className="product-detail-original-price">{price.toLocaleString()}đ</span>
                                <span className="product-detail-sale-text"> Giảm còn </span>
                                <span className="product-detail-discounted-price">{salePrice.toLocaleString()}đ</span>
                            </>
                        ) : (
                            <span className="product-detail-discounted-price">Giá: {price.toLocaleString()}đ</span>
                        )}
                    </p>
                    <p className="product-detail-description">{product.description}</p>

                    {!noVariants ? (
                        <>
                            <div className="product-detail-options-row">
                                <div className="product-detail-select">
                                    <label>Chọn kích thước:</label>
                                    <select
                                        className="form-control"
                                        value={selectedSize}
                                        onChange={function (e) { setSelectedSize(e.target.value); }}
                                    >
                                        <option value="">-- Chọn kích thước --</option>
                                        {availableSizes.map(function (size) {
                                            return <option key={size} value={size}>{size}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className="product-detail-select">
                                    <label>Chọn màu sắc:</label>
                                    <select
                                        className="form-control"
                                        value={selectedColor}
                                        onChange={function (e) { setSelectedColor(e.target.value); }}
                                    >
                                        <option value="">-- Chọn màu sắc --</option>
                                        {availableColors.map(function (color) {
                                            return (
                                                <option
                                                    key={color.code}
                                                    value={color.code}
                                                    style={{ backgroundColor: color.code }}
                                                >
                                                    {color.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <label>Số lượng:</label>
                            <div className="product-detail-quantity-selector">
                                <button onClick={function () { setQuantity(quantity > 1 ? quantity - 1 : 1); }}>-</button>
                                <input className="form-control" type="number" value={quantity} readOnly />
                                <button onClick={function () { setQuantity(quantity + 1); }}>+</button>
                            </div>

                            <div className="product-detail-action-buttons">
                                <button className="product-detail-btn-add-to-cart" onClick={handleAddToCart}>
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="product-detail-btn-buy-now">Mua ngay</button>
                            </div>

                            {selectedVariant && (
                                <p className="product-detail-stock-info">
                                    Còn lại: {selectedVariant.stock} sản phẩm
                                </p>
                            )}
                        </>
                    ) : (
                        <div className="product-detail-no-variant">
                            <p className="text-danger fw-bold">Sản phẩm này chưa mở bán.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;