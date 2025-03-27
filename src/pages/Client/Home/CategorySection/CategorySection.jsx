import { Link } from "react-router-dom";
import "./CategorySection.css"
import menImage from "../../../../assets/img/nam.webp";
import womenImage from "../../../../assets/img/nu.webp";
import kidsImage from "../../../../assets/img/tre em.webp";

const CategorySection = () => {
    return (
        <section className="categories">
        <h2>Danh Mục Sản Phẩm</h2>
        <div className="category-list">
            <Link to="/shop?category=men" className="category-item">
                <div className="category-card">
                    <img src={menImage} alt="Thời trang Nam" />
                    <h3>THỜI TRANG NAM</h3>
                </div>
            </Link>

            <Link to="/shop?category=women" className="category-item">
                <div className="category-card">
                    <img src={womenImage} alt="Thời trang Nữ" />
                    <h3>THỜI TRANG NỮ</h3>
                </div>
            </Link>

            <Link to="/shop?category=kids" className="category-item">
                <div className="category-card">
                    <img src={kidsImage} alt="Thời trang Trẻ Em" />
                    <h3>THỜI TRANG TRẺ EM</h3>
                </div>
            </Link>
        </div>
    </section>
    )
}

export default CategorySection;