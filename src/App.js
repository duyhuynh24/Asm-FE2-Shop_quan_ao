import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/Client/ClientLayout";
import Home from "./pages/Client/Home/Home";
import "./assets/styles/global.css"
import Shop from "./pages/Client/Shop/Shop";
import Login from "./pages/Client/Login/login";
import Register from "./pages/Client/Register/register";
import Cart from "./pages/Client/Cart/cart";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
 
       
      
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
