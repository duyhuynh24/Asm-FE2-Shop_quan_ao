import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import Constants from "../../../../Constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
    const [activeCategory, setActiveCategory] = useState("featured");
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(`${Constants.DOAMIN_API}/product/list`);
            const formatted = (res.data.data || []).map(function (product) {
                return {
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.sale_price) > 0 ? parseFloat(product.sale_price) : parseFloat(product.price),
                    oldPrice: parseFloat(product.sale_price) > 0 ? parseFloat(product.price) : null,
                    img: product.image,
                    createdAt: product.createdAt,
                    featured: product.featured,
                    sale_price: parseFloat(product.sale_price),
                    badge: "",
                    badgeClass: ""
                };
            });
            setAllProducts(formatted);
        } catch (err) {
            console.error("Lỗi khi lấy sản phẩm:", err);
        }
    };

    const getFilteredProducts = () => {
        return allProducts
            .filter(function (product) {
                const createdDate = new Date(product.createdAt);
                const now = new Date();
                const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);

                if (activeCategory === "new-arrival") {
                    return diffInDays <= 14;
                }

                if (activeCategory === "flash-sale") {
                    return product.sale_price > 0 && product.sale_price < product.oldPrice;
                }

                return (
                    product.featured === "featured" &&
                    diffInDays <= 14 &&
                    product.sale_price > 0
                );
            })
            .map(function (product) {
                let badge = "";
                let badgeClass = "";

                if (activeCategory === "new-arrival") {
                    badge = "🆕 Mới";
                    badgeClass = "new";
                } else if (activeCategory === "flash-sale") {
                    badge = "⚡ Sale";
                    badgeClass = "sale";
                } else {
                    badge = "🔥 Nổi Bật";
                    badgeClass = "featured";
                }

                return {
                    ...product,
                    badge: badge,
                    badgeClass: badgeClass
                };
            });
    };

    const changeCategory = (category) => {
        setActiveCategory(category);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <section className="featured-products">
            <h3>Sản Phẩm Nổi Bật</h3>
            <div className="tabs">
                <button
                    className={activeCategory === "featured" ? "active" : ""}
                    onClick={function () {
                        changeCategory("featured");
                    }}
                >
                    🔥 Nổi Bật
                </button>
                <button
                    className={activeCategory === "new-arrival" ? "active" : ""}
                    onClick={function () {
                        changeCategory("new-arrival");
                    }}
                >
                    🆕 Sản Phẩm Mới
                </button>
                <button
                    className={activeCategory === "flash-sale" ? "active" : ""}
                    onClick={function () {
                        changeCategory("flash-sale");
                    }}
                >
                    ⚡ Flash Sale
                </button>
            </div>

            <Slider {...settings}>
                {getFilteredProducts().map(function (product) {
                    return (
                        <div className="product-card" key={product.id}>
                            <span className={`badge ${product.badgeClass}`}>{product.badge}</span>
                            <img src={product.img} alt={product.name} />
                            <h4>{product.name}</h4>
                            <p className="price">
                                {product.price.toLocaleString()} VNĐ
                                {product.oldPrice && (
                                    <span className="old-price">
                                        {product.oldPrice.toLocaleString()} VNĐ
                                    </span>
                                )}
                            </p>
                            <Link to={`/product/${product.id}`}>
                                <button className="button">Mua Ngay</button>
                            </Link>
                        </div>
                    );
                })}
            </Slider>
        </section>
    );
};

export default FeaturedProducts;
