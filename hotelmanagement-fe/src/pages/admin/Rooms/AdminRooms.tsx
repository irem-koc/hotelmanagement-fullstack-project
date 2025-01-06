import { useEffect, useState } from "react";
import Container from "../../../components/Container/Container";
import RoomCard from "../../../components/RoomCard/RoomCard";
import RoomFilter from "../../../components/RoomFilter/RoomFilter";
import { useGetRoomsQuery } from "../../../hooks/rooms";
import { Room } from "../../../types/RoomServiceTypes";

const AdminRooms = () => {
  const { data: rooms, isSuccess } = useGetRoomsQuery();
  const [roomsData, setRoomsData] = useState<Room[] | null>(null);

  useEffect(() => {
    if (rooms && rooms.roomList) {
      setRoomsData(rooms.roomList);
    }
  }, [rooms]);

  const handleRoomsData = (data: Room[]) => {
    setRoomsData(data);
  };

  return (
    <Container>
      <RoomFilter handleData={handleRoomsData} />
      <div className="w-3/4 mx-auto flex flex-col gap-8 my-8">
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
    </Container>
  );
};

export default AdminRooms;
