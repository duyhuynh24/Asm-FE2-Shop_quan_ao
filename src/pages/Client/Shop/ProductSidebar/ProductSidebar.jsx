import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductSidebar.css";

const ProductSidebar = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [targetGroups, setTargetGroups] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTargetGroup, setSelectedTargetGroup] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        fetch("http://localhost:3001/category/list")
            .then(function (res) { return res.json(); })
            .then(function (data) { setCategories(data.data || []); });

        fetch("http://localhost:3001/target-group/list")
            .then(function (res) { return res.json(); })
            .then(function (data) { setTargetGroups(data.data || []); });
    }, []);

    useEffect(() => {
        let url = "http://localhost:3001/product/list";
        fetch(url)
            .then(function (res) { return res.json(); })
            .then(function (data) {
                let filtered = data.data || [];
                if (selectedCategory) {
                    filtered = filtered.filter(function (product) {
                        return product.category_id === selectedCategory;
                    });
                }
                if (selectedTargetGroup) {
                    filtered = filtered.filter(function (product) {
                        return product.target_group_id === selectedTargetGroup;
                    });
                }
                setProducts(filtered);
                setCurrentPage(1); // reset về page đầu tiên mỗi lần lọc
            });
    }, [selectedCategory, selectedTargetGroup]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    function handleCategoryChange(event) {
        setSelectedCategory(parseInt(event.target.value));
    }

    function handleTargetGroupChange(event) {
        setSelectedTargetGroup(parseInt(event.target.value));
    }

    return (
        <div className="container-sidebar">
            <aside className="shop-sidebar">
                <h3>Bộ Lọc</h3>

                <div className="filter-section">
                    <h4>Thời Trang</h4>
                    <ul>
                        {targetGroups.map(function (group) {
                            return (
                                <li key={group.id}>
                                    <input type="radio" name="target" value={group.id} onChange={handleTargetGroupChange} /> {group.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="filter-section">
                    <h4>Loại sản phẩm</h4>
                    <ul>
                        {categories.map(function (cat) {
                            return (
                                <li key={cat.id}>
                                    <input type="radio" name="category" value={cat.id} onChange={handleCategoryChange} /> {cat.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>

            <main className="product-list">
                <h3>Danh Sách Sản Phẩm</h3>
                <div className="products">
                    {currentProducts.map(function (product) {
                        return (
                            <div className="product" key={product.id}>
                                <img src={product.image} alt={product.name} />
                                <h4>{product.name}</h4>
                                <p className="price">
                                    {parseInt(product.sale_price).toLocaleString()}đ <span className="old-price">{parseInt(product.price).toLocaleString()}đ</span>
                                </p>
                                <Link to={`/product/${product.id}`}><button className="button">Mua Ngay</button></Link>
                            </div>
                        );
                    })}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, function (_, i) {
                            return (
                                <button key={i + 1} onClick={function () { handlePageChange(i + 1); }} className={currentPage === i + 1 ? 'active' : ''}>
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProductSidebar;