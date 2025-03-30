import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/Client/ClientLayout";
import Home from "./pages/Client/Home/Home";
import "./assets/styles/global.css"
import Shop from "./pages/Client/Shop/Shop";
import ContactPage from "./pages/Client/Contact/Contact";
import ProfilePage from "./pages/Client/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<ProfilePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
