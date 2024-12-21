// routes.tsx or where your routes are defined
import { Navigate, RouteObject } from "react-router";
import { useAppSelector } from "../hooks/hook"; // Import useAppSelector hook
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./protectedRoute";

// Components
import FindBooking from "../pages/auth/FindBooking/FindBooking";
import AuthHome from "../pages/auth/Home/Home";
import Rooms from "../pages/auth/Rooms/Rooms";

import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Booking from "../pages/main/Booking/Booking";
import MainHome from "../pages/main/Home/Home";
import Profile from "../pages/main/Profile/Profile";
import MainRooms from "../pages/main/Rooms/Rooms";
import { isAuthenticated } from "../utils/auth";

// Create a wrapper component to get authentication status
const AuthRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector((state) => state.users.token);
  const isAuthorized = isAuthenticated(token);
  return <>{children(isAuthorized)}</>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthRouteWrapper>
        {(isAuthorized) => (
          <Navigate to={isAuthorized ? "/main/home" : "/auth/home"} replace />
        )}
      </AuthRouteWrapper>
    ),
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "home", element: <AuthHome /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "find-booking", element: <FindBooking /> },
      { path: "rooms", element: <Rooms /> },
    ],
  },
  {
    path: "main",
    element: (
      <AuthRouteWrapper>
        {(isAuthorized) => <ProtectedRoute isAuthorized={isAuthorized} />}
      </AuthRouteWrapper>
    ),
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          { path: "home", element: <MainHome /> },
          { path: "booking", element: <Booking /> },
          { path: "profile", element: <Profile /> },
          { path: "rooms", element: <MainRooms /> },
        ],
      },
    ],
  },
];

export default routes;
