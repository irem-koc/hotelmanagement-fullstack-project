import { Navigate, RouteObject } from "react-router";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./protectedRoute";

import { getFromLocalStorage } from "../hooks/localStorage";
import AdminBoard from "../pages/admin/AdminBoard/AdminBoard";
import AdminFindBooking from "../pages/admin/FindBooking/AdminFindBooking";
import AdminHome from "../pages/admin/Home/AdminHome";
import AdminRooms from "../pages/admin/Rooms/AdminRooms";
import FindBooking from "../pages/auth/FindBooking/FindBooking";
import AuthHome from "../pages/auth/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Rooms from "../pages/auth/Rooms/Rooms";
import Booking from "../pages/main/Booking/Booking";
import MainHome from "../pages/main/Home/Home";
import Profile from "../pages/main/Profile/Profile";
import MainRooms from "../pages/main/Rooms/Rooms";
import AdminProtectedRoute from "./AdminProtectedRoute";

const AuthRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = getFromLocalStorage("user");
  const isAuthorized = !!user?.token;
  const isAdmin = user?.role === "ADMIN";

  return <>{children({ isAuthorized, isAdmin })}</>;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthRouteWrapper>
        {({ isAuthorized, isAdmin }) => {
          if (isAdmin) return <Navigate to="/admin/home" replace />;
          if (isAuthorized) return <Navigate to="/main/home" replace />;
          return <Navigate to="/auth/home" replace />;
        }}
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
        {({ isAuthorized }) => <ProtectedRoute isAuthorized={isAuthorized} />}
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
  {
    path: "admin",
    element: (
      <AuthRouteWrapper>
        {({ isAuthorized, isAdmin }) => (
          <AdminProtectedRoute isAdmin={isAdmin} />
        )}
      </AuthRouteWrapper>
    ),
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { path: "home", element: <AdminHome /> },
          { path: "profile", element: <AdminBoard /> },
          { path: "rooms", element: <AdminRooms /> },
          { path: "find-booking", element: <AdminFindBooking /> },
        ],
      },
    ],
  },
];

export default routes;
