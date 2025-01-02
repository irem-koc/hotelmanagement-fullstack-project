import { apiWithTag } from "../api/emptySplitApi";

export const roomsApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getRoomTypes: build.query({
      query: () => ({ url: `rooms/types` }),
    }),
    getRooms: build.query({
      query: () => ({ url: `rooms/all` }),
    }),
    getAvailableRoomsByDateAndType: build.query({
      query: ({ checkInDate, checkOutDate, roomType }) => {
        const params = new URLSearchParams();
        if (checkInDate?.length > 0) params.append("checkInDate", checkInDate);
        if (checkOutDate?.length > 0)
          params.append("checkOutDate", checkOutDate);
        if (roomType?.length > 0) params.append("roomType", roomType);

        return {
          url: `rooms/available-rooms-by-date-and-type?${params.toString()}`,
        };
      },
    }),
    getRoomDetail: build.query({
      query: (id) => ({ url: `rooms/room-by-id/${id}` }),
    }),
  }),
});
export const {
  useGetRoomTypesQuery,
  useGetRoomsQuery,
  useLazyGetAvailableRoomsByDateAndTypeQuery,
  useGetRoomDetailQuery,
} = roomsApi;
