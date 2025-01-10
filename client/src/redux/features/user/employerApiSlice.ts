/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EMPLOYER_API_ROUTES } from '../../../utils/apiRoutes';

export const employerAPI = createApi({
    reducerPath: "employerAPI",
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
        createJob: builder.mutation({
            query: (body) => ({
                url: EMPLOYER_API_ROUTES.JOBS,
                method: 'POST',
                body: body,
                invalidatesTags: ['Post']
            }),
        }),

        editJob: builder.mutation({
            query: ({ jobId, ...body }) => ({
                url: EMPLOYER_API_ROUTES.JOBS + `/${jobId}`,
                method: 'PUT',
                body: body
            }),
        }),

        deleteJob: builder.mutation({
            query: (id) => ({
                url: EMPLOYER_API_ROUTES.JOBS + `/${id}`,
                method: 'DELETE'
            })
        }),

        getJob: builder.query({
            query: (id) => ({
                url: EMPLOYER_API_ROUTES.JOBS + `/get/${id}`
            })
        }),

        getActiveJobs: builder.query({
            query: (userId) => ({
                url: EMPLOYER_API_ROUTES.ACTIVE_JOBS + `?userId=${userId}`
            })
        }),
        getArchivedJobs: builder.query({
            query: (userId) => ({
                url: EMPLOYER_API_ROUTES.ARCHIVED_JOBS + `?userId=${userId}`
            })
        }),
    }),
});


export const { useCreateJobMutation, useEditJobMutation, useGetActiveJobsQuery, useGetArchivedJobsQuery, useGetJobQuery, useDeleteJobMutation } = employerAPI;