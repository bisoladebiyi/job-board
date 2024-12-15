import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Applicant {
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    id: string
}

const initialState: Applicant =
{
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    id: ""
}


export const applicantSlice = createSlice({
    name: 'applicant',
    initialState,
    reducers: {
        setApplicant: (state, action: PayloadAction<Applicant>) => {
            state.id = action.payload.id
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.occupation = action.payload.occupation
        },
    },
})

export const { setApplicant } = applicantSlice.actions

export default applicantSlice