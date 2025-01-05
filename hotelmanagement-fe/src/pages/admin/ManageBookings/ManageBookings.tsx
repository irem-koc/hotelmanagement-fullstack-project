import { useEffect, useState } from "react";
import BookingCard from "../../../components/BookingCard/BookingCard";
import { useGetAllBookingsQuery } from "../../../hooks/bookings";
import { getFromLocalStorage } from "../../../hooks/localStorage";

const ManageBookings = () => {
  const [bookingCode, setBookingCode] = useState("");
  const [bookings, setBookings] = useState(null);

  const token = getFromLocalStorage("user")?.token;

  const { data: allData, isSuccess } = useGetAllBookingsQuery(token);
  useEffect(() => {
    if (allData && allData.bookingList) {
      setBookings(allData.bookingList);
    }
  }, [allData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setBookingCode(inputValue);
    if (inputValue.length > 0) {
      setBookings((prev) => {
        return allData.bookingList?.filter((item) =>
          item.bookingConfirmationCode
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        );
      });
    } else {
      setBookings(allData.bookingList);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <label>Find by booking code: </label>
        <input
          value={bookingCode}
          onChange={handleChange}
          type="text"
          placeholder="Search for booking"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {isSuccess && bookings && bookings?.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-6">
          {bookings?.map((data, i) => (
            <BookingCard key={i} bookingData={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
