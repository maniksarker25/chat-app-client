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
    getAllUser: build.query({
      query: (arg: Record<string, any>) => ({
        url: `/user`,
        method: "GET",
        params: arg,
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

export const {
  useGetMyProfileQuery,
  useGetAllUserQuery,
  useUpdateProfileMutation,
} = userApi;
