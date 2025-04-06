import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./signin.css";

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // Hàm xử lý khi người dùng submit form
    const onSubmit = (data) => {
        console.log("Dữ liệu đăng nhập:", data);
        // Thực hiện đăng nhập tại đây (gửi dữ liệu lên backend)
    };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Email address"
                                {...register("email", {
                                    required: "Email là bắt buộc",
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: "Email không hợp lệ"
                                    }
                                })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Mật khẩu là bắt buộc",
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự"
                                    }
                                })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>
                        <div className="signin-actions">
                            <Link to="/forgot-password" className="forgot-link">Quên Mật Khẩu?</Link>
                        </div>
                        <button type="submit" className="signin-btn">Đăng Nhập</button>
                    </form>
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
