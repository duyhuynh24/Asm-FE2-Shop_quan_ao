import React from "react";
import "./ProductSidebar.css";

const ProductSidebar = () => {
    return (
        <div className="container-sidebar">
            {/* Sidebar - Bộ Lọc */}
            <aside className="sidebar">
                <h3>Bộ Lọc</h3>

                {/* Loại sản phẩm */}
                <div className="filter-section">
                    <h4>Loại sản phẩm</h4>
                    <ul>
                        <li><input type="checkbox" /> Áo</li>
                        <li><input type="checkbox" /> Quần</li>
                        <li><input type="checkbox" /> Giày</li>
                        <li><input type="checkbox" /> Phụ kiện</li>
                    </ul>
                </div>

                {/* Giá tiền */}
                <div className="filter-section">
                    <h4>Giá tiền</h4>
                    <ul>
                        <li><input type="radio" name="price" /> Dưới 200K</li>
                        <li><input type="radio" name="price" /> 200K - 500K</li>
                        <li><input type="radio" name="price" /> Trên 1 triệu</li>
                    </ul>
                </div>

                {/* Màu sắc */}
                <div className="filter-section">
                    <h4>Màu sắc</h4>
                    <div className="color-options">
                        <span className="color-box black"></span>
                        <span className="color-box white"></span>
                        <span className="color-box red"></span>
                        <span className="color-box blue"></span>
                    </div>
                </div>
            </aside>

            {/* Danh Sách Sản Phẩm */}
            <main className="product-list">
                <h3>Danh Sách Sản Phẩm</h3>
                <div className="products">
                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 1" />
                        <h4>Áo Thun Nam</h4>
                        <p className="price">250K <span className="old-price">300K</span></p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 2" />
                        <h4>Quần Jeans</h4>
                        <p className="price">450K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>

                    <div className="product">
                        <img src="https://via.placeholder.com/150" alt="Product 3" />
                        <h4>Giày Sneakers</h4>
                        <p className="price">1.200K</p>
                        <button className="button">Thêm vào giỏ</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductSidebar;