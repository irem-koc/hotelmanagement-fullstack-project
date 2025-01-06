import { apiWithTag } from "../api/emptySplitApi";
import {
  DeleteRoomRequest,
  UpdateRoomRequest,
} from "../types/RoomServiceTypes";

export const roomsApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    updateRoom: build.mutation<UpdateRoomRequest, Partial<UpdateRoomRequest>>({
      query(body) {
        return {
          url: `rooms/update/${body.id}`,
          method: "POST",
          body: body.request,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    deleteRoom: build.mutation<DeleteRoomRequest, Partial<DeleteRoomRequest>>({
      query({ id, token }) {
        return {
          url: `rooms/delete-room/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useUpdateRoomMutation, useDeleteRoomMutation } = roomsApi;
