import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Api = import.meta.env.VITE_API_URL

export interface Admin {
  _id: string;

  email: string;
  role: "admin";
}

export interface RegisterPayload {

  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  admin?: Admin;
  data?: Admin;
}

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${Api}/api`,
  }),

    tagTypes: ["auth"],
  endpoints: (builder) => ({
    adminRegister: builder.mutation<AuthResponse, RegisterPayload>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    adminLogin: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

 
  }),
});

export const {
  useAdminRegisterMutation,
  useAdminLoginMutation,

} = adminAuthApi;