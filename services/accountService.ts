import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from '@/utils/createBaseQuery'
import { ILogin, ILoginResponse, IUserCreate } from '@/models/account'
import { generateUserCreateFormData } from '@/utils/formDataGenerator'


// import { generateUserCreateFormData } from '@/utils/generateFormData/accountFormData'

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: createBaseQuery('Account'),
    tagTypes: ['Account'],

    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILogin>({
            query: (data) => {
                return {
                    url: 'SignIn',
                    method: 'POST',
                    body: data,
                
                }
            },
        }),

        register: builder.mutation<ILoginResponse, IUserCreate>({
            query: (data) => {
                const formData = generateUserCreateFormData(data)
                return {
                    url: 'create',
                    method: 'POST',
                    body: formData,
                }
            },
        }),
    }),
})

export const { useLoginMutation , useRegisterMutation } = accountApi