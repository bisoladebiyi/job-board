import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPLICANT_API_ROUTES, EMPLOYER_API_ROUTES } from '../../../utils/apiRoutes';


export interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    firstName?: string;
    lastName?: string;
    companyName?: string;
    companyWebsite?: string;
    isEmployer: boolean;
    email: string;
    password: string;
    occupation?: string
}


export const auth = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    endpoints: (builder) => ({
        employerLogin: builder.mutation<unknown, LoginRequest>({
            query: (credentials) => ({
                url: EMPLOYER_API_ROUTES.LOGIN,
                method: 'POST',
                body: credentials,
            }),
        }),
        employerSignup: builder.mutation<unknown, SignupRequest>({
            query: (user) => ({
                url: EMPLOYER_API_ROUTES.SIGNUP,
                method: 'POST',
                body: user,
            }),
        }),
        applicantLogin: builder.mutation<unknown, LoginRequest>({
            query: (credentials) => ({
                url: APPLICANT_API_ROUTES.LOGIN,
                method: 'POST',
                body: credentials,
            }),
        }),
        applicantSignup: builder.mutation<unknown, SignupRequest>({
            query: (user) => ({
                url: APPLICANT_API_ROUTES.SIGNUP,
                method: 'POST',
                body: user,
            }),
        })
    }),
});


export const { useEmployerLoginMutation, useApplicantLoginMutation, useApplicantSignupMutation, useEmployerSignupMutation } = auth;