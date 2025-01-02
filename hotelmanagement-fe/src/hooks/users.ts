import { apiWithTag } from "../api/emptySplitApi";

export const usersApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getUserProfileHistory: build.query({
      query(token) {
        return {
          url: `users/get-logged-in-profile-info`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});
export const { useGetUserProfileHistoryQuery } = usersApi;
