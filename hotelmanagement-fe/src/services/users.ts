import { apiWithTag } from "../api/emptySplitApi";
import { LoginRequest, RegisterRequest } from "../types/UserServiceTypes";

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
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
