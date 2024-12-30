import { useState } from "react";
import DatePicker from "react-datepicker";
import { useGetRoomTypesQuery } from "../../hooks/rooms";
import CustomInput from "../CustomInput/CustomInput";

type Props = {};

const RoomFilter = (props: Props) => {
  const { data: categories } = useGetRoomTypesQuery();
  const [startDate, setStartDate] = useState(new Date());
  const [roomType, setRoomType] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  return (
    <div className="flex mx-auto items-center justify-between w-full md:w-3/4 bg-white bg-opacity-80 rounded-lg shadow-xl p-6 mt-8 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <label className="block text-lg font-medium">Room Type</label>
        <select
          value={roomType}
          onChange={handleRoomTypeChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={"all"}>All Products</option>
          {categories &&
            categories.map((category: string) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + String(category).slice(1)}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <label className="block text-lg font-medium">Check-in Date</label>
        <DatePicker
          selected={checkInDate}
          onChange={handleCheckInChange}
          customInput={<CustomInput />}
        />
      </div>

      <div className="flex flex-col w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <label className="block text-lg font-medium">Check-out Date</label>
        <DatePicker
          selected={checkOutDate}
          onChange={handleCheckOutChange}
          customInput={<CustomInput />}
        />
      </div>

      <div className="flex justify-center items-center w-full md:w-1/4">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-500 transition duration-300 w-full md:w-auto">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
