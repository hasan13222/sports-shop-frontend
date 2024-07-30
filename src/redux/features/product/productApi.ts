import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        searchTerm = "",
        page = 1,
        limit = 12,
        sort = "",
        category = "",
        minPrice = 0,
        maxPrice = Number.POSITIVE_INFINITY,
        brand = "",
        minRating = 0,
      }) => ({
        url: `/products?limit=${limit}&page=${page}&sort=${sort}&searchTerm=${searchTerm}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&minRating=${minRating}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => {
        return ({
          url: `/products/${payload.productId}`,
          method: "PATCH",
          body: payload.data
        })
      },
      invalidatesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productApi;
