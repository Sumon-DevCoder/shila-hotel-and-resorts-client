import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("/register") ||
    location.pathname.includes("/login");

  return (
    <div>
      {noHeaderFooter || <Navbar />}
      <div className="min-h-[calc(100vh-104px)]">
        <Outlet />
      </div>
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default MainLayout;
