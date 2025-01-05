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
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <input
          value={bookingCode}
          onChange={handleChange}
          type="text"
          placeholder="Search for booking"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-md"
        >
          Ara
        </button>
      </div>

      {isSuccess && data && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-4">
          <BookingDetailsUI bookingData={data} />
        </div>
      )}
    </div>
  );
};

export default FindBooking;
