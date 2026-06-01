
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const Api = import.meta.env.VITE_API_URL

// export const apiSlice = createApi({

//     reducerPath: `api`,
//     baseQuery: fetchBaseQuery({ baseUrl: `${Api}/api` }),

//     tagTypes: ["product"],

//     endpoints: (builder) => ({

//         getProducts: builder.query<any[], void>({
//             query: () => `/`,
//             providesTags: ["product"]
//         }),

//         getView: builder.query<any, string>({
//             query: (id) => `/${id}`,
//             providesTags: ["product"]
//         }),
        
//         getProductImages:builder.query<Blob,{id:string,index:number}>({
//             query:({id,index})=>({
//                 url:`${id}/img/${index}`,
//                 method:"GET",
//                 responseHandler:async(response)=>response.blob

//             })
//         }),

//         updateProduct: builder.mutation<any,{ id: string;formData:FormData}>({
//             query: ({id,formData}) => ({
//                 url: `/${id}`,
//                 method: "PUT",
//                 body:formData,
               
//             }),
//              invalidatesTags: ["product"],
//         }),

//         deleteProduct: builder.mutation<{ success: boolean }, string>({
//             query: (id) => ({
//                 url: `/${id}`,
//                 method: "DELETE",
              
//             }),
//               invalidatesTags: ["product"],
//         })

//     })

// })

// export const { useGetProductsQuery, useDeleteProductMutation, useGetViewQuery,useGetProductImagesQuery,useUpdateProductMutation } = apiSlice;







import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;