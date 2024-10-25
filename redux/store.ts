import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { accountApi } from '@/services/accountService'
import userReducer from './clices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector