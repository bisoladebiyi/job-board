/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPLICANT_API_ROUTES } from '../../../utils/apiRoutes';

export const applicantAPI = createApi({
    reducerPath: "applicantAPI",
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
        getJobs: builder.query({
            query: ({ date, model }) => ({
                url: APPLICANT_API_ROUTES.GET_JOBS + `?date=${date || ''}&model=${model || ''}`
            })
        }),

        getResume: builder.query({
            query: (user) => ({
                url: APPLICANT_API_ROUTES.GET_RESUME + `?userId=${user.userId}`
            })
        }),

        getAppliedJobs: builder.query({
            query: (userId) => ({
                url: APPLICANT_API_ROUTES.GET_APPLIED + `?userId=${userId}`,
            })
        }),
        getSavedJobs: builder.query({
            query: (userId) => ({
                url: APPLICANT_API_ROUTES.GET_SAVED + `?userId=${userId}`
            })
        }),
        apply: builder.mutation({
            query: (data) => ({
                url: APPLICANT_API_ROUTES.APPLY,
                method: 'POST',
                body: data
            })
        }),
        saveJob: builder.mutation({
            query: (data) => ({
                url: APPLICANT_API_ROUTES.SAVE_JOB,
                method: 'POST',
                body: data
            })
        })
    }),
});


export const { useUploadResumeMutation, useGetResumeQuery, useApplyMutation, useGetAppliedJobsQuery, useGetSavedJobsQuery, useSaveJobMutation, useGetJobsQuery } = applicantAPI;