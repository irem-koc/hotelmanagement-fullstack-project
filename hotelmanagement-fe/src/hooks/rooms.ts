import { apiWithTag } from "../api/emptySplitApi";

export const roomsApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getRoomTypes: build.query({
      query: () => ({ url: `rooms/types` }),
    }),
    getRooms: build.query({
      query: () => ({ url: `rooms/all` }),
    }),
  }),
});
export const { useGetRoomTypesQuery, useGetRoomsQuery } = roomsApi;
