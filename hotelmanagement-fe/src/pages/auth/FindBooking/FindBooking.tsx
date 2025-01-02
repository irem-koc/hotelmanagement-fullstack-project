import { useState } from "react";
import BookingDetailsUI from "../../../components/BookingDetailsUI/BookingDetailsUI";
import { useLazyGetBookingByConfirmationCodeQuery } from "../../../hooks/bookings";

const FindBooking = () => {
  const [bookingCode, setBookingCode] = useState("");
  const [trigger, { data, isSuccess }] =
    useLazyGetBookingByConfirmationCodeQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingCode(e.target.value);
  };

  const handleSearch = () => {
    if (bookingCode.trim()) {
      trigger(bookingCode);
      setBookingCode("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <input
        value={bookingCode}
        onChange={handleChange}
        type="text"
        placeholder="Search for booking"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition duration-300"
      >
        Ara
      </button>
      {isSuccess && data && <BookingDetailsUI bookingData={data} />}
    </div>
  );
};

export default FindBooking;
