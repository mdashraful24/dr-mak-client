import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) return;
        
        window.scrollTo(0, 0); // window.scrollTo({ top: 0, behavior: "smooth" });
    }, [hash, pathname]);

    return null;
};

export default ScrollToTop;
