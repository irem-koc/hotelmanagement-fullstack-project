import { getFromLocalStorage } from "../../../hooks/localStorage";
import { useGetUserProfileHistoryQuery } from "../../../hooks/users";
import { UserProfile } from "../../../types/UserServiceTypes";

const Profile = () => {
  const token = getFromLocalStorage("user")?.token;
  const { data } = useGetUserProfileHistoryQuery(token);

  if (!data) {
    return null;
  }

  const { user }: { user: UserProfile } = data;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">My Profile Information</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phoneNumber}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Booking History</h2>
        {user.bookings.length > 0 ? (
          <div className="space-y-4">
            {user.bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
              >
                <img
                  src={booking.room.roomPhotoUrl}
                  alt={booking.room.roomType}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p>
                    <strong>Check-in:</strong> {booking.checkInDate}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {booking.checkOutDate}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.totalNumOfGuests} (Adults:{" "}
                    {booking.numOfAdults}, Children: {booking.numOfChildren})
                  </p>
                  <p>
                    <strong>Room Type:</strong> {booking.room.roomType}
                  </p>
                  <p>
                    <strong>Price:</strong> ${booking.room.roomPrice.toFixed(2)}
                  </p>
                  <p>
                    <strong>Description:</strong> {booking.room.roomDescription}
                  </p>
                  <p>
                    <strong>Confirmation Code:</strong>{" "}
                    {booking.bookingConfirmationCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
