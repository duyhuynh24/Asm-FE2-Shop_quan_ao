import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
  
    const onSubmit = (data) => {
        console.log("Dữ liệu đăng ký:", data);
      
    };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Username"
                                {...register("username", {
                                    required: "Tên người dùng là bắt buộc",
                                    minLength: {
                                        value: 4,
                                        message: "Tên người dùng phải có ít nhất 4 ký tự"
                                    }
                                })}
                            />
                            {errors.username && <p className="error">{errors.username.message}</p>}
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Email"
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

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Phone"
                                {...register("phone", {
                                    required: "Số điện thoại là bắt buộc",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Số điện thoại không hợp lệ"
                                    }
                                })}
                            />
                            {errors.phone && <p className="error">{errors.phone.message}</p>}
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Address"
                                {...register("address", {
                                    required: "Địa chỉ là bắt buộc"
                                })}
                            />
                            {errors.address && <p className="error">{errors.address.message}</p>}
                        </div>

                        <div className="signup-actions">
                            <Link to="/forgot-password" className="forgot-link">Quên Mật Khẩu?</Link>
                        </div>
                        <button type="submit" className="signup-btn">Đăng Ký</button>
                    </form>
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
