import ShopHeroSection from "./ShopHeroSection/ShopHeroSection";
import ProductSidebar from "./ProductSidebar/ProductSidebar";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import DealsSlider from "../Home/DealsSlider/DealsSlider";
import CustomerReviews from "../Home/CustomerReviews/CustomerReviews";

const Shop = () => {

    return (
        <>
            <ShopHeroSection/>

            <ProductSidebar/>

            <FeaturedProducts/>

            <DealsSlider/>

            <CustomerReviews/>
        </>
    );
};

export default Shop;