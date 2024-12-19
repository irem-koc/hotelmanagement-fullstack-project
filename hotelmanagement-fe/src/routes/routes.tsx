import { Navigate, RouteObject } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./protectedRoute";

// Components
import FindBooking from "../pages/auth/FindBooking/FindBooking";
import AuthHome from "../pages/auth/Home/Home";
import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Rooms from "../pages/auth/Rooms/Rooms";

import Booking from "../pages/main/Booking/Booking";
import MainHome from "../pages/main/Home/Home";
import Profile from "../pages/main/Profile/Profile";
import MainRooms from "../pages/main/Rooms/Rooms";

//TODO: change it
const isAuthorized = true;

const rootRedirect: RouteObject = {
  path: "/",
  element: isAuthorized ? (
    <Navigate to="/main/home" replace />
  ) : (
    <Navigate to="/auth/home" replace />
  ),
};

const routes: RouteObject[] = [
  rootRedirect,
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
    element: <ProtectedRoute isAuthorized={isAuthorized} />,
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
