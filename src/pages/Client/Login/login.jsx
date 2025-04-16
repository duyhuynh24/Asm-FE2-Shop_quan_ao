import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.css";
import { useAuth } from "../../../contexts/AuthContext";

// Định nghĩa schema validation
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
});

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [redirectMessage, setRedirectMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { login: authLogin } = useAuth();

    // Kiểm tra xem có được chuyển hướng từ trang khác không
    useEffect(() => {
        // Lấy thông báo từ state location (nếu có)
        if (location.state?.message) {
            setRedirectMessage(location.state.message);
        }
    }, [location]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setError("");
            setRedirectMessage("");
            console.log('Attempting login with:', values);

            // Xóa dữ liệu người dùng cũ trước khi đăng nhập
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            // Gọi API đăng nhập
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Có lỗi xảy ra khi đăng nhập');
            }

            if (!data.token || !data.user) {
                throw new Error('Dữ liệu đăng nhập không hợp lệ');
            }

            // Lưu token trước
            localStorage.setItem('token', data.token);
            
            // Chuẩn bị dữ liệu user (không bao gồm token)
            const userData = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone,
                role: data.user.role
            };
            
            console.log('Processing login with user data:', userData);

            // Lưu user vào localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // Cập nhật context
            await authLogin(userData);
            
            setSuccess("Đăng nhập thành công!");
            
            // Chuyển hướng đến trang chủ hoặc trang trước đó sau khi đăng nhập thành công
            setTimeout(() => {
                // Nếu có trang trước đó lưu trong state, chuyển hướng về đó
                if (location.state?.from) {
                    navigate(location.state.from);
                } else {
                    // Mặc định chuyển về trang chủ
                    navigate('/');
                }
            }, 1000);

        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || "Email hoặc mật khẩu không chính xác");
            // Xóa token nếu có lỗi
            localStorage.removeItem('token');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="container">
            <div className="login-container">
                <div className="login-box">
                    <h2>Đăng Nhập</h2>
                    {redirectMessage && (
                        <p className="redirect-message">{redirectMessage}</p>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="login-form">
                                <div className="form-group">
                                    <label className="login-label">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="login-input"
                                        placeholder="Nhập email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="login-label">Mật khẩu</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="login-input"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="login-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="auth-links">
                        <Link to="/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </Link>
                        <p className="switch-link">
                            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
