import { Link, useLocation } from "react-router";

const AuthNavbar = () => {
  const location = useLocation();

  const getActiveClass = (path: string) =>
    location.pathname === path
      ? "bg-white text-blue-600"
      : "hover:text-gray-200 hover:border-b-2 hover:border-gray-300 transition duration-300";

  return (
    <nav className="max-h-25 bg-blue-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <img
            src="/image.webp"
            alt="Hotel Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <Link
            to="/auth/home"
            className="text-white text-2xl font-bold hover:text-blue-300 transition duration-300"
          >
            Hotel Management
          </Link>
        </div>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/auth/home"
              className={`px-3 py-2 rounded ${getActiveClass("/auth/home")}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/auth/rooms"
              className={`px-3 py-2 rounded ${getActiveClass("/auth/rooms")}`}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/auth/find-booking"
              className={`px-3 py-2 rounded ${getActiveClass(
                "/auth/find-booking"
              )}`}
            >
              Find my Booking
            </Link>
          </li>
          <li>
            <Link
              to="/auth/login"
              className={`px-3 py-2 rounded ${getActiveClass("/auth/login")}`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/auth/register"
              className={`px-3 py-2 rounded ${getActiveClass(
                "/auth/register"
              )}`}
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AuthNavbar;
