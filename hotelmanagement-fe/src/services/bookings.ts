import { apiWithTag } from "../api/emptySplitApi";
import { AddBokingRequest } from "../types/BookingServiceTypes";

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
  }),
});

export const { useAddBookingMutation } = bookingApi;
