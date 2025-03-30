import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedProducts.css";

const FeaturedProducts = () => {
    const [activeCategory, setActiveCategory] = useState("best-seller");

    function changeCategory(category) {
        setActiveCategory(category);
    }

    const products = [
        { id: 1, name: "Áo Hoodie Local Brand", price: 350000, oldPrice: 450000, category: "best-seller", badge: "🔥 Best Seller", badgeClass: "best-seller", img: require("../../../../assets/img/aothun.webp")},
        { id: 2, name: "Áo Thun Oversize", price: 250000, category: "best-seller", badge: "🔥 Best Seller", badgeClass: "best-seller", img: require("../../../../assets/img/aothun.webp")  },
        { id: 3, name: "Quần Jogger", price: 400000, category: "best-seller", badge: "🔥 Best Seller", badgeClass: "best-seller", img: require("../../../../assets/img/aothun.webp")  },
        { id: 4, name: "Áo Polo Local Brand", price: 380000, category: "best-seller", badge: "🔥 Best Seller", badgeClass: "best-seller", img: require("../../../../assets/img/aothun.webp")  },
        { id: 5, name: "Giày Thể Thao", price: 700000, oldPrice: 850000, category: "best-seller", badge: "🔥 Best Seller", badgeClass: "best-seller", img: require("../../../../assets/img/aothun.webp")  },
        { id: 6, name: "Ba Lô Streetwear", price: 450000, category: "best-seller", badge: "🔥 Best Seller", badgeClass: "best-seller", img: require("../../../../assets/img/aothun.webp")  },
    
        { id: 7, name: "Quần Jean Ripped", price: 500000, category: "new-arrival", badge: "🆕 New", badgeClass: "new-arrival", img: require("../../../../assets/img/aothun.webp")  },
        { id: 8, name: "Áo Khoác Bomber", price: 600000, category: "new-arrival", badge: "🆕 New", badgeClass: "new-arrival", img: require("../../../../assets/img/aothun.webp")  },
        { id: 9, name: "Túi Đeo Chéo", price: 320000, category: "new-arrival", badge: "🆕 New", badgeClass: "new-arrival", img: require("../../../../assets/img/aothun.webp")  },
        { id: 10, name: "Giày Casual Sneaker", price: 850000, oldPrice: 950000, category: "new-arrival", badge: "🆕 New", badgeClass: "new-arrival", img: require("../../../../assets/img/aothun.webp")  },
    
        { id: 13, name: "Giày Sneakers", price: 600000, oldPrice: 1200000, category: "flash-sale", badge: "⚡ Sale 50%", badgeClass: "flash-sale", img: require("../../../../assets/img/aothun.webp")  },
        { id: 14, name: "Áo Sơ Mi Basic", price: 280000, oldPrice: 560000, category: "flash-sale", badge: "⚡ Sale 50%", badgeClass: "flash-sale", img: require("../../../../assets/img/aothun.webp")  },
        { id: 15, name: "Túi Tote Vải", price: 180000, oldPrice: 360000, category: "flash-sale", badge: "⚡ Sale 50%", badgeClass: "flash-sale", img: require("../../../../assets/img/aothun.webp")  },
        { id: 16, name: "Bộ Đồ Thể Thao", price: 500000, oldPrice: 1000000, category: "flash-sale", badge: "⚡ Sale 50%", badgeClass: "flash-sale", img: require("../../../../assets/img/aothun.webp")  },
    ];
    
    function getFilteredProducts() {
        return products.filter((product) => product.category === activeCategory);
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="featured-products">
            <h3>Sản Phẩm Nổi Bật</h3>
            <div className="tabs">
                <button className={activeCategory === "best-seller" ? "active" : ""} onClick={() => changeCategory("best-seller")}>🔥 Bán Chạy</button>
                <button className={activeCategory === "new-arrival" ? "active" : ""} onClick={() => changeCategory("new-arrival")}>🆕 Sản Phẩm Mới</button>
                <button className={activeCategory === "flash-sale" ? "active" : ""} onClick={() => changeCategory("flash-sale")}>⚡ Flash Sale</button>
            </div>

            <Slider {...settings}>
                {getFilteredProducts().map((product) => (
                    <div className="product-card" key={product.id}>
                        <span className={`badge ${product.badgeClass}`}>{product.badge}</span>
                        <img src={product.img} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p className="price">
                            {product.price.toLocaleString()} VNĐ
                            {product.oldPrice && <span className="old-price"> {product.oldPrice.toLocaleString()} VNĐ</span>}
                        </p>
                        <button>Mua Ngay</button>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default FeaturedProducts;
