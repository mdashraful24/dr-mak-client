import HeroSection from "../../components/home/HeroSection";
import ServicesOverview from "../../components/home/ServicesOverview";

const Home = () => {
    return (
        <div className="pt-24">
            <HeroSection />
            <ServicesOverview />
        </div>
    );
};

export default Home;