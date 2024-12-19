import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import MainNavbar from "../components/MainNavbar/MainNavbar";

const MainLayout = () => {
  return (
    <div>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
