import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFromLocalStorage } from "../../../hooks/localStorage";
import {
  useGetRoomDetailQuery,
  useLazyGetRoomsQuery,
} from "../../../hooks/rooms";
import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../../../services/rooms";

const EditRoom = () => {
  const params = useParams();
  const { data: room, isLoading, refetch } = useGetRoomDetailQuery(params.id);
  const [trigger] = useLazyGetRoomsQuery();
  const [updateRoomMutation] = useUpdateRoomMutation();
  const [deleteRoomMutation] = useDeleteRoomMutation();
  const token = getFromLocalStorage("user")?.token;
  const navigate = useNavigate();
  const [updatedRoom, setUpdatedRoom] = useState({
    photo: room?.room?.roomPhotoUrl || "",
    roomType: room?.room?.roomType || "",
    roomDescription: room?.room?.roomDescription || "",
    roomPrice: room?.room?.roomPrice || "",
  });

  useEffect(() => {
    if (room?.room) {
      setUpdatedRoom({
        photo: room.room.roomPhotoUrl || "",
        roomType: room.room.roomType || "",
        roomDescription: room.room.roomDescription || "",
        roomPrice: room.room.roomPrice || "",
      });
    }
  }, [room]);

  const handleChangeRoom = (e) => {
    setUpdatedRoom((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    try {
      updateRoomMutation({
        request: { ...updatedRoom, roomPrice: parseInt(updatedRoom.roomPrice) },
        id: parseInt(params.id),
        token,
      })
        .unwrap()
        .then((result) => {
          if (result.statusCode === 200) {
            trigger();
            refetch();
            navigate("/admin/manage-rooms");
          }
        });
    } catch (error) {}
  };

  const handleDeleteRoom = () => {
    deleteRoomMutation({ id: parseInt(params.id), token })
      .unwrap()
      .then((result) => {
        if (result.statusCode === 200) {
          trigger();
          navigate("/admin/manage-rooms");
        }
      });
  };
  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (!room) {
    return (
      <div className="text-center text-lg text-red-500">
        Room not found or data is unavailable.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Room
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
              src={updatedRoom.photo}
              alt={`${updatedRoom.roomType} photo`}
              className="w-full h-48 object-cover rounded-md mb-3 border"
            />
            <input
              onChange={handleChangeRoom}
              name="photo"
              type="text"
              id="photo"
              value={updatedRoom.photo}
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
              value={updatedRoom.roomType}
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
              value={updatedRoom.roomDescription}
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
              value={updatedRoom.roomPrice}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-around space-x-4">
            <button
              onClick={handleDeleteRoom}
              type="button"
              className="w-full px-6 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete Room
            </button>
            <button
              onClick={handleSaveChanges}
              type="button"
              className="w-full px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Edit Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
