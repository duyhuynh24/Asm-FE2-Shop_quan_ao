import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../../../contexts/AuthContext";
import { useState, useEffect } from "react";
import logo from "../../../assets/img/logo.webp";
import "./header.css";

const Header = () => {
  const { user: contextUser, isAuthenticated, logout } = useAuth();
  const [user, setUser] = useState(contextUser);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Đồng bộ user từ localStorage và context khi đường dẫn thay đổi hoặc component mount
  useEffect(() => {
    // Force kiểm tra xác thực và lấy dữ liệu mới nhất
    const checkAuthAndUpdateUser = () => {
      try {
        // Kiểm tra token
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        // Kiểm tra xác thực
        const authenticated = !!token && !!storedUser;
        setIsAuth(authenticated);
        
        if (authenticated && storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            console.log('Header updated with user:', userData.name);
            setUser(userData);
          } catch (error) {
            console.error('Failed to parse user data:', error);
          }
        } else {
          console.log('No valid auth data found in Header');
          setUser(null);
        }
      } catch (error) {
        console.error('Error in Header auth check:', error);
        setIsAuth(false);
      }
    };

    // Kiểm tra mỗi khi location hoặc contextUser thay đổi
    checkAuthAndUpdateUser();
  }, [location, contextUser]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Token and user removed from localStorage');
    
    setUser(null);
    navigate('/login');
  };

  // Debug
  console.log('Header render, authenticated:', isAuth, 'user:', user?.name);

  return (
    <header className="header">
      <div className="container-header">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="Fashion Shop" />
        </Link>

        {/* Thanh tìm kiếm */}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm sản phẩm..." />
          <button type="submit">
            <FaSearch />
          </button>
        </div>

        {/* Điều hướng */}
        <nav className="nav">
          <ul className="nav-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/shop">Sản phẩm</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </nav>

        {/* Hành động người dùng */}
        <div className="user-actions">
          {/* Giỏ hàng - kiểm tra đăng nhập */}
          {isAuth ? (
            <Link to="/cart" className="cart">
              <FaShoppingCart />
              <span className="cart-count">3</span>
            </Link>
          ) : (
            <Link to="/login" className="cart" onClick={(e) => {
              e.preventDefault();
              navigate('/login', { state: { from: '/cart', message: 'Vui lòng đăng nhập để xem giỏ hàng' } });
            }}>
              <FaShoppingCart />
              <span className="cart-count">3</span>
            </Link>
          )}

          {isAuth ? (
            <div className="user-menu">
              <button className="user-btn">
                <FaUser /> {user?.name || 'Tài khoản'}
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/profile">Thông tin</Link></li>
                <li><Link to="/orders">Đơn hàng</Link></li>
                <li><button onClick={handleLogout}>Đăng xuất</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn">Đăng nhập</Link>
              <Link to="/register" className="btn btn-primary">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;