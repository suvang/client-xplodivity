// Need to use the React-specific entry point to import createApi
import api from "./api";

// Define a service using a base URL and expected endpoints
export const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => {
        return {
          url: "/payment/order",
          method: "POST",
          body,
        };
      },
    }),
    verifyPayment: builder.mutation({
      query: (body) => {
        return {
          url: "/payment/paymentverification",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateOrderMutation, useVerifyPaymentMutation } = paymentsApi;
