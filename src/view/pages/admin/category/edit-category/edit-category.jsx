import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import HeaderAdmin from "../../layout/header";
import "./edit-category.css";

const EditCategory = () => {
    const { id } = useParams();
    
    const [category, setCategory] = useState({
        name: "",
        description: "",
        status: "active",
    });

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cập nhật danh mục:", category);
    };

    return (
        <div className="edit-category-container">
            <div className="content">
                <HeaderAdmin />
                <div className="edit-category-card">
                    <h2>Chỉnh Sửa Loại Sản Phẩm</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Tên Loại</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={category.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Mô Tả</label>
                            <textarea
                                id="description"
                                name="description"
                                value={category.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Trạng Thái</label>
                            <select name="status" value={category.status} onChange={handleChange}>
                                <option value="active">Đang kinh doanh</option>
                                <option value="inactive">Ngừng kinh doanh</option>
                            </select>
                        </div>

                        <div className="form-buttons">
                            <Link to="/admin/categories" type="submit" className="save-btn">Lưu</Link>
                            <Link to="/admin/categories" className="cancel-btn">Hủy</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
