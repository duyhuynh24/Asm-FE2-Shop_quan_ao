import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";
import { register } from "../../../services/authService";

// Định nghĩa schema validation
const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .required("Vui lòng nhập họ tên")
        .min(2, "Họ tên phải có ít nhất 2 ký tự")
        .max(50, "Họ tên không được quá 50 ký tự"),
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    phone: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
        ),
    confirmPassword: Yup.string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp"),
});

const Register = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await register(values);
            setError("");
            setSuccess(response.message || "Đăng ký thành công!");
            
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.message || "Có lỗi xảy ra khi đăng ký");
            setSuccess("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="register-page">
            <div className="register-container">
                <div className="register-box">
                    <h2>Đăng Ký</h2>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            phone: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="register-form">
                                <div className="form-group">
                                    <label className="register-label">Họ và tên</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className="register-input"
                                        placeholder="Nhập họ và tên"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="register-label">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="register-input"
                                        placeholder="Nhập email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="register-label">Số điện thoại</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        className="register-input"
                                        placeholder="Nhập số điện thoại"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="register-label">Mật khẩu</label>
                                    <Field
                                        type="password"
                                        name="password"
                                        className="register-input"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="register-label">Xác nhận mật khẩu</label>
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        className="register-input"
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="error-text"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="register-button"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Đang xử lý..." : "Đăng Ký"}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <p className="switch-link">
                        Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Register;
