import { Link } from "react-router-dom";
import HeaderAdmin from "../../layout/header";
import "./add-category.css";

const AddCategory = () => {
    return (
        <div className="category-wrapper">
            <div className="category-content">
                <HeaderAdmin />
                <div className="category-box">
                    <div className="category-title">
                        <h2>Thêm Loại Sản Phẩm</h2>
                    </div>

                    <form className="category-input-form">
                        <div className="input-group">
                            <label>Tên loại</label>
                            <input type="text" required />
                        </div>

                        <div className="input-group">
                            <label>Mô tả</label>
                            <textarea required />
                        </div>

                        <div className="input-group">
                            <label>Trạng thái</label>
                            <select>
                                <option value="active">Đang kinh doanh</option>
                                <option value="inactive">Ngừng kinh doanh</option>
                            </select>
                        </div>

                        <div className="action-buttons">
                            <Link to="/admin/categories" type="submit" className="save-button text-center">Lưu</Link>
                            <Link to="/admin/categories" className="cancel-button text-center">Hủy</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
