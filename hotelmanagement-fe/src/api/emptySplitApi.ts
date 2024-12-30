import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  reducerPath: "emptySplitApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: () => ({}),
});
export const apiWithTag = emptySplitApi.enhanceEndpoints({
  addTagTypes: ["users"],
});
