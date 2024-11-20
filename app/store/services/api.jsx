import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getFetchBaseQuery = () => {
  const token =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("token"))?.token;
  const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`;

  return {
    baseUrl,
    credentials: "include",
    contentType: "application/json",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      if (token) {
        // include token in req header
        headers.set("Authorization", token);
        return headers;
      }
    },
  };
};

// initialize an empty api service that we'll inject endpoints into later as needed
const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery(getFetchBaseQuery()),
  tagTypes: ["User"],
  keepUnusedDataFor: 300, // setting the cache time to 5 minutes for all the endpoints under this base url
  endpoints: () => ({}),
});

export default api;
