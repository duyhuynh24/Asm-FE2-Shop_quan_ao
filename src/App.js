import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router";

// Import các trang
import Home from "./view/pages/admin/home/home";
import Product from "./view/pages/admin/product/product";
import Category from "./view/pages/admin/category/category";
import Order from "./view/pages/admin/oder/oder";
import User from "./view/pages/admin/user/user";
import Comment from "./view/pages/admin/comment/comment";
import SignIn from "./view/pages/admin/signin/signin";
import SignUp from "./view/pages/admin/signup/signup";
import EditCategory from "./view/pages/admin/category/edit-category/edit-category";
import AddCategory from "./view/pages/admin/category/add-category/add-category";
import AddProduct from "./view/pages/admin/product/add-product/add-product";
import EditProduct from "./view/pages/admin/product/edit-product/edit-product";
// Layout chung cho Admin
function AdminLayout() {
  return (
    <div>
     
      <Outlet /> {/* Quan trọng: Render nội dung các trang con */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} /> {/* Trang mặc định /admin */}
          <Route path="product" element={<Product />} />
          <Route path="AddProduct" element={<AddProduct />} />
          <Route path="EditProduct/:id" element={<EditProduct />} />
          <Route path="categories" element={<Category />} />
          <Route path="EditCategory" element={<EditCategory />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="orders" element={<Order />} />
          <Route path="users" element={<User />} />
          <Route path="comments" element={<Comment />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* Route 404 nếu nhập sai đường dẫn */}
        <Route path="*" element={<h2>Trang không tồn tại</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
