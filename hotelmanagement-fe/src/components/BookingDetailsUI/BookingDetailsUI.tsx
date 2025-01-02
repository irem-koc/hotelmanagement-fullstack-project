const BookingDetailsUI = ({ bookingData }) => {
  if (!bookingData || !bookingData.booking) return null;

  const {
    booking: {
      bookingConfirmationCode,
      checkInDate,
      checkOutDate,
      numOfAdults,
      numOfChildren,
      user: { name, email, phoneNumber },
      room: { roomType, roomPhotoUrl, roomDescription },
    },
  } = bookingData;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full mt-8">
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
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
          <strong>Number of Adults:</strong> {numOfAdults}
        </p>
        <p>
          <strong>Number of Children:</strong> {numOfChildren}
        </p>
      </div>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-4">Booker Details</h2>
      <div className="mb-4">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
      </div>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-4">Room Details</h2>
      <div className="mb-4">
        <p>
          <strong>Room Type:</strong> {roomType}
        </p>
        <p>
          <strong>Description:</strong> {roomDescription}
        </p>
        <img
          src={roomPhotoUrl}
          alt="Room"
          className="w-full h-64 object-cover rounded-lg mt-4"
        />
      </div>
    </div>
  );
};

export default BookingDetailsUI;
