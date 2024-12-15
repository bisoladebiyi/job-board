import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Employer {
    companyName: string;
    companyWebsite: string;
    email: string;
    id: string
}

const initialState: Employer =
{
    companyName: "",
    companyWebsite: "",
    email: "",
    id: ""
}


export const employerSlice = createSlice({
    name: 'employer',
    initialState,
    reducers: {
        setEmployer: (state, action: PayloadAction<Employer>) => {
            state.id = action.payload.id
            state.companyName = action.payload.companyName
            state.email = action.payload.email
            state.companyWebsite = action.payload.companyWebsite
        },
    },
})

export const { setEmployer } = employerSlice.actions

export default employerSlice