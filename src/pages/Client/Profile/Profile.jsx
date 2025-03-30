import { useState } from "react";
import { Pencil, LogOut } from "lucide-react";
import "./Profile.css";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Nguyễn Cao Minh",
        email: "minncpc05371@fpt.edu.vn",
        phone: "0987654321",
        avatar: require("../../../assets/img/user-4.jpg"),
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <main className="profile-container">
            <h2>Thông Tin Khách hàng</h2>
            <div className="profile-card">
                <div className="profile-left">
                    <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                </div>
                <div className="profile-right">
                    <h3 className="profile-name">{user.name}</h3>
                    <p className="profile-email">{user.email}</p>
                    <div className="profile-field">
                        <label>Tên:</label>
                        {isEditing ? (
                            <input type="text" name="name" value={user.name} onChange={handleChange} />
                        ) : (
                            <p>{user.name}</p>
                        )}
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        {isEditing ? (
                            <input type="email" name="email" value={user.email} onChange={handleChange} />
                        ) : (
                            <p>{user.email}</p>
                        )}
                    </div>
                    <div className="profile-field">
                        <label>Số điện thoại:</label>
                        {isEditing ? (
                            <input type="text" name="phone" value={user.phone} onChange={handleChange} />
                        ) : (
                            <p>{user.phone}</p>
                        )}
                    </div>
                    <div className="profile-footer">
                        {isEditing ? (
                            <button className="btn" onClick={() => setIsEditing(false)}>Lưu</button>
                        ) : (
                            <button className="btn" onClick={() => setIsEditing(true)}>
                                <Pencil className="icon" /> Chỉnh sửa
                            </button>
                        )}
                        <button className="btn logout-btn">
                            <LogOut className="icon" /> Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}