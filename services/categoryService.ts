import { Category } from "@/models/Category"
import { getBaseQueryWithAuth } from "@/utils/createBaseQuery"
import { createApi } from '@reduxjs/toolkit/query/react'


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: getBaseQueryWithAuth('Category'),
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        getAllCategories: builder.query<Category[], void>({
            query: () => {
                return {
                    url: 'get',
                    method: 'GET',
                }
            },
            keepUnusedDataFor: 0,
        }),
        getCategoryById: builder.query<Category, string>({
            query: (id) => {
                return {
                    url: `get/${id}`,
                    method: 'GET',

                }
            },
            keepUnusedDataFor: 0,
        }),
        addCategory: builder.mutation<Category, FormData>({
            query: (categoryForm) => ({
                url: 'create',
                method: 'POST',
                body: categoryForm,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
        }),
        updateCategory: builder.mutation<Category, FormData>({
            query: (categoryForm) => ({
                url: 'update',
                method: 'PUT',
                body: categoryForm,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }),
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE',
            }),
        }),


    }),
})

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;