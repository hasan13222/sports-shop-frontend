import { baseApi } from "../../api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartProducts: builder.query({
      query: (ids) => ({
        url: `/cart`,
        method: "POST",
        body: ids,
      }),
      providesTags: ["cartProducts"],
    }),
  }),
});

export const { useGetCartProductsQuery } = cartApi;
