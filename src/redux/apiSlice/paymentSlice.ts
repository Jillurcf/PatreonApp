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
    postCreateRecipient: builder.mutation({
      query: () => ({
        url: `/stripe/create-recipient`,
        method: 'POST',
      }),
      //   providesTags: ['PaymentMethods'], 
    }),

    putUpdateRecipient: builder.mutation({
      query: (data) => ({
        url: `/stripe/update-recipient`,
        method: 'PUT',

        body: data,

      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    attachBankAccount: builder.mutation({
      query: (data) => ({
        url: `/stripe/attach-bank-account-gb`,
        method: 'PUT',

        body: data,

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
    postCreateWallet: builder.mutation({
      query: () => ({
        url: `/wallets`,
        method: 'POST',
        // body: data,
      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    globalPayout: builder.mutation({
      query: (data) => ({
        url: `/stripe/send-payout`,
        method: 'POST',
        body: data,
      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    getWalletByUser: builder.query({
      query: () => ({
        url: `/wallets/self`,
        method: 'GET',
        // body: data,
      }),
      //   providesTags: ['PaymentMethods'], 
    }),
    myBanckAccounts: builder.query({
      query: () => ({
        url: `/stripe/recipient-payout-methods`,
        method: 'GET',
        // body: data,
      }),
      //   providesTags: ['PaymentMethods'], 
    }),

  }),
});

export const { usePostPaymentMethodsMutation,
  usePostCreateConnectMutation,
  usePostCreateTransactionMutation,
  usePostCreateRecipientMutation,
  usePutUpdateRecipientMutation,
  useAttachBankAccountMutation,
  usePostCreateWalletMutation,
  useGlobalPayoutMutation,
  useGetWalletByUserQuery,
  useMyBanckAccountsQuery,

} = paymentSlice;
