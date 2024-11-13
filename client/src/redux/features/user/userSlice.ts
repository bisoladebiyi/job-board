import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    createdAt: string;
    email: string;
    fullName: string;
    id: number;
    phoneNumber: string;
    updatedAt: string;
    isLoggedIn: boolean
}

const initialState: User =
{
    id: 0,
    fullName: "",
    phoneNumber: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    isLoggedIn: false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.id = action.payload.id
            state.fullName = action.payload.fullName
            state.phoneNumber = action.payload.phoneNumber
            state.email = action.payload.email
            state.createdAt = action.payload.createdAt
            state.updatedAt = action.payload.updatedAt
            state.isLoggedIn = action.payload.isLoggedIn
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice