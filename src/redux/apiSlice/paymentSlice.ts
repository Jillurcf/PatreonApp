import { api } from "../baseApi";

export const paymentSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postPaymentMethods: builder.mutation({
      query: (id) => ({
        url: `/transactions/stripe/checkout/${id}`,
        method: 'POST',
      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    postCreateConnect: builder.mutation({
      query: () => ({
        url: `/transactions/stripe/onboarding`,
        method: 'POST',
      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    postCreateTransaction: builder.mutation({
      query: (data) => ({
        url: `/transactions/create`,
        method: 'POST',
        body: data,
      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    
  }),
});

export const { usePostPaymentMethodsMutation,
  usePostCreateConnectMutation,
  usePostCreateTransactionMutation
  
  
 } = paymentSlice;
