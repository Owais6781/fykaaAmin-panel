 import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


 const API = import.meta.env.VITE_API_URL;

export const contactApi = createApi({
    reducerPath: "contactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API}/api`,
    }),

    tagTypes: ["Contact"],

    endpoints: (builder) => ({
        getContact: builder.query<any, void>({
            query: () => "/contact",
            providesTags: ["Contact"],
        }),

        createContact: builder.mutation({
            query: (body) => ({
                url: "/contact",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Contact"],
        }),

        updateContact: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/contact/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Contact"],
        }),
    }),
});

export const {
    useGetContactQuery,
    useCreateContactMutation,
    useUpdateContactMutation,
} = contactApi;