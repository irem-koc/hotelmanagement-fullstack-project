import { format } from "date-fns";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { getFromLocalStorage } from "../../../hooks/localStorage";
import { useGetRoomDetailQuery } from "../../../hooks/rooms";
import { useAddBookingMutation } from "../../../services/bookings";
const RoomDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = getFromLocalStorage("user")?.id;
  const token = getFromLocalStorage("user")?.token;
  const { data } = useGetRoomDetailQuery(params.roomId);
  const [addBooking] = useAddBookingMutation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    numOfChildren: "",
    numOfAdults: "",
    checkInDate: null,
    checkOutDate: null,
  });
  const handleChangeFilter = (name: string, value: any) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  if (!data)
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;

  const { roomType, roomPrice, roomPhotoUrl, roomDescription } = data.room;

  const handleBookNow = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const handleAddBooking = async () => {
    try {
      const formattedFilter = {
        numOfAdults: parseInt(filter.numOfAdults),
        numOfChildren: parseInt(filter.numOfChildren),
        checkInDate: filter.checkInDate
          ? format(filter.checkInDate, "yyyy-MM-dd")
          : null,
        checkOutDate: filter.checkOutDate
          ? format(filter.checkOutDate, "yyyy-MM-dd")
          : null,
      };
      const response = await addBooking({
        roomId: params.roomId,
        userId: userId,
        filter: formattedFilter,
        token: token,
      }).unwrap();
      setConfirmationCode(response.bookingConfirmationCode);
      closeModal();
    } catch (error) {
      console.error("Booking Failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      {confirmationCode && (
        <div className="mt-2 p-4 bg-green-100 text-green-800 rounded-md">
          Booking confirmed! Your confirmation code is:{" "}
          <span className="font-bold">{confirmationCode}</span>
        </div>
      )}
      <img
        src={roomPhotoUrl}
        alt={`${roomType} photo`}
        className="w-full mt-3 h-64 object-cover rounded-md"
      />
      <h1 className="text-2xl font-bold mt-4">{roomType} Room</h1>
      <p className="text-gray-600 mt-2">{roomDescription}</p>
      <p className="text-xl font-semibold text-gray-800 mt-4">
        Price: <span className="text-green-500">${roomPrice?.toFixed(2)}</span>
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-all"
        >
          Go Back
        </button>
        <button
          onClick={handleBookNow}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
        >
          Book Now
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Check-in Date:
                </label>
                <DatePicker
                  isClearable
                  dateFormat={"dd/MM/yyyy"}
                  locale={"tr"}
                  selected={filter.checkInDate}
                  onChange={(date) => handleChangeFilter("checkInDate", date)}
                  customInput={<CustomInput />}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Check-out Date:
                </label>
                <DatePicker
                  isClearable
                  dateFormat={"dd/MM/yyyy"}
                  locale={"tr"}
                  selected={filter.checkOutDate}
                  onChange={(date) => handleChangeFilter("checkOutDate", date)}
                  customInput={<CustomInput />}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Adults:</label>
                <input
                  onChange={(e) =>
                    handleChangeFilter(e.target.name, e.target.value)
                  }
                  value={filter.numOfAdults}
                  name="numOfAdults"
                  type="number"
                  min={1}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Children:</label>
                <input
                  onChange={(e) =>
                    handleChangeFilter(e.target.name, e.target.value)
                  }
                  value={filter.numOfChildren}
                  name="numOfChildren"
                  type="number"
                  min={0}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1"
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
                onClick={handleAddBooking}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
