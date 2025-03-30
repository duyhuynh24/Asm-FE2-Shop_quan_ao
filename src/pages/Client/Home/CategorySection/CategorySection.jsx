import { Link } from "react-router-dom";
import "./CategorySection.css"
import menImage from "../../../../assets/img/nam.webp";
import womenImage from "../../../../assets/img/nu.webp";
import kidsImage from "../../../../assets/img/tre em.webp";

const CategorySection = () => {
    return (
        <section className="home-categories">
            <h2>Danh Mục Sản Phẩm</h2>
            <div className="categories-list">
                <Link to="/shop?categories=men" className="categories-item">
                    <div className="categories-card">
                        <img src={menImage} alt="Thời trang Nam" />
                        <h3>THỜI TRANG NAM</h3>
                    </div>
                </Link>

                <Link to="/shop?categories=women" className="categories-item">
                    <div className="categories-card">
                        <img src={womenImage} alt="Thời trang Nữ" />
                        <h3>THỜI TRANG NỮ</h3>
                    </div>
                </Link>

                <Link to="/shop?categories=kids" className="categories-item">
                    <div className="categories-card">
                        <img src={kidsImage} alt="Thời trang Trẻ Em" />
                        <h3>THỜI TRANG TRẺ EM</h3>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default CategorySection;