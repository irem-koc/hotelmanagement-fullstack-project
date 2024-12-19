import { Link } from "react-router";

const MainNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/image.webp"
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <Link
            to="/main/home"
            className="text-2xl font-bold hover:text-blue-300 transition duration-300"
          >
            Hotel Management
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/main/home"
              className="hover:text-blue-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/main/rooms"
              className="hover:text-blue-300 transition duration-300"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/main/booking"
              className="hover:text-blue-300 transition duration-300"
            >
              Find my Booking
            </Link>
          </li>
          <li>
            <Link
              to="/main/profile"
              className="hover:text-blue-300 transition duration-300"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link to="" className="hover:text-blue-300 transition duration-300">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
