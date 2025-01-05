import { apiWithTag } from "../api/emptySplitApi";
import {
  ChangePasswordRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  UserEditRequest,
  UserProfileDeleteRequest,
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
    editUserProfile: build.mutation<UserEditRequest, Partial<UserEditRequest>>({
      query(body) {
        return {
          url: `users/user-edit/${body.id}`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        };
      },
    }),
    deleteUserProfile: build.mutation<
      UserProfileDeleteRequest,
      Partial<UserProfileDeleteRequest>
    >({
      query({ id, token }) {
        return {
          url: `users/delete/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
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
  useEditUserProfileMutation,
  useDeleteUserProfileMutation,
} = userApi;
