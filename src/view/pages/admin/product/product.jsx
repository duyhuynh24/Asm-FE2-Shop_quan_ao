
import { Link } from 'react-router-dom';
import "./product.css";
import HeaderAdmin from "../layout/header";

const Product = () => {
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
                                    <th>Giá</th>
                                    <th>Mô tả</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Áo Hoodie Nam</td>
                                    <td>350,000đ</td>
                                    <td>Chất vải nỉ bông, co giãn</td>
                                    <td className="product-action-buttons">
                                        <Link to="/admin/EditProduct/:id" className="btn-edit-product">Sửa</Link>
                                        <button className="btn-delete-product">Xóa</button>
                                    </td>


                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Quần Jean Slimfit</td>
                                    <td>420,000đ</td>
                                    <td>Vải denim cao cấp</td>
                                    <td className="product-action-buttons">
                                        <Link to="/admin/EditProduct/:id" className="btn-edit-product">Sửa</Link>
                                        <button className="btn-delete-product">Xóa</button>
                                    </td>



                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;