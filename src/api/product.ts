
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const Api = import.meta.env.VITE_API_URL

export const ProductApi = createApi({
    reducerPath: `ProductApi`,
    baseQuery: fetchBaseQuery({
        baseUrl: `${Api}/api`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },

    }),

    tagTypes: ["ProductActivity", "product"],

    endpoints: (builder) => ({


        addProduct: builder.mutation({
            query: (formData) => ({
                url: "/",
                method: "POST",
                body: formData,
            }),
        }),



        getProducts: builder.query<any[], void>({
            query: () => `/`,
            providesTags: ["product"]
        }),

        getView: builder.query<any, string>({
            query: (id) => `/${id}`,
            providesTags: ["product"]
        }),

        getProductImages: builder.query<Blob, { id: string, index: number }>({
            query: ({ id, index }) => ({
                url: `${id}/img/${index}`,
                method: "GET",
                responseHandler: async (response) => response.blob

            })
        }),

        updateProduct: builder.mutation<any, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: "PUT",
                body: formData,

            }),
            invalidatesTags: ["product"],
        }),


        getActivityLog: builder.query({
            query: (id) => `/${id}/activitylog`,
            providesTags: ["ProductActivity"],
        }),


        deleteProduct: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ["ProductActivity", "product"],
        })

    })

})

export const {
    useAddProductMutation,
    useGetProductsQuery,
    useDeleteProductMutation,
    useGetViewQuery, useGetProductImagesQuery,
    useGetActivityLogQuery,
    useUpdateProductMutation } = ProductApi;


