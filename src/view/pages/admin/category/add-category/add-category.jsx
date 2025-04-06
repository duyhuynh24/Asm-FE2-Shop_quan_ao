import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HeaderAdmin from "../../layout/header";
import "./add-category.css";

const AddCategory = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Dữ liệu form:", data);
    };

    return (
        <>
            <HeaderAdmin />
            <div className="category-wrapper">
                <div className="category-content">
                    <div className="category-box">
                        <div className="category-title">
                            <h2>Thêm Loại Sản Phẩm</h2>
                        </div>

                        <form className="category-input-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group">
                                <label htmlFor="name">Tên loại</label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name", { required: "Tên loại là bắt buộc" })}
                                />
                                {errors.name && <p className="error">{errors.name.message}</p>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="description">Mô tả</label>
                                <textarea
                                    id="description"
                                    {...register("description", { required: "Mô tả là bắt buộc" })}
                                />
                                {errors.description && <p className="error">{errors.description.message}</p>}
                            </div>

                            <div className="input-group">
                                <label htmlFor="status">Trạng thái</label>
                                <select id="status" {...register("status", { required: "Vui lòng chọn trạng thái" })}>
                                    <option value="">-- Chọn trạng thái --</option>
                                    <option value="active">Đang kinh doanh</option>
                                    <option value="inactive">Ngừng kinh doanh</option>
                                </select>
                                {errors.status && <p className="error">{errors.status.message}</p>}
                            </div>

                            <div className="action-buttons">
                                
                                <button type="submit" className="save-button text-center">
                                    Lưu
                                </button>
                                <Link to="/admin/categories" className="cancel-button text-center">
                                    Hủy
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategory;
