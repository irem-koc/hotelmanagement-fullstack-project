import { Outlet } from "react-router";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import Container from "../components/Container/Container";
import Footer from "../components/Footer/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default AdminLayout;
