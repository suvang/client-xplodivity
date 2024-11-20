// app/services/auth/authService.js
// React-specific entry point to allow generating React hooks
import { setCurrentUser, logout } from "../Features/userSlice";
import api from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/userdetails/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        if (response.success) {
          const item = {
            token: response.token,
            expires: response.expires,
          };
          if (typeof window !== "undefined") {
            localStorage.setItem("token", JSON.stringify(item));
          }

          dispatch(setCurrentUser(response));
        } else {
          console.log("ERROR");
        }
      },
    }),
    registerUser: builder.mutation({
      query: ({ fullName, email, password }) => ({
        url: "/userdetails/register",
        method: "POST",
        body: { fullName, email, password },
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        if (response.success) {
          const item = {
            token: response.token,
            expires: response.expires,
          };
          if (typeof window !== "undefined") {
            localStorage.setItem("token", JSON.stringify(item));
          }
          dispatch(setCurrentUser(response));
        } else {
          console.log("ERROR");
        }
      },
    }),
    getCurrentUserDetails: builder.query({
      query: () => ({
        url: "/userdetails/currentuser",
        method: "GET",
      }),
      providesTags: ["User"],
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        if (response.success) {
          dispatch(setCurrentUser(response));
        } else {
          console.log("ERROR");
        }
      },
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "/userdetails/logout",
        method: "GET",
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        if (response.success) {
          dispatch(logout());
        } else {
          console.log("ERROR");
        }
      },
    }),
    deleteAccount: builder.mutation({
      query: () => {
        return {
          url: "/userDetails/deleteprofile",
          method: "DELETE",
        };
      },
    }),
    forgotPasswordEmailLink: builder.mutation({
      query: ({ email }) => {
        return {
          url: "/userdetails/forgot-password",
          method: "POST",
          body: { email },
        };
      },
    }),
    verifyResetPasswordLink: builder.mutation({
      query: ({ id, token, password }) => {
        return {
          url: "/userdetails/reset-password",
          method: "POST",
          body: { password },
          params: {
            id,
            token,
          },
        };
      },
    }),
    verifyEmail: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: "/userdetails/verify-email",
          method: "PUT",
          body: {
            id,
            token,
          },
        };
      },
      invalidatesTags: ["User"],
    }),
    resendEmailVerification: builder.query({
      query: () => {
        return {
          url: "/userdetails/resend-email-verification",
          method: "GET",
        };
      },
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetCurrentUserDetailsQuery,
  useLazyLogoutUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useDeleteAccountMutation,
  useForgotPasswordEmailLinkMutation,
  useVerifyResetPasswordLinkMutation,
  useVerifyEmailMutation,
  useLazyResendEmailVerificationQuery,
} = authApi;
