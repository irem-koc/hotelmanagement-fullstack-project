import { format } from "date-fns";
import { tr } from "date-fns/locale/tr";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import {
  useGetRoomTypesQuery,
  useLazyGetAvailableRoomsByDateAndTypeQuery,
} from "../../hooks/rooms";
import CustomInput from "../CustomInput/CustomInput";
registerLocale("tr", tr);
type Props = {
  handleData: (data: any) => void;
};

const RoomFilter = ({ handleData }: Props) => {
  const { data: categories } = useGetRoomTypesQuery();

  const [trigger] = useLazyGetAvailableRoomsByDateAndTypeQuery();

  const [filter, setFilter] = useState({
    roomType: "all",
    checkInDate: null,
    checkOutDate: null,
  });
  const handleChangeFilter = (name: string, value: Date | null) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const formattedFilter = {
      ...filter,
      checkInDate: filter.checkInDate
        ? format(filter.checkInDate, "yyyy-MM-dd")
        : null,
      checkOutDate: filter.checkOutDate
        ? format(filter.checkOutDate, "yyyy-MM-dd")
        : null,
    };
    trigger(formattedFilter)
      .unwrap()
      .then((response) => {
        handleData(response.roomList);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  };

  return (
    <div className="flex mx-auto items-center justify-between w-full md:w-3/4 bg-white bg-opacity-80 rounded-lg shadow-xl p-6 mt-8 space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex flex-col w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <label className="block text-lg font-medium">Room Type</label>
        <select
          name="roomType"
          value={filter?.roomType}
          onChange={(e) => handleChangeFilter(e.target.name, e.target.value)}
          className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={"all"}>All Rooms</option>
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
          isClearable
          dateFormat={"dd/MM/YYYY"}
          locale={"tr"}
          name="checkInDate"
          selected={filter.checkInDate}
          onChange={(date) => handleChangeFilter("checkInDate", date)}
          customInput={<CustomInput />}
        />
      </div>

      <div className="flex flex-col w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-sm">
        <label className="block text-lg font-medium">Check-out Date</label>
        <DatePicker
          isClearable
          dateFormat={"dd/MM/YYYY"}
          locale={"tr"}
          name="checkOutDate"
          selected={filter.checkOutDate}
          onChange={(date) => handleChangeFilter("checkOutDate", date)}
          customInput={<CustomInput />}
        />
      </div>

      <div className="flex justify-center items-center w-full md:w-1/4">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-500 transition duration-300 w-full md:w-auto"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default RoomFilter;
