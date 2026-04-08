
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const Api = import.meta.env.VITE_API_URL

export const authApi=createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({baseUrl:`${Api}/api/auth`,
    prepareHeaders:(headers)=>{
        const token = localStorage.getItem("token");
        if(token){
            headers.set("authorization",`Bearer${token}`);
        }
         return headers;
    },
}),
endpoints:(builder)=>({
    register:builder.mutation({
        query:(data)=>({
            url:"/register",
            method:"POST",
            body:data
        }),
    }),
    login:builder.mutation({
        query:(data)=>({
            url:"/login",
            method:"POST",
            body:data
        }),
    }),
})
})



export const { useRegisterMutation, } = authApi;

