import { Outlet } from "react-router";
import AuthNavbar from "../components/AuthNavbar/AuthNavbar";
import Footer from "../components/Footer/Footer";

type Props = {};

const AuthLayout = (props: Props) => {
  return (
    <div>
      <AuthNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
