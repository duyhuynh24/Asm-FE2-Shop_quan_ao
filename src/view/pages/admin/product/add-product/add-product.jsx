import { useState } from "react";
import { Link } from "react-router-dom";
import "./add-product.css";
import HeaderAdmin from "../../layout/header";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product added:", product);
        // Thực hiện gửi dữ liệu lên backend tại đây
    };

    return (
        <div className="add-product-container">
            <HeaderAdmin />
            <div className="add-product-box">
                <h2 className="add-product-title">Thêm Sản Phẩm</h2>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <label>Tên sản phẩm</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                    
                    <label>Giá</label>
                    <input type="text" name="price" value={product.price} onChange={handleChange} required />
                    
                    <label>Mô tả</label>
                    <textarea name="description" value={product.description} onChange={handleChange} required />
                    
                    <div className="add-product-actions">
                        <button type="submit" className="btn-add-product">Thêm</button>
                        <Link to="/admin" className="btn-cancel-product">Hủy</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
