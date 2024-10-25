import { BASE_URL } from '@/constants/Url'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${BASE_URL}/${endpoint}/`,
    })