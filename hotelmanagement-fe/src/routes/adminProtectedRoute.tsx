import { Navigate, Outlet } from "react-router";

const AdminProtectedRoute = ({ isAdmin }: { isAdmin: boolean }) => {
  return isAdmin ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default AdminProtectedRoute;
