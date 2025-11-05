import ContactInfo from "../../components/home/ContactInfo";
import HeroSection from "../../components/home/HeroSection";
import ServicesOverview from "../../components/home/ServicesOverview";

const Home = () => {
    return (
        <div className="pt-24">
            <HeroSection />
            <ServicesOverview />
            <ContactInfo />
        </div>
    );
};

export default Home;