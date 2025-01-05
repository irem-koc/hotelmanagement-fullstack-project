import { apiWithTag } from "../api/emptySplitApi";
import {
  AddBokingRequest,
  CancelBokingRequest,
} from "../types/BookingServiceTypes";

export const bookingApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation<AddBokingRequest, Partial<AddBokingRequest>>({
      query(body) {
        return {
          url: `/bookings/book-room/${body.roomId}/${body.userId}`,
          method: "POST",
          body: body.filter,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    cancelBooking: build.mutation<
      CancelBokingRequest,
      Partial<CancelBokingRequest>
    >({
      query({ id, token }) {
        return {
          url: `/bookings/delete-booking/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useAddBookingMutation, useCancelBookingMutation } = bookingApi;
