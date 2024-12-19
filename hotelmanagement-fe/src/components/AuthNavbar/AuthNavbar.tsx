import { Link } from "react-router";

const AuthNavbar = () => {
  return (
    <nav className="sticky top-0 bg-blue-600 text-white">
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
              className="hover:text-gray-200 hover:border-b-2 hover:border-gray-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/auth/rooms"
              className="hover:text-gray-200 hover:border-b-2 hover:border-gray-300 transition duration-300"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/auth/find-booking"
              className="hover:text-gray-200 hover:border-b-2 hover:border-gray-300 transition duration-300"
            >
              Find my Booking
            </Link>
          </li>
          <li>
            <Link
              to="/auth/login"
              className="hover:text-gray-200 hover:border-b-2 hover:border-gray-300 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/auth/register"
              className="hover:text-gray-200 hover:border-b-2 hover:border-gray-300 transition duration-300"
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
