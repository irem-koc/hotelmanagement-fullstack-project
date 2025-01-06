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
export type UpdateRoomRequest = {
  request: {
    photo: string;
    roomType: string;
    roomDescription: string;
    roomPrice: number;
  };
  id: number;
  token: string;
};
export type DeleteRoomRequest = {
  id: number;
  token: string;
};
export type AddRoomRequest = {
  request: {
    photo: string;
    roomType: string;
    roomDescription: string;
    roomPrice: number;
  };
  token: string;
};
