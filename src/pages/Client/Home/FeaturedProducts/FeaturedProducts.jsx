import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/product/list")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                console.log("Dữ liệu từ API:", data); // thêm dòng này để debug
                const featured = data.data.filter(function (product) {
                    return product.featured === "featured";
                });
                setProducts(featured);
            })
            .catch(function (err) {
                console.error("Lỗi khi tải sản phẩm nổi bật:", err);
            });
    }, []);

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
            {products.length > 0 ? (
                <Slider {...settings} className="featured-products">
                    {products.map(function (product) {
                        return (
                            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p className="price">{parseInt(product.price).toLocaleString()}đ</p>
                            </Link>
                        );
                    })}
                </Slider>
            ) : (
                <p>Không có sản phẩm nổi bật.</p>
            )}
        </section>
    );
};

export default FeaturedProducts;
