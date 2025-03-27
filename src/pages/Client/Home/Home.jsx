import BannerSlider from "./Banner/banner";
import CategorySection from "./CategorySection/CategorySection";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import DealsSlider from "./DealsSlider/DealsSlider";
import Trends from "./Trends/Trends";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import BlogList from "./BlogList/BlogList";
import "../../../assets/styles/home.css";
import BrandLogos from "./BrandLogos/BrandLogos";
import ShopHeroSection from "../Shop/ShopHeroSection/ShopHeroSection";

const Home = () => {

    return (
        <>
            <ShopHeroSection />

            <CategorySection />

            <FeaturedProducts />

            <Trends />

            <DealsSlider />

            <CustomerReviews />

            <BlogList />

            <BrandLogos />

        </>
    );
};

export default Home;