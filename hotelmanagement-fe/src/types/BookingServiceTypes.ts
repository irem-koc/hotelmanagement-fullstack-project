export interface AddBokingRequest {
  filter: {
    numOfChildren: number;
    numOfAdults: number;
    checkInDate: Date;
    checkOutDate: Date;
  };
  token: string;
  userId: number;
  roomId: number;
}
export interface RegisterRequest {
  email: string;
  name: string;
  phonenUmber: string;
  password: string;
}
export interface ChangePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}
export interface LogoutRequest {
  token: string;
}
