import { Link, useLocation } from "react-router";
import { getFromLocalStorage } from "../../hooks/localStorage";

const AdminNavbar = () => {
  const username = getFromLocalStorage("user").username;
  const location = useLocation();
  const getActiveClass = (path: string) =>
    location.pathname === path
      ? "bg-white text-blue-600"
      : "hover:text-white hover:border-b-2 hover:border-gray-300 transition duration-300 ";
  const handleLogout = () => {
    // localStorage.removeItem("user");
  };
  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/image.webp"
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full"
          />
          <Link
            to="/admin/home"
            className="text-2xl font-bold hover:text-blue-300 transition duration-300"
          >
            Hotel Management
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/admin/home"
              className={`px-3 py-2 rounded ${getActiveClass("/admin/home")}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/admin/rooms"
              className={`px-3 py-2 rounded ${getActiveClass("/admin/rooms")}`}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/admin/find-booking"
              className={`px-3 py-2 rounded ${getActiveClass(
                "/admin/find-booking"
              )}`}
            >
              Find my Booking
            </Link>
          </li>
          <li>
            <Link
              to="/admin/profile"
              className={`px-3 py-2 rounded ${getActiveClass(
                "/admin/profile"
              )}`}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              to="/auth/login"
              className="px-3 py-2 rounded hover:text-white transition duration-300"
            >
              Logout
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-10 h-10 bg-white text-blue-800 rounded-full font-bold">
            {username[0]}
          </div>
          <span className="hidden sm:block text-sm font-medium">
            Welcome, {username}!
          </span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
