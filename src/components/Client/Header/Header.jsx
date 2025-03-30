import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../assets/img/logo.webp";
import "./header.css";

const Header = () => {
  const isLoggedIn = false; // TODO: Thay đổi dựa trên trạng thái đăng nhập

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
          <Link to="/cart" className="cart">
            <FaShoppingCart />
            <span className="cart-count">3</span>
          </Link>

          {isLoggedIn ? (
            <div className="user-menu">
              <button className="user-btn">
                <FaUser /> Tài khoản
              </button>
              <ul className="dropdown-menu">
                <li><Link to="/profile">Thông tin</Link></li>
                <li><Link to="/orders">Đơn hàng</Link></li>
                <li><Link to="/logout">Đăng xuất</Link></li>
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