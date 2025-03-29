// signin.jsx
import { Link } from 'react-router-dom';
import "./signin.css";

const SignIn = () => {
    return (
        <div className="signin-container">
            <div className="signin-box">
                <div className="signin-header">
                    <Link to="/" className="signin-logo">
                        <h3><i className="fa fa-user-edit me-2"></i> ADMIN</h3>
                    </Link>
                    <h3 className="signin-title">Đăng Nhập</h3>
                </div>
                <div className="signin-form">
                    <div className="form-group">
                        <input type="email" className="form-input" placeholder="Email address" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-input" placeholder="Password" />
                    </div>
                    <div className="signin-actions">
                        <Link to="/forgot-password" className="forgot-link">Quên Mật Khẩu?</Link>
                    </div>
                    <button type="submit" className="signin-btn">Đăng Nhập</button>
                    <div className="button-spacing-large"></div>
                    <Link to="/admin" className="back-btn">Trở Về</Link>
                    <p className="signin-footer">
                        Bạn Chưa Có Tài Khoản? <Link to="/admin/signup">Đăng Ký</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;