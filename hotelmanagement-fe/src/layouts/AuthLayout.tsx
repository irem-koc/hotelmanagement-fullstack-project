import { Outlet } from "react-router";
import AuthNavbar from "../components/AuthNavbar/AuthNavbar";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default AuthLayout;
