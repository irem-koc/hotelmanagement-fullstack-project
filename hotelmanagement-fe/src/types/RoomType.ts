export type Room = {
  id: number;
  roomType: string;
  roomPrice: number;
  roomPhotoUrl: string;
};
export type GetAllRoomsResponse = {
  statusCode: number;
  message: string;
  roomList: Room[];
};
