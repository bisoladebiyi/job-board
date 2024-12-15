/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPLICANT_API_ROUTES } from '../../../utils/apiRoutes';

export const applicantAPI = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        uploadResume: builder.mutation({
            query: (form) => ({
                url: APPLICANT_API_ROUTES.UPLOAD_RESUME,
                method: 'POST',
                body: form,
                invalidatesTags: ['Post']
            }),
        }),

        getResume: builder.query({
            query: (user) => ({
                url: APPLICANT_API_ROUTES.GET_RESUME + `?userId=${user.userId}`
            })
        })
    }),
});


export const { useUploadResumeMutation, useGetResumeQuery } = applicantAPI;