const BookingCard = ({ bookingData }) => {
  const {
    id,
    bookingConfirmationCode,
    checkInDate,
    checkOutDate,
    totalNumOfGuests,
  } = bookingData;
  console.log(bookingData, "bookingDatabookingData");

  if (!bookingData) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mt-8">
      <div className="mb-4">
        <p>
          <strong>Confirmation Code:</strong> {bookingConfirmationCode}
        </p>
        <p>
          <strong>Check-in Date:</strong> {checkInDate}
        </p>
        <p>
          <strong>Check-out Date:</strong> {checkOutDate}
        </p>
        <p>
          <strong>Number of Guests:</strong> {totalNumOfGuests}
        </p>
      </div>
      <button onClick={() => console.log("id -> ")}>Manage Booking</button>
    </div>
  );
};

export default BookingCard;
