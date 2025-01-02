const AdminFindBooking = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Search for booking"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition duration-300">
        Ara
      </button>
    </div>
  );
};

export default AdminFindBooking;
