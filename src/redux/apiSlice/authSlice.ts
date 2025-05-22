import { api } from "../baseApi";


const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
      getCheckToken: builder.query({
        query: () => ({
          url: `/validate-token`,
          method: 'GET', // Ensure method is explicitly defined
        }),
        providesTags: ['user'],
      }),
      postCheckToken: builder.mutation({
        query: () => ({
          url: `/auth/verify-token`,
          method: 'POST', // Ensure method is explicitly defined
        }),
       invalidatesTags: ['user'],
      }),
      loginUser: builder.mutation({
        query: (data) => ({
          url: `/auth/login`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      phoneNoVerification: builder.mutation({
        query: (data) => ({
          url: `/auth/send-verification-code-to-phone`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      registerUser: builder.mutation({
        query: (data) => ({
          url: `/auth/signup`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      otipVerify: builder.mutation({
        query: (data) => ({
          url: `/auth/verify-code`,
          method: 'POST', 
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      resentOtp: builder.mutation({
        query: (otp) => ({
          url: `/resent-otp`,
          method: 'POST', // Ensure method is explicitly defined
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
          body: otp,
        }),
        invalidatesTags: ['user'],
      }),
      changePassword: builder.mutation({
        query: (data) => ({
          url: `/auth/reset-password`,
          method: 'POST', // Ensure method is explicitly defined
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          //   // 'Content-Type': 'application/json',
          // },
          body: data,
        }),
        invalidatesTags: ['user'],
      }),
      postSocialLogin: builder.mutation({
        query:(data) => ({
          url: `/auth/social-login`,
          method: "POST",
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
          },
          body: data,
        })
      })
      
    }),
  });
  
export const {useLoginUserMutation,
    useLazyGetCheckTokenQuery,
    useRegisterUserMutation,
    useOtipVerifyMutation,
    useResentOtpMutation,
    useChangePasswordMutation,
    usePostSocialLoginMutation,
    usePhoneNoVerificationMutation,
    usePostCheckTokenMutation
} = authSlice;