import { apiWithTag } from "../api/emptySplitApi";

export const bookingsApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getBookingByConfirmationCode: build.query({
      query: (code) => ({ url: `bookings/get-by-confirmation-code/${code}` }),
    }),
  }),
});
export const {
  useGetBookingByConfirmationCodeQuery,
  useLazyGetBookingByConfirmationCodeQuery,
} = bookingsApi;
