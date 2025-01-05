import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import BookingDetailsUI from "../../../components/BookingDetailsUI/BookingDetailsUI";
import {
  useLazyGetAllBookingsQuery,
  useLazyGetBookingByConfirmationCodeQuery,
} from "../../../hooks/bookings";
import { getFromLocalStorage } from "../../../hooks/localStorage";
import { useCancelBookingMutation } from "../../../services/bookings";

type Props = {};

const EditBooking = (props: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [trigger, { data, isSuccess }] =
    useLazyGetBookingByConfirmationCodeQuery();
  const [triggerGetAllBookingsQuery] = useLazyGetAllBookingsQuery();

  const [cancelBookingMutation, { isSuccess: isCancelled }] =
    useCancelBookingMutation();
  const token = getFromLocalStorage("user")?.token;
  useEffect(() => {
    trigger(params.bookingConfirmationCode);
  }, [params.bookingConfirmationCode]);

  const handleCancelBooking = () => {
    cancelBookingMutation({ id: data.booking.id, token })
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          navigate("/admin/manage-bookings");
          triggerGetAllBookingsQuery(token);
        }
      });
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6 space-y-6">
      {isSuccess && data && !isCancelled && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl space-y-4">
          <BookingDetailsUI bookingData={data} />
          <button
            onClick={handleCancelBooking}
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-red-800 transition duration-300 shadow-md"
          >
            İptal Et
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBooking;
