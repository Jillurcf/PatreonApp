import { api } from "../baseApi";

const serviceSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: ({ category, title, page = 1, limit = 10 }) => {
        let queryString = '/services/get-all-services';
        const params = new URLSearchParams();
      
        if (category) params.append('category', category);
        if (title) params.append('title', title);
        params.append('page', page);
        params.append('limit', limit);
      
        const queryParams = params.toString();
        if (queryParams) {
          queryString += `?${queryParams}`;
        }
      
        console.log("GET URL:", queryString); // 👈 Check this in browser/devtools console
      
        return {
          url: queryString,
          method: 'GET',
        };
      },
      
      providesTags: ['service'],
    }),
    postBecmeAContibutor: builder.mutation({
      query: (data) => ({
        url: `/services/become-contributor`,
        method: "POST",
        body: data,

      }),
      invalidatesTags: ["service"]
    }),
    postSendMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/services/generate-reply-for-service/${id}`,
        method: "POST",
        body: data,
        // 👇 DO NOT set headers manually here

      }),


    }),
    gettMyServices: builder.query({
      query: () => ({
        url: `/services/get-service-by-contributor`,
        method: "GET",
      }),
      providesTags: ['service']
    }),
    getServicesById: builder.query({
      query: (id) => ({
        url: `/services/get-service-by-id/${id}`,
        method: "GET",
      }),
      providesTags: ['service'],
    }),
    updateServicesById: builder.mutation({
      query: ({id, data}) => ({
        url: `/services/update-service-by-id/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['service'],
    }),

    deleteServices: builder.mutation({
      query: (id) => ({
        url: `/services/delete-service-by-id/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['service'],
    }),
    getMessageUser: builder.query({
      query: () => ({
        url: `/services/get-replies-by-user`,
        method: 'GET',
      }),
      providesTags: ['service'],
    }),
  }),

});

export const { useGetAllServiceQuery,
  usePostBecmeAContibutorMutation,
  usePostSendMessageMutation,
  useGettMyServicesQuery,
  useDeleteServicesMutation,
  useGetServicesByIdQuery,
 useUpdateServicesByIdMutation,
 useGetMessageUserQuery
} = serviceSlice;
