import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../slices/authSlice";
// import { logout } from './slices/authSlice';

// Create a base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.36/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuthHandling = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "ysbeautyApi",
  baseQuery: baseQueryWithAuthHandling,
  tagTypes: ["DashboardStats"],
  endpoints: (build) => ({
    getDashboardStats: build.query({
      query: () => "dashboard/admin/dashboard/",
      providesTags: ["DashboardStats"],
    }),

    getUserActivitesYearly: build.query({
      query: () => "/dashboard/admin/user-activity/yearly/",
    }),

    getUserActivitiesMonthly: build.query({
      query: () => "/dashboard/admin/user-activity/monthly/",
    }),

    getopFive: build.query({
      query: () => "dashboard/events/top5/",
    }),
    getAllEvents: build.query({
      query: () => "dashboard/events/all/",
    }),
    getAllUsersActivities: build.query({
      query: () => "/dashboard/admin/users/",
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/dashboard/admin/users/delete/${id}/`,
        method: "DELETE",
      }),
    }),

    deactiveEvents: build.mutation({
      query: (id) => ({
        url: `/dashboard/admin/event/deactivate/${id}/`,
        method: "POST",
      }),
    }),
    activeEvents: build.mutation({
      query: (id) => ({
        url: `/dashboard/admin/event/activate/${id}/`,
        method: "POST",
      }),
    }),

    getUserProfile: build.query({
      query: () => "/user/profile/get",
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/profile/update",
        method: "PUT",
        body: data,
      }),
    }),

    changePass: build.mutation({
      query: (data) => ({
        url: "/user/auth/change_password",
        method: "POST",
        body: data,
      }),
    }),

    updateProfileImage: build.mutation({
      query: (data) => ({
        url: "/user/profile/photo/",
        method: "PUT",
        body: data,
      }),
    }),

    resetPass: build.mutation({
      query: (data) => ({
        url: "/auth/forget_passord",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/auth/veryfy_otp/",
        method: "POST",
        body: data,
      }),
    }),

    resetChangePass : build.mutation({
      query: (data) => ({
        url: 'auth/reset_password/',
        method: 'POST',
        body: data
      })
    }),

    getPolicy: build.query({
      query: () => "/dashboard/policy/",
    }),

    getTerms: build.query({
      query: () => "/dashboard/terms/",
    }),

    updatePolicy: build.mutation({
      query: (data) => ({
        url: "/dashboard/policy/",
        method: "PUT",
        body: data,
      }),
    }),

    updateTerms: build.mutation({
      query: (data) => ({
        url: "/dashboard/terms/",
        method: "PUT",
        body: data,
      }),
    }),
    
    eventDelete: build.mutation({
      query:(id) => ({
        url: `/dashboard/admin/events/delete/${id}/`,
        method: 'DELETE'
      })
    }),

    getDashboardPersentage: build.query({
      query: () => 'dashboard/admin/user_activity/percentage/'
    }),

    signIn: build.mutation({
      query: (data) => ({
        url: "/dashboard/admin/login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useEventDeleteMutation,
  useUpdateTermsMutation,
  useGetDashboardPersentageQuery,
  useGetTermsQuery,
  useResetChangePassMutation,
  useActiveEventsMutation,
  useUpdatePolicyMutation,
  useGetPolicyQuery,
  useVerifyOtpMutation,
  useResetPassMutation,
  useUpdateProfileImageMutation,
  useChangePassMutation,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useDeactiveEventsMutation,
  useGetAllUsersActivitiesQuery,
  useDeleteUserMutation,
  useSignInMutation,
  useGetAllEventsQuery,
  useGetopFiveQuery,
  useGetUserActivitesYearlyQuery,
  useGetUserActivitiesMonthlyQuery,
} = apiSlice;
