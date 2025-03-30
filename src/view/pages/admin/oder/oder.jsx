// order.jsx
import { Link } from 'react-router-dom';
import "./oder.css";
import HeaderAdmin from "../layout/header";

const Order = () => {
    return (
        <div className="main-container">
            <HeaderAdmin />
            <div className="order-container">
                <div className="order-box">
                    <h2 className="order-title">Danh Sách Đơn Hàng</h2>
                    <div className="table-responsive">
                        <table className="order-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Khách hàng</th>
                                    <th>Ngày đặt</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>DH001</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>2025-03-28</td>
                                    <td>1.200.000đ</td>
                                    <td>Hoàn thành</td>
                                </tr>
                                <tr>
                                    <td>DH002</td>
                                    <td>Trần Thị B</td>
                                    <td>2025-03-27</td>
                                    <td>750.000đ</td>
                                    <td>Chưa hoàn thành</td>
                                </tr>
                                <tr>
                                    <td>DH003</td>
                                    <td>Phạm Văn C</td>
                                    <td>2025-03-26</td>
                                    <td>2.500.000đ</td>
                                    <td className='text-success'>Hoàn thành</td>
                                </tr>
                                <tr>
                                    <td>DH004</td>
                                    <td>Lê Thị D</td>
                                    <td>2025-03-25</td>
                                    <td>950.000đ</td>
                                    <td>Chưa hoàn thành</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;