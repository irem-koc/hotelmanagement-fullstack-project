import { Room } from "../../types/RoomType";

const RoomCard = ({ id, roomType, roomPrice, roomPhotoUrl }: Room) => {
  return (
    <div className="flex flex-col md:flex-row w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300">
      {/* Görsel */}
      <img
        src={roomPhotoUrl}
        alt={`${roomType} photo`}
        className="w-full md:w-1/3 h-56 md:h-auto object-cover"
      />
      {/* İçerik */}
      <div className="flex flex-col justify-between p-6 w-full">
        {/* Başlık ve Açıklama */}
        <div>
          <h3 className="text-xl font-bold text-gray-800">{roomType}</h3>
          <p className="text-sm text-gray-500 mt-1">Room ID: {id}</p>
          <p className="text-lg font-semibold text-green-600 mt-3">
            ${roomPrice}/night
          </p>
        </div>
        {/* Buton */}
        <button className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-600 transition-colors duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
