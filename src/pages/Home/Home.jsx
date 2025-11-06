import Appointment from "../../components/home/Appointment";
import ContactInfo from "../../components/home/ContactInfo";
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
            <Appointment />
        </div>
    );
};

export default Home;