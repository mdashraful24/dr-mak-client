import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const PublicLayout = () => {
    return (
        <>
            <ScrollToTop />
            <div className="page-fade">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default PublicLayout;
