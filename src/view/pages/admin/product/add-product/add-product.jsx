import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./add-product.css";
import HeaderAdmin from "../../layout/header";

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Product added:", data);
        // Thực hiện gửi dữ liệu lên backend tại đây
    };

    return (
        <>
            <HeaderAdmin />
            <div className="add-product-container">
                <div className="add-product-box">
                    <h2 className="add-product-title">Thêm Sản Phẩm</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
                        {/* Tên sản phẩm */}
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            name="name"
                            {...register("name", {
                                required: "Tên sản phẩm là bắt buộc",
                            })}
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}

                        {/* Giá */}
                        <label>Giá</label>
                        <input
                            type="text"
                            name="price"
                            {...register("price", {
                                required: "Giá là bắt buộc",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Giá phải là số hợp lệ",
                                },
                            })}
                        />
                        {errors.price && <p className="error">{errors.price.message}</p>}

                        {/* Mô tả */}
                        <label>Mô tả</label>
                        <textarea
                            name="description"
                            {...register("description", {
                                required: "Mô tả là bắt buộc",
                            })}
                        />
                        {errors.description && <p className="error">{errors.description.message}</p>}

                        <div className="add-product-actions">
                            {/* Nút Thêm */}
                            <button type="submit" className="btn-add-product">Thêm</button>

                            {/* Nút Hủy */}
                            <Link to="/admin" className="btn-cancel-product">Hủy</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
