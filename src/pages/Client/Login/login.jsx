import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        setError("");
        alert("Đăng nhập thành công!");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Đăng Nhập</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="login-label">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="login-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="login-input"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">
                        Đăng Nhập
                    </button>
                    <p className="signup-link">
                        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
