import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../../../hooks/localStorage";
import { useGetUserProfileHistoryQuery } from "../../../hooks/users";
import { useEditUserProfileMutation } from "../../../services/users";
import { UserProfile } from "../../../types/UserServiceTypes";

const Profile = () => {
  const token = getFromLocalStorage("user")?.token;
  const password = getFromLocalStorage("user")?.password;
  const id = getFromLocalStorage("user")?.id;

  const { data, isLoading, isSuccess, refetch } =
    useGetUserProfileHistoryQuery(token);
  const [editUserMutation] = useEditUserProfileMutation();

  const user: UserProfile | undefined = data?.user;

  const [userProfile, setUserProfile] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    if (data?.user && isSuccess) {
      setUserProfile({
        email: user.email || "",
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        password: password || "",
      });
    }
  }, [data, user, password, isSuccess]);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = () => {
    editUserMutation({
      id,
      token,
      email: userProfile.email,
      name: userProfile.name,
      phoneNumber: userProfile.phoneNumber,
      password: userProfile.password,
    })
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          refetch();
          setModalOpen(false);
        }
      });
  };

  const handleBookNow = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setUserProfile({
      email: user.email || "",
      name: user.name || "",
      phoneNumber: user.phoneNumber || "",
      password: password || "",
    });
  };

  if (!data) {
    return;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">My Profile Information</h2>
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleBookNow}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Düzenle
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Hesabı Sil
            </button>
          </div>
        </div>
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
                  {/* <div className="flex space-x-4 mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                      Edit Booking
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                      Delete Booking
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  value={userProfile.email}
                  onChange={handleChangeFilter}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="E-posta adresinizi giriniz"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userProfile.name}
                  onChange={handleChangeFilter}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Adınızı ve soyadınızı giriniz"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefon Numarası <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={userProfile.phoneNumber}
                  onChange={handleChangeFilter}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Telefon numaranızı giriniz"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Şifre <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userProfile.password}
                  required
                  minLength={5}
                  onChange={handleChangeFilter}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Şifrenizi giriniz"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-all mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
