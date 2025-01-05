import { useNavigate } from "react-router";

const BookingCard = ({ bookingData }) => {
  const navigate = useNavigate();
  const {
    id,
    bookingConfirmationCode,
    checkInDate,
    checkOutDate,
    totalNumOfGuests,
  } = bookingData;

  if (!bookingData) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full space-y-4">
      <div className="space-y-2">
        <p>
          <strong className="font-semibold">Confirmation Code:</strong>{" "}
          {bookingConfirmationCode}
        </p>
        <p>
          <strong className="font-semibold">Check-in Date:</strong>{" "}
          {checkInDate}
        </p>
        <p>
          <strong className="font-semibold">Check-out Date:</strong>{" "}
          {checkOutDate}
        </p>
        <p>
          <strong className="font-semibold">Number of Guests:</strong>{" "}
          {totalNumOfGuests}
        </p>
      </div>
      <button
        onClick={() =>
          navigate(`/admin/edit-booking/${bookingConfirmationCode}`)
        }
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Manage Booking
      </button>
    </div>
  );
};

export default BookingCard;
