import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getFetchBaseQuery = () => {
  const token = JSON.parse(localStorage.getItem("token"))?.token;
  const baseUrl = "http://localhost:5000/api/v1";

  return {
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
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
  tagTypes: [],
  keepUnusedDataFor: 300, // setting the cache time to 5 minutes for all the endpoints under this base url
  endpoints: () => ({}),
});

export default api;
