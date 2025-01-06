import { useState } from "react";
import { useNavigate } from "react-router";
import { getFromLocalStorage } from "../../../hooks/localStorage";
import {
  useLazyGetRoomTypesQuery,
  useLazyGetRoomsQuery,
} from "../../../hooks/rooms";
import { useAddRoomMutation } from "../../../services/rooms";

const AddRoom = () => {
  const [trigger] = useLazyGetRoomsQuery();
  const [triggerRoomTypes] = useLazyGetRoomTypesQuery();
  const [addRoomMutation] = useAddRoomMutation();
  const token = getFromLocalStorage("user")?.token;
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    photo: "",
    roomType: "",
    roomDescription: "",
    roomPrice: "",
  });

  const handleChangeRoom = (e) => {
    setRoom((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      let body = {
        request: { ...room, roomPrice: parseInt(room.roomPrice, 10) }, // Ensure roomPrice is a number
        token,
      };
      const result = await addRoomMutation(body).unwrap();

      if (result.statusCode === 200) {
        trigger(); // Refresh room list
        triggerRoomTypes();
        navigate("/admin/manage-rooms"); // Navigate to manage rooms page
      }
    } catch (error) {
      console.log("first", {
        request: { ...room, roomPrice: parseInt(room.roomPrice, 10) }, // Ensure roomPrice is a number
        token,
      });
      console.error("Error adding room:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Room
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="roomPhoto"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Photo
            </label>
            <img
              src={room.photo}
              alt={`${room.roomType} photo`}
              className="w-full h-48 object-cover rounded-md mb-3 border"
            />
            <input
              onChange={handleChangeRoom}
              name="photo"
              type="text"
              id="photo"
              value={room.photo}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="roomType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Type
            </label>
            <input
              onChange={handleChangeRoom}
              name="roomType"
              type="text"
              id="roomType"
              value={room.roomType}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="roomDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Description
            </label>
            <textarea
              onChange={handleChangeRoom}
              name="roomDescription"
              id="roomDescription"
              rows={4}
              value={room.roomDescription}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="roomPrice"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Room Price
            </label>
            <input
              onChange={handleChangeRoom}
              name="roomPrice"
              type="number"
              id="roomPrice"
              value={room.roomPrice}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-around space-x-4">
            <button
              onClick={handleSaveChanges}
              type="button"
              className="w-full px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
