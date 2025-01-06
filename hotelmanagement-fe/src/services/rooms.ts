import { apiWithTag } from "../api/emptySplitApi";
import {
  AddRoomRequest,
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
    addRoom: build.mutation<AddRoomRequest, Partial<AddRoomRequest>>({
      query(body) {
        return {
          url: `rooms/add`,
          method: "POST",
          body: body.request,
          headers: {
            Authorization: `Bearer ${body.token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useAddRoomMutation,
} = roomsApi;
