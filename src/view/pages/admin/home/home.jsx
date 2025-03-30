import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import HeaderAdmin from "../layout/header";

const Dashboard = () => {
  return (
    <div className="main-container">
      <HeaderAdmin />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Bảng Điều Khiển</h2>
        
        {/* Sale & Revenue Section */}
        <div className="stats-container">
          {[
            { icon: "fa-chart-line", label: "Doanh Thu Hôm Nay", value: "$1234" },
            { icon: "fa-chart-bar", label: "Tổng Doanh Thu", value: "$5678" },
            { icon: "fa-chart-area", label: "Doanh Thu Ngày", value: "$910" },
            { icon: "fa-chart-pie", label: "Tổng Doanh Thu", value: "$1112" }
          ].map((stat, index) => (
            <div key={index} className="stat-card">
              <i className={`fa ${stat.icon} stat-icon`}></i>
              <div className="stat-info">
                <p>{stat.label}</p>
                <h6>{stat.value}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Sales */}
        <div className="recent-sales">
          <h6 className="section-title">Giao Dịch Gần Đây</h6>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Hóa Đơn</th>
                  <th>Khách Hàng</th>
                  <th>Số Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>01 Jan 2025</td>
                    <td>INV-0123</td>
                    <td>John Doe</td>
                    <td>$123</td>
                    <td className="status-paid">Đã Thanh Toán</td>
                    <td><Link to="#" className="btn-detail">Chi Tiết</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
