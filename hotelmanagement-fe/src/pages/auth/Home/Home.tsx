import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Container from "../../../components/Container/Container";
import HotelServices from "../../../components/HotelServices/HotelServices";
import RoomCard from "../../../components/RoomCard/RoomCard";
import RoomFilter from "../../../components/RoomFilter/RoomFilter";
import { Room } from "../../../types/RoomType";

const Home = () => {
  const [roomsData, setRoomsData] = useState<Room[] | null>(null);

  const handleRoomsData = (data: Room[]) => {
    setRoomsData(data);
  };
  return (
    <Container>
      <div className="relative w-full h-screen pt-24">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/banner.webp"
          alt="Hotel Management Banner"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold/40 to-black/60"></div>
        <div className="relative z-0 flex flex-col items-center justify-center h-full space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            <span className="bg-gradient-to-r from-indigo-700 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Otel Yönetim Sistemine{" "}
            </span>
            Hoş Geldiniz
          </h1>
          <p className="text-lg md:text-xl bg-gradient-to-r from-white via-orange-400 to-green-700 bg-clip-text text-transparent text-center">
            Konfor ve özenle dolu bir dünyaya adım atın
          </p>
        </div>
      </div>
      <RoomFilter handleData={handleRoomsData} />
      <div className="w-3/4 mx-auto flex flex-col gap-8 my-8">
        {roomsData &&
          roomsData.length > 0 &&
          roomsData.map((room: Room) => (
            <RoomCard where="/auth/login" key={room.id} {...room} />
          ))}
      </div>
      <HotelServices />
    </Container>
  );
};

export default Home;
