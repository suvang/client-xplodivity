// Need to use the React-specific entry point to import createApi
import api from "./api";

// Define a service using a base URL and expected endpoints
export const allcategoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({ query, page, filter, type }) => {
        return {
          url: "/allcategories",
          params: {
            topicName: query === "" ? undefined : query,
            page,
            filter,
            type,
          },
        };
      },
    }),
    addCategory: builder.mutation({
      query: ({ formData }) => {
        return {
          url: "/allcategories",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
} = allcategoriesApi;
