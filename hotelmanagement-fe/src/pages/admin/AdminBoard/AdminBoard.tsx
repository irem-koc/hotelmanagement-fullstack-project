import { Link } from "react-router";
import { getFromLocalStorage } from "../../../hooks/localStorage";

const AdminBoard = () => {
  const { username } = getFromLocalStorage("user");
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Welcome, {username} Admin!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/manage-bookings"
          className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
        >
          Manage Bookings
        </Link>
        <Link
          to="/admin/manage-rooms"
          className="text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
        >
          Manage Rooms
        </Link>
      </div>
    </div>
  );
};

export default AdminBoard;
