import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: (id) => ({
        url: `/user/my-profile/${id}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
  }),
});

export const { useGetMyProfileQuery } = userApi;
