import ContactInfo from "../../components/home/ContactInfo";
import FAQ from "../../components/home/FAQ";
import HeroSection from "../../components/home/HeroSection";
import Reviews from "../../components/home/Reviews";
import ServicesOverview from "../../components/home/ServicesOverview";

const Home = () => {
    return (
        <div className="pt-24">
            <HeroSection />
            <ServicesOverview />
            <ContactInfo />
            <Reviews />
            <FAQ />
        </div>
    );
};

export default Home;