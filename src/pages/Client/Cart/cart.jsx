import React, { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Constants from "../../../Constants";
import { useCookies } from "react-cookie";

function Cart() {
    const [cookies] = useCookies(["token"]);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(function () {
        async function fetchCart() {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user?.id) return;

                const res = await axios.get(`${Constants.DOAMIN_API}/cart/user/${user.id}`, {
                    headers: { Authorization: `Bearer ${cookies.token}` }
                });

                const items = res.data.data.map(function (item) {
                    const salePrice = Number(item.sale_price); // ép kiểu về số
                    const originalPrice = Number(item.price);
                    const finalPrice = salePrice > 0 ? salePrice : originalPrice;

                    return {
                        id: item.id,
                        name: item.name,
                        price: finalPrice,
                        original_price: originalPrice,
                        sale_price: salePrice,
                        quantity: item.quantity,
                        image: item.image,
                        color: item.color,
                        size: item.size,
                        color_code: item.color_code,
                        variant_id: item.variant_id,
                        productId: item.productId
                    };
                });

                setCartItems(items);
            } catch (err) {
                console.error("❌ Lỗi lấy giỏ hàng:", err);
            }
        }
        fetchCart();
    }, []);

    function updateCartItem(itemId, updatedData) {
        setCartItems(cartItems.map(function (item) {
            return item.id === itemId ? { ...item, ...updatedData } : item;
        }));
    }

    function handleRemove(itemId) {
        setCartItems(cartItems.filter(function (item) {
            return item.id !== itemId;
        }));
        setSelectedItems(selectedItems.filter(function (id) {
            return id !== itemId;
        }));
    }

    function calculateTotal() {
        return cartItems
            .filter(function (item) {
                return selectedItems.includes(item.id);
            })
            .reduce(function (total, item) {
                return total + item.price * item.quantity;
            }, 0);
    }

    function handleSelectItem(itemId) {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(function (id) {
                return id !== itemId;
            }));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    }

    function handleSelectAll() {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartItems.map(function (item) {
                return item.id;
            }));
        }
    }

    return (
        <main className="container">
            <div className="cart-container">
                <div className="cart-main">
                    <h2 className="cart-title">Giỏ hàng của bạn</h2>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === cartItems.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Hình ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Màu</th>
                                <th>Size</th>
                                <th>Số lượng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(function (item) {
                                return (
                                    <tr key={item.id} className="cart-item">
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={function () { handleSelectItem(item.id); }}
                                            />
                                        </td>
                                        <td>
                                            <img src={item.image} alt="" className="cart-item-image" />
                                        </td>
                                        <td className="cart-item-name">{item.name}</td>
                                        <td className="cart-item-price">
                                            {item.sale_price > 0 ? (
                                                <span className="text-danger fw-bold">
                                                    {item.sale_price.toLocaleString("vi-VN", { maximumFractionDigits: 0 })}đ
                                                </span>
                                            ) : (
                                                <span className="fw-bold">
                                                    {item.original_price.toLocaleString("vi-VN", { maximumFractionDigits: 0 })}đ
                                                </span>
                                            )}
                                        </td>
                                        <td>{item.color || "N/A"}</td>
                                        <td>{item.size || "N/A"}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={function (e) {
                                                    updateCartItem(item.id, { quantity: Math.max(1, parseInt(e.target.value)) });
                                                }}
                                                min="1"
                                                className="cart-item-quantity-input"
                                            />
                                        </td>
                                        <td>
                                            <button onClick={function () { handleRemove(item.id); }} className="cart-item-remove-button">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="cart-sidebar">
                    <h2>Tóm tắt đơn hàng</h2>
                    <p>Tổng ({selectedItems.length} mục): {calculateTotal().toLocaleString("vi-VN", { maximumFractionDigits: 0 })} đ</p>
                    <div className="discount-section">
                        <input type="text" placeholder="Nhập mã giảm giá" className="discount-input" />
                        <button className="apply-discount-button">Áp dụng</button>
                    </div>
                    <button className="cart-checkout-button" disabled={!selectedItems.length} >
                        <Link to="/payment" className="text-decoration-none text-white">Thanh toán</Link>
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Cart;