import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {

    const products = [
        { id: 1, name: "Áo Thun Unisex", price: "299.000đ", image: require('../../../../assets/img/aothun.webp') },
        { id: 2, name: "Quần Jean Nam", price: "499.000đ", image: require('../../../../assets/img/quanjean.webp') },
        { id: 3, name: "Váy Nữ Thanh Lịch", price: "599.000đ", image: require('../../../../assets/img/vaynuthoitrang.webp') },
        { id: 4, name: "Giày Sneaker Nam", price: "799.000đ", image: require('../../../../assets/img/giaysneaker.webp') },
        { id: 5, name: "Túi Xách Cao Cấp", price: "999.000đ", image: require('../../../../assets/img/tuixach.webp') },
        { id: 6, name: "Mắt Kính Thời Trang", price: "699.000đ", image: require('../../../../assets/img/matkinh.webp') }
    ];

    // Cấu hình slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        swipe: true
    };

    return (
        <section className="featured-products">
            <h2>Sản Phẩm Nổi Bật</h2>
            <Slider {...settings} className="featured-products">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </Link>
                ))}
            </Slider>
        </section>
    );
};

export default FeaturedProducts;
