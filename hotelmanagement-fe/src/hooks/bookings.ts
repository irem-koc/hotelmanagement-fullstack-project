import { apiWithTag } from "../api/emptySplitApi";

export const bookingsApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getBookingByConfirmationCode: build.query({
      query: (code) => ({ url: `bookings/get-by-confirmation-code/${code}` }),
    }),
    getAllBookings: build.query({
      query(token) {
        return {
          url: `bookings/all`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});
export const {
  useGetBookingByConfirmationCodeQuery,
  useLazyGetBookingByConfirmationCodeQuery,
  useGetAllBookingsQuery,
} = bookingsApi;
