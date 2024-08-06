import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyProfileQuery } = userApi;
