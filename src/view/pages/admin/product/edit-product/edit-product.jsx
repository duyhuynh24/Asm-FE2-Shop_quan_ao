import { useState } from "react";
import { Link } from "react-router-dom";
import "./edit-product.css";
import HeaderAdmin from "../../layout/header";

const EditProduct = () => {
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
        console.log("Product edited:", product);
        // Thực hiện gửi dữ liệu lên backend tại đây
    };

    return (
        <div className="edit-product-wrapper">
            <HeaderAdmin />
            <div className="edit-product-card">
                <h2 className="edit-product-title">Chỉnh Sửa Sản Phẩm</h2>
                <form onSubmit={handleSubmit} className="edit-product-form">
                    <label htmlFor="name">Tên sản phẩm</label>
                    <input 
                        type="text" 
                        id="name"
                        name="name" 
                        value={product.name} 
                        onChange={handleChange} 
                        required 
                    />
                    
                    <label htmlFor="price">Giá</label>
                    <input 
                        type="text" 
                        id="price"
                        name="price" 
                        value={product.price} 
                        onChange={handleChange} 
                        required 
                    />
                    
                    <label htmlFor="description">Mô tả</label>
                    <textarea 
                        id="description"
                        name="description" 
                        value={product.description} 
                        onChange={handleChange} 
                        required 
                    />
                    
                    <div className="edit-product-actions">
                        <button type="submit" className="btn-save-product">Lưu</button>
                        <Link to="/admin" className="btn-cancel-product">Hủy</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
