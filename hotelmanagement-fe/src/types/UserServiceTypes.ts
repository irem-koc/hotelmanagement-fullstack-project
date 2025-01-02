import { Booking } from "./BookingServiceTypes";

export interface LoginRequest {
  email: string;
  password: string;
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
export type UserProfile = {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  bookings: Booking[];
};
