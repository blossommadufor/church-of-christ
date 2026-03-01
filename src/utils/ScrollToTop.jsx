import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop — place once inside <Router> to scroll to the top
 * of the window on every route change.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [pathname]);
    return null;
};

export default ScrollToTop;
