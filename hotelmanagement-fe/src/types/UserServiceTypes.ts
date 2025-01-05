import { Booking } from "./BookingServiceTypes";

export interface LoginRequest {
  email: string;
  statusCode: number;
  password: string;
}
export interface RegisterRequest {
  email: string;
  name: string;
  phonenUmber: string;
  statusCode: number;
  password: string;
}
export interface ChangePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
  statusCode: number;
}
export interface LogoutRequest {
  token: string;
  statusCode: number;
}
export type UserProfile = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  bookings: Booking[];
};
export type UserEditRequest = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  token: string;
  password: string;
};
