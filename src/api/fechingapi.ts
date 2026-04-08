
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const Api = import.meta.env.VITE_API_URL

export const apiSlice = createApi({

    reducerPath: `api`,
    baseQuery: fetchBaseQuery({ baseUrl: `${Api}/api` }),

    tagTypes: ["product"],

    endpoints: (builder) => ({

        getProducts: builder.query<any[], void>({
            query: () => `/`,
            providesTags: ["product"]
        }),

        getView: builder.query<any, string>({
            query: (id) => `/${id}`,
            providesTags: ["product"]
        }),
        
        getProductImages:builder.query<Blob,{id:string,index:number}>({
            query:({id,index})=>({
                url:`${id}/img/${index}`,
                method:"GET",
                responseHandler:async(response)=>response.blob

            })
        }),

        updateProduct: builder.mutation<any,{ id: string;formData:FormData}>({
            query: ({id,formData}) => ({
                url: `/${id}`,
                method: "PUT",
                body:formData,
               
            }),
             invalidatesTags: ["product"],
        }),

        deleteProduct: builder.mutation<{ success: boolean }, string>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
              
            }),
              invalidatesTags: ["product"],
        })

    })

})

export const { useGetProductsQuery, useDeleteProductMutation, useGetViewQuery,useGetProductImagesQuery,useUpdateProductMutation } = apiSlice;


