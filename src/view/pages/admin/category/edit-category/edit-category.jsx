import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import HeaderAdmin from "../../layout/header";
import "./edit-category.css";

const EditCategory = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Cập nhật danh mục:", data);
    };

    return (
        <>
            <HeaderAdmin />
            <div className="edit-category-container">
                <div className="content">
                    <div className="edit-category-card">
                        <h2>Chỉnh Sửa Loại Sản Phẩm</h2>
                        <form className="category-input-form" onSubmit={handleSubmit(onSubmit)}>
                            {/* Tên loại */}
                            <div className="form-group">
                                <label htmlFor="name">Tên Loại</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    {...register("name", {
                                        required: { value: true, message: "Tên loại là bắt buộc" },
                                    })}
                                />
                                {errors.name && <p className="error">{errors.name.message}</p>}
                            </div>

                            {/* Mô tả */}
                            <div className="form-group">
                                <label htmlFor="description">Mô Tả</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    {...register("description", {
                                        required: { value: true, message: "Mô tả là bắt buộc" },
                                    })}
                                />
                                {errors.description && <p className="error">{errors.description.message}</p>}
                            </div>

                            {/* Trạng thái */}
                            <div className="form-group">
                                <label>Trạng Thái</label>
                                <select
                                    name="status"
                                    {...register("status", {
                                        required: { value: true, message: "Trạng thái là bắt buộc" },
                                    })}
                                >
                                    <option value="">-- Chọn trạng thái --</option>
                                    <option value="active">Đang kinh doanh</option>
                                    <option value="inactive">Ngừng kinh doanh</option>
                                </select>
                                {errors.status && <p className="error">{errors.status.message}</p>}
                            </div>

                            <div className="form-buttons">
                                {/* Nút Lưu */}
                                <button type="submit" className="save-btn">Lưu</button>

                                {/* Nút Hủy */}
                                <Link to="/admin/categories" className="cancel-btn">Hủy</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCategory;
