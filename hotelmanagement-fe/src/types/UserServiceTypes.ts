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
