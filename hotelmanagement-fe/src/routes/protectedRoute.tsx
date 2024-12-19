import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  isAuthorized: boolean;
}

const ProtectedRoute = ({ isAuthorized }: ProtectedRouteProps) => {
  return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
