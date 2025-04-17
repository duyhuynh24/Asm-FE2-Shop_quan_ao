import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./product.css";
import HeaderAdmin from "../layout/header";
import constant from '../../../../Constants';

const Product = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get(`${constant.DOMAIN_API}/product/list`)
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.error("Lỗi khi lấy sản phẩm:", err);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!confirmDelete) return;

        try {
            const token = Cookies.get(constant.COOKIE_TOKEN);
            await axios.delete(`${constant.DOMAIN_API}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Xóa sản phẩm thành công");
            fetchProducts(); // cập nhật lại danh sách
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Xóa sản phẩm thất bại");
        }
    };

    return (
        <div className="main-container">
            <HeaderAdmin />
            <div className="product-container">
                <div className="product-box">
                    <h2 className="product-title">Danh Sách Sản Phẩm</h2>
                    <div className="product-actions">
                        <Link to="/admin/AddProduct" className="btn-add">Thêm Sản Phẩm</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Danh mục</th>
                                    <th>Giá</th>
                                    <th>Mô tả</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category?.name || "Không có"}</td> {/* 👈 Hiển thị tên danh mục */}
                                        <td>{Number(product.price).toLocaleString()}đ</td>
                                        <td>{product.description}</td>
                                        <td className="product-action-buttons">
                                            <Link to={`/admin/EditProduct/${product.id}`} className="btn-edit-product">Sửa</Link>
                                            <button
                                                className="btn-delete-product"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>Không có sản phẩm nào</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
