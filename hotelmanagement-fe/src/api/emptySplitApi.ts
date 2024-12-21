import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: () => ({}),
});
export const apiWithTag = emptySplitApi.enhanceEndpoints({
  addTagTypes: ["users"],
});
