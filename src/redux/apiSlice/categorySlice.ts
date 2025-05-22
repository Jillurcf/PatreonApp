import { api } from "../baseApi";

const categorySlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: '/services/all-categories',
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
  }),
});

export const { useGetAllCategoryQuery } = categorySlice;
