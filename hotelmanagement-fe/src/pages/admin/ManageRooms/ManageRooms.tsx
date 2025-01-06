import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Container from "../../../components/Container/Container";
import RoomCard from "../../../components/RoomCard/RoomCard";
import { useGetRoomTypesQuery, useGetRoomsQuery } from "../../../hooks/rooms";
import { Room } from "../../../types/RoomServiceTypes";

const ManageRooms = () => {
  const { data: categories } = useGetRoomTypesQuery();
  const { data: rooms, isSuccess } = useGetRoomsQuery();
  const navigate = useNavigate();
  const [roomsData, setRoomsData] = useState<Room[] | null>(null);
  const [roomType, setRoomType] = useState("all");

  useEffect(() => {
    if (rooms && rooms.roomList) {
      setRoomsData(rooms.roomList);
    }
  }, [rooms]);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomType(e.target.value);
    if (e.target.value === "all") {
      setRoomsData((prev) => {
        return rooms?.roomList;
      });
    } else {
      setRoomsData((prev) => {
        return rooms?.roomList?.filter(
          (room) => room.roomType === e.target.value
        );
      });
    }
  };

  return (
    <Container>
      <div className="flex flex-col mx-auto w-full md:w-3/4 bg-white bg-opacity-80 rounded-lg shadow-xl p-6 mt-8 space-y-6">
        <div className="flex justify-between items-center w-full p-4 bg-gray-50 rounded-lg shadow-sm">
          <div className="mb-4">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Room Type
            </label>
            <select
              name="roomType"
              value={roomType}
              onChange={handleChangeFilter}
              className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={"all"}>All Rooms</option>
              {categories &&
                categories.map((category: string) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      String(category).slice(1)}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={() => navigate("/admin/add-room")}
            className="p-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            + Add Room
          </button>
        </div>
        <div className="w-full mx-auto flex flex-col gap-8 my-8">
          {isSuccess && roomsData && roomsData.length > 0 ? (
            roomsData.map((room: Room) => (
              <RoomCard
                where={`/admin/edit-room/${room.id}`}
                key={room.id}
                {...room}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No rooms available.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ManageRooms;
