import { ICategory } from "@/models/category/ICategory"
import { ICategoryCreationModel } from "@/models/category/ICategoryCreationModel"
import { getBaseQueryWithAuth } from "@/utils/createBaseQuery"
import { generateCategoryFormData } from "@/utils/formDataGenerator"
import { createApi } from '@reduxjs/toolkit/query/react'


export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: getBaseQueryWithAuth('Category'),
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategory[], void>({
            query: () => {
                return {
                    url: 'get',
                    method: 'GET',
                }
            },
           // keepUnusedDataFor: 0,
        }),
        getCategoryById: builder.query<ICategory, string>({
            query: (id) => {
                return {
                    url: `get/${id}`,
                    method: 'GET',

                }
            },
           // keepUnusedDataFor: 0,
        }),
        addCategory: builder.mutation<ICategory, ICategoryCreationModel>({
            query: (categoryForm) => {
                const formData = generateCategoryFormData(categoryForm)
                return {
                url: 'create',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }},
        }),
        updateCategory: builder.mutation<ICategory, ICategoryCreationModel>({
            query: (categoryForm) => {
                const formData = generateCategoryFormData(categoryForm)
                return {
                url: 'update',
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }},
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

function getBaseQuery(arg0: string): any {
    throw new Error("Function not implemented.")
}
