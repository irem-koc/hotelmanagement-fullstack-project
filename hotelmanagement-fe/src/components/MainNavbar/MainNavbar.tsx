import { Link, useLocation, useNavigate } from "react-router";
import { getFromLocalStorage } from "../../hooks/localStorage";
import { useLogoutUserMutation } from "../../services/users";

const MainNavbar = () => {
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();

  const token = getFromLocalStorage("user")?.token;
  const username = getFromLocalStorage("user")?.username;
  const location = useLocation();
  const getActiveClass = (path: string) =>
    location.pathname === path
      ? "bg-white text-blue-600"
      : "hover:text-white hover:border-b-2 hover:border-gray-300 transition duration-300 ";
  const handleLogout = () => {
    logout({ token })
      .unwrap()
      .then((result) => {
        result.statusCode === 200 && navigate("/auth/login");
      });
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
              className={`px-3 py-2 rounded ${getActiveClass("/main/home")}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/main/rooms"
              className={`px-3 py-2 rounded ${getActiveClass("/main/rooms")}`}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/main/booking"
              className={`px-3 py-2 rounded ${getActiveClass("/main/booking")}`}
            >
              Find my Booking
            </Link>
          </li>
          <li>
            <Link
              to="/main/profile"
              className={`px-3 py-2 rounded ${getActiveClass("/main/profile")}`}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              to=""
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

export default MainNavbar;
