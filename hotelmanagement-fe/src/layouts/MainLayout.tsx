import { Outlet } from "react-router";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";
import MainNavbar from "../components/MainNavbar/MainNavbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
