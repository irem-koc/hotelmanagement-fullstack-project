import { apiWithTag } from "../api/emptySplitApi";
import {
  ChangePasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
} from "../types/UserServiceTypes";

export const userApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginRequest, Partial<LoginRequest>>({
      query(body) {
        return {
          url: `auth/login`,
          method: "POST",
          body,
        };
      },
    }),
    registerUser: build.mutation<RegisterRequest, Partial<RegisterRequest>>({
      query(body) {
        return {
          url: `auth/register`,
          method: "POST",
          body,
        };
      },
    }),
    changePassword: build.mutation<
      ChangePasswordRequest,
      Partial<ChangePasswordRequest>
    >({
      query(body) {
        return {
          url: `auth/change-password`,
          method: "POST",
          body,
        };
      },
    }),
    logoutUser: build.mutation<LogoutRequest, Partial<LogoutRequest>>({
      query(body) {
        return {
          url: `users/logout`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
} = userApi;
