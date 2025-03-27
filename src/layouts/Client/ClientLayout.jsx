import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Client/Header";
import Footer from "../../components/Footer/Client/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;