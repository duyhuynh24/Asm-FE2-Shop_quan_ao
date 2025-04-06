import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./edit-product.css";
import HeaderAdmin from "../../layout/header";

const EditProduct = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();

    // Khởi tạo dữ liệu mẫu
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        
        // Xoá lỗi khi người dùng sửa dữ liệu
        if (e.target.name === "name" || e.target.name === "price" || e.target.name === "description") {
            clearErrors(e.target.name);  // Xoá lỗi cho trường đang sửa
        }
    };

    const onSubmit = (data) => {
        console.log("Sản phẩm chỉnh sửa:", data);
        // Thực hiện gửi dữ liệu lên backend tại đây
    };

    return (
        <>
            <HeaderAdmin />
            <div className="edit-product-wrapper">
                <div className="edit-product-card">
                    <h2 className="edit-product-title">Chỉnh Sửa Sản Phẩm</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="edit-product-form">
                        {/* Tên sản phẩm */}
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
                            value={product.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}

                        {/* Giá */}
                        <label htmlFor="price">Giá</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            {...register("price", {
                                required: "Giá là bắt buộc",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Giá phải là số hợp lệ"
                                }
                            })}
                            value={product.price}
                            onChange={handleChange}
                        />
                        {errors.price && <p className="error">{errors.price.message}</p>}

                        {/* Mô tả */}
                        <label htmlFor="description">Mô Tả</label>
                        <textarea
                            id="description"
                            name="description"
                            {...register("description", { required: "Mô tả là bắt buộc" })}
                            value={product.description}
                            onChange={handleChange}
                        />
                        {errors.description && <p className="error">{errors.description.message}</p>}

                        <div className="edit-product-actions">
                            <button type="submit" className="btn-save-product">Lưu</button>
                            <Link to="/admin" className="btn-cancel-product">Hủy</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
