
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = import.meta.env.VITE_API_URL;

export type ProfileResponse = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  provider?: string;
  profilePic?: string;
  address?: {
    line1?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
  };
  createdAt?: string;
  updatedAt?: string;
};


export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl:`${API}/authApi`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Profile", "Customers"],

  endpoints: (builder) => ({

    getAllCustomers: builder.query<ProfileResponse[], void>({
      query: () => "/customers",

      transformResponse: (response: any) => {
        console.log("ALL CUSTOMERS 👉", response);
        return response.users ?? response;
      },

      providesTags: ["Customers"],
    }),






    getProfile: builder.query<ProfileResponse, void>({
      query: (id) => `/profile/${id}`,

      transformResponse: (response: any) => {
        console.log("PROFILE RESPONSE 👉", response);

   
        return response.user ?? response;
      },

      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetProfileQuery,
} = customerApi;