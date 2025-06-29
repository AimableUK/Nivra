import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "Nivra";

    if (location.pathname === "/") {
      title = "Home - Nivra";
    } else if (location.pathname === "/aboutus") {
      title = "AboutUs - Nivra";
    } else if (location.pathname === "/settings") {
      title = "Settings - Nivra";
    } else {
      title = "404 Page Not Found";
    }

    document.title = title;
  }, [location]);

  return null;
};

export default PageTitleUpdater;
