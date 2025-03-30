import { Link } from 'react-router-dom';
import HeaderAdmin from "../layout/header";
import "./category.css";

const Category = () => {
    return (
        <>

            <HeaderAdmin />
            <div className="category-container">
                <div className="content">

                    <div className="category-card">
                        <div className="category-header">
                            <h2>Danh Sách Loại Sản Phẩm</h2>
                            <Link to="/admin/AddCategory" className="category-add-btn">+ Thêm Loại</Link>
                        </div>

                        <div className="category-table-wrapper">
                            <table className="category-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên loại</th>
                                        <th>Mô tả</th>
                                        <th>Trạng thái</th>
                                        <th>Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Áo Nam</td>
                                        <td>Các loại áo nam thời trang</td>
                                        <td><span className="category-badge-success">Đang kinh doanh</span></td>
                                        <td>
                                            <Link to="/admin/EditCategory" className="category-edit-btn">Sửa</Link>
                                            <button className="category-delete-btn">Xóa</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Quần Nam</td>
                                        <td>Quần jeans, kaki, thể thao</td>
                                        <td><span className="category-badge-danger">Ngừng kinh doanh</span></td>
                                        <td>
                                            <Link to="/admin/EditCategory" className="category-edit-btn">Sửa</Link>
                                            <button className="category-delete-btn">Xóa</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Category;
