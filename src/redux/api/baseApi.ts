import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sports-shop-backend.vercel.app",
  }),
  tagTypes: ["products","cartProducts"],
  endpoints: () => ({}),
});
