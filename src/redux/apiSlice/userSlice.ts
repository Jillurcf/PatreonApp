import { api } from "../baseApi";

const userSlice = api.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: ()=> ({
                url: `/users/auth/profile`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        getAllUser: builder.query({
            query: (search)=> ({
                url: `/users?username=${search}`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        getSingleUser: builder.query({
            query: (id)=> ({
                url: `/users/${id}`,
                method: "GET"
            }),
            providesTags: ["user"]
        }),
        patchUpdateUserProfile: builder.mutation({
            query: (formData) => ({
              url: '/users/auth/update-profile-by-user',
              method: 'PATCH',
              body: formData,
              // DO NOT set Content-Type header here
            }),
            invalidatesTags: ['user'],
        }),  
        updateProfile: builder.mutation({
            query: (formData) => ({
              url: '/users/auth/update-profile-by-user',
              method: 'PATCH',
              body: formData, // FormData object
              // do not add headers here
            }),
            invalidatesTags: ['user'],
          }),
          
    })
})

export const {
    useGetUserQuery,
    usePatchUpdateUserProfileMutation,
    useUpdateProfileMutation,
    useGetSingleUserQuery,
    useGetAllUserQuery,
} = userSlice;