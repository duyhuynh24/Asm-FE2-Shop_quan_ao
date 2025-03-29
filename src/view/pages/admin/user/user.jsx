import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderAdmin from "../layout/header";
import FooterAdmin from "../layout/footer";
import "./user.css"; 
const users = [
    { id: 1, name: "Nguyễn Văn A", phone: "0123456789", email: "email@example.com", address: "Hà Nội" },
    { id: 2, name: "Trần Thị B", phone: "0987654321", email: "email2@example.com", address: "TP.HCM" }
  ];
  
  const User = () => {
    return (
      <div className="d-flex user-page">
        <HeaderAdmin />
        <div className="user-container">
          <h2 className="user-title">Danh Sách Người Dùng</h2>
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên</th>
                  <th>Mật Khẩu</th>
                  <th>Số Điện Thoại</th>
                  <th>Gmail</th>
                  <th>Địa Chỉ</th>
                  <th>Hoạt Động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>********</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>
                      <button className="edit-btn">
                        <i className="fas fa-edit"></i> Sửa
                      </button>
                      <button className="delete-btn">
                        <i className="fas fa-trash-alt"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default User;