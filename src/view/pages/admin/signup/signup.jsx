// signup.jsx
import { Link } from 'react-router-dom';
import "./signup.css";

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-header">
                    <Link to="/" className="signup-logo">
                        <h3><i className="fa fa-user-edit me-2"></i> ADMIN</h3>
                    </Link>
                    <h3 className="signup-title">Đăng Ký</h3>
                </div>
                <div className="signup-form">
                    <div className="form-group">
                        <input type="text" className="form-input" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-input" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-input" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" placeholder="Phone" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-input" placeholder="Address" />
                    </div>
                    <div className="signup-actions">
                        <Link to="/forgot-password" className="forgot-link">Quên Mật Khẩu?</Link>
                    </div>
                    <button type="submit" className="signup-btn">Đăng Ký</button>
                    <div className="button-spacing-large"></div>
                    <Link to="/admin" className="back-btn">Trở Về</Link>
                    <p className="signup-footer">
                        Bạn Đã Có Tài Khoản? <Link to="/admin/signin">Đăng Nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;