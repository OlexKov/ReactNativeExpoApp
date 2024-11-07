import { IUser, IUserState } from '@/models/account';
import { createSlice } from '@reduxjs/toolkit'


const initialState: IUserState = {
    user: null,
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action: { payload: { user: IUser; token: string } }) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        },
    },
})

export const isAdmin = (state: { user: IUserState }): boolean => state.user.user !== null && state.user.user.roles.includes('Admin')
export const isUser = (state: { user: IUserState }): boolean => state.user.user !== null && state.user.user?.roles.includes('User')
export const getUser = (state: { user: IUserState }) => state.user.user
export const getToken = (state: { user: IUserState }) => state.user.token
export const { setCredentials, logOut } = userSlice.actions
export default userSlice.reducer