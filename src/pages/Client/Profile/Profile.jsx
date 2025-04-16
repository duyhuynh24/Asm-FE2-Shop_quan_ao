import { useState, useEffect } from "react";
import { Pencil, LogOut, RefreshCw } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const { user, logout } = useAuth();
    const [localUser, setLocalUser] = useState(null);
    const navigate = useNavigate();
    const [updateStatus, setUpdateStatus] = useState({ message: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Hàm để load lại dữ liệu
    const reloadUserData = () => {
        setIsLoading(true);
        try {
            // Xóa user data cũ
            setLocalUser(null);
            
            // Đọc lại từ localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                console.log('Reloaded user data:', parsedUser);
                setLocalUser({
                    ...parsedUser,
                    avatar: parsedUser.avatar || require("../../../assets/img/user-4.jpg")
                });
                
                setUpdateStatus({
                    message: 'Đã cập nhật dữ liệu mới nhất!',
                    type: 'success'
                });
            } else if (user) {
                setLocalUser({
                    ...user,
                    avatar: user.avatar || require("../../../assets/img/user-4.jpg")
                });
            } else {
                setUpdateStatus({
                    message: 'Không tìm thấy dữ liệu người dùng, vui lòng đăng nhập lại.',
                    type: 'error'
                });
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            console.error('Error reloading user data:', error);
            setUpdateStatus({
                message: 'Có lỗi xảy ra khi làm mới dữ liệu',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        reloadUserData();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validation cơ bản
        if (name === 'phone') {
            // Chỉ cho phép số và tối đa 10 ký tự
            if (!/^\d{0,10}$/.test(value)) {
                return;
            }
        } else if (name === 'name') {
            // Giới hạn độ dài tên và không cho phép ký tự đặc biệt
            if (value.length > 50 || /[<>{}]/g.test(value)) {
                return;
            }
        }

        setLocalUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            // Validation trước khi gửi
            if (!localUser.name || localUser.name.trim().length < 2) {
                throw new Error('Tên phải có ít nhất 2 ký tự');
            }

            if (localUser.phone && !/^\d{10}$/.test(localUser.phone)) {
                throw new Error('Số điện thoại không hợp lệ');
            }

            const token = localStorage.getItem('token'); // Use 'token' instead of 'accessToken'
            if (!token) {
                throw new Error('Vui lòng đăng nhập lại để thực hiện thao tác này');
            }

            console.log('Token being used:', token); // Debug log

            const response = await fetch('http://localhost:3000/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token.startsWith('Bearer') ? token : `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: localUser.name.trim(),
                    phone: localUser.phone || '',
                    email: localUser.email // Thêm email vào request
                })
            });

            // Log response status và headers để debug
            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            // Kiểm tra content-type
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error('Server trả về HTML thay vì JSON. Có thể bạn cần đăng nhập lại.');
            }

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    throw new Error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Có lỗi xảy ra khi cập nhật thông tin');
            }

            const data = await response.json();
            console.log('Response data:', data); // Debug log

            // Chỉ cập nhật các trường được phép
            const updatedUser = { 
                ...localUser,
                name: data.name || localUser.name,
                phone: data.phone || localUser.phone
            };
            
            // Cập nhật cả trong localStorage và context
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setLocalUser(updatedUser);
            
            setUpdateStatus({
                message: 'Cập nhật thông tin thành công!',
                type: 'success'
            });
            setIsEditing(false);

            // Force reload page sau 1 giây để cập nhật dữ liệu mới
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Error updating profile:', error);
            
            // Xử lý lỗi cụ thể hơn
            let errorMessage = error.message;
            if (error.message.includes('<!DOCTYPE')) {
                errorMessage = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại';
                localStorage.removeItem('token');
                setTimeout(() => navigate('/login'), 2000);
            }

            setUpdateStatus({
                message: errorMessage,
                type: 'error'
            });
        }
    };

    const handleLogout = () => {
        try {
            logout(); // Gọi hàm logout từ AuthContext
            navigate('/login'); // Chuyển hướng về trang login
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Hiển thị loading khi chưa có dữ liệu
    if (!localUser) {
        return (
            <main className="profile-container">
                <div className="loading">Đang tải thông tin...</div>
            </main>
        );
    }

    return (
        <main className="profile-container">
            <h2>Thông Tin Khách hàng</h2>
            {updateStatus.message && (
                <div className={`alert ${updateStatus.type}`}>
                    {updateStatus.message}
                </div>
            )}
            <div className="profile-actions">
                <button 
                    className="btn refresh-btn" 
                    onClick={reloadUserData}
                    disabled={isLoading}
                >
                    <RefreshCw className="icon" size={16} />
                    {isLoading ? 'Đang tải...' : 'Làm mới dữ liệu'}
                </button>
            </div>
            <div className="profile-card">
                <div className="profile-left">
                    <img 
                        src={localUser?.avatar || require("../../../assets/img/user-4.jpg")} 
                        alt="Avatar" 
                        className="profile-avatar"
                        onError={(e) => {
                            e.target.src = require("../../../assets/img/user-4.jpg");
                        }}
                    />
                </div>
                <div className="profile-right">
                    <h3 className="profile-name">{localUser?.name || 'Chưa cập nhật'}</h3>
                    <p className="profile-email">{localUser?.email || 'Chưa cập nhật'}</p>
                    <div className="profile-field">
                        <label>Tên:</label>
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="name" 
                                value={localUser?.name || ''} 
                                onChange={handleChange}
                                placeholder="Nhập tên của bạn"
                                maxLength={50}
                            />
                        ) : (
                            <p>{localUser?.name || 'Chưa cập nhật'}</p>
                        )}
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        <p>{localUser?.email || 'Chưa cập nhật'}</p>
                        {isEditing && (
                            <small className="text-muted">Email không thể thay đổi vì được dùng để đăng nhập</small>
                        )}
                    </div>
                    <div className="profile-field">
                        <label>Số điện thoại:</label>
                        {isEditing ? (
                            <>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={localUser?.phone || ''} 
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại của bạn"
                                    maxLength={10}
                                    pattern="\d{10}"
                                />
                                <small className="text-muted">Vui lòng nhập 10 số</small>
                            </>
                        ) : (
                            <p>{localUser?.phone || 'Chưa cập nhật'}</p>
                        )}
                    </div>
                    <div className="profile-footer">
                        {isEditing ? (
                            <>
                                <button 
                                    className="btn save-btn" 
                                    onClick={handleSave}
                                    disabled={!localUser?.name || (localUser?.phone && !/^\d{10}$/.test(localUser.phone))}
                                >
                                    Lưu thay đổi
                                </button>
                                <button className="btn cancel-btn" onClick={() => {
                                    setIsEditing(false);
                                    // Reset về dữ liệu ban đầu
                                    const storedUser = localStorage.getItem('user');
                                    if (storedUser) {
                                        setLocalUser(JSON.parse(storedUser));
                                    }
                                }}>
                                    Hủy
                                </button>
                            </>
                        ) : (
                            <button className="btn" onClick={() => setIsEditing(true)}>
                                <Pencil className="icon" /> Chỉnh sửa
                            </button>
                        )}
                        <button className="btn logout-btn" onClick={handleLogout}>
                            <LogOut className="icon" /> Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}