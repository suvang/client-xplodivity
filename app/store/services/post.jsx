// Need to use the React-specific entry point to import createApi
import { setCurrentUser } from "../Features/userSlice";
import api from "./api";

// Define a service using a base URL and expected endpoints
export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    savePost: builder.mutation({
      query: ({ postId, type }) => {
        return {
          url: "/savepost",
          method: "POST",
          params: { postId, type },
        };
      },
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        if (response.success) {
          dispatch(setCurrentUser(response));
        } else {
          console.log("ERROR");
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSavePostMutation } = postApi;
