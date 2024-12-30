import Container from "../../../components/Container/Container";
import RoomCard from "../../../components/RoomCard/RoomCard";
import RoomFilter from "../../../components/RoomFilter/RoomFilter";
import { useGetRoomsQuery } from "../../../hooks/rooms";
import { Room } from "../../../types/RoomType";

const Rooms = () => {
  const { data: rooms, isLoading, error } = useGetRoomsQuery();

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading rooms...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Something went wrong while fetching rooms.
      </p>
    );
  }

  return (
    <Container>
      <RoomFilter />
      <div className="w-3/4 mx-auto flex flex-col gap-8 my-8">
        {rooms?.roomList && rooms.roomList.length > 0 ? (
          rooms.roomList.map((room: Room) => (
            <RoomCard key={room.id} {...room} />
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

export default Rooms;
