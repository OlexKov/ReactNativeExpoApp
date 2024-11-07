import { createApi } from '@reduxjs/toolkit/query/react'
import { IProduct } from "../models/product/IProduct"
import { createBaseQuery } from "../utils/createBaseQuery"




export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: createBaseQuery('Products'),
    tagTypes: ['Product'],

    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET',
                }
            },
        }),
        getProductById: builder.query<IProduct, string>({
            query: (id:string) => {
                return {
                    url: `${id}`,
                    method: 'GET',
                }
            },
        }),
    }),
})

export const { useGetAllProductsQuery, useGetProductByIdQuery} = productApi;