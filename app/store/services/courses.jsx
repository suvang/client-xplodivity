// Need to use the React-specific entry point to import createApi
import api from "./api";

// Define a service using a base URL and expected endpoints
export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: ({ url }) => {
        return {
          url: "/course",
          method: "GET",
          params: { url },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCoursesQuery } = coursesApi;
