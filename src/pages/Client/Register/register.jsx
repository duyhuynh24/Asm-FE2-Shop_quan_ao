import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp!");
            return;
        }

        setError("");
        setSuccess("Đăng ký thành công!");
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Đăng Ký</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <label className="register-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="register-input"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="register-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="register-label">Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        className="register-input"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit" className="register-button">
                        Đăng Ký
                    </button>
                </form>
                <p className="switch-link">
                    Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
