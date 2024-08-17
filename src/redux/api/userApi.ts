import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyProfile: build.query({
      query: () => ({
        url: `/user/my-profile`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateProfileMutation } = userApi;
