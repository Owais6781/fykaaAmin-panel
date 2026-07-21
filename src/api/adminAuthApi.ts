import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const Api = import.meta.env.VITE_API_URL;

export interface Admin {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "Admin" | "SuperAdmin";

  businessType: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;

  gstNumber: string;
  panNumber: string;

  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;

  status?:"Pending" | "Approved" | "Rejected";
  KYCVerified: boolean;
  accountMode: boolean;
  vacationMode: boolean;
  rejectionReason: string;


  createdAt?: string;
  updatedAt?: string;
}



export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "Admin" | "SuperAdmin";
  businessType: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  panNumber: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  status?:"Pending" | "Approved" | "Rejected";
  KYCVerified: boolean;
  accountMode: boolean;
  vacationMode: boolean;
  rejectionReason: string;
  createdAt?: string;
  updatedAt?: string;

  // documents: {
  //   panCard: File | null;
  //   aadhaarCard: File | null;
  //   gstCertificate: File | null;
  //   cancelledCheque: File | null;
  // };
}


export interface UpdatePayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "Admin" | "SuperAdmin";
  businessType: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  panNumber: string;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  status?:"Pending" | "Approved" | "Rejected";
  KYCVerified: boolean;
  accountMode: boolean;
  vacationMode: boolean;
  rejectionReason: string;

  // documents: {
  //   panCard: File | null;
  //   aadhaarCard: File | null;
  //   gstCertificate: File | null;
  //   cancelledCheque: File | null;
  // };
}



export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: Admin;
  user?: Admin;
}


export interface GetAdminsResponse {
  success: boolean;
  data: Admin[];
}

export const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",

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

  tagTypes: ["auth"],
  endpoints: (builder) => ({
    adminRegister: builder.mutation<AuthResponse, RegisterPayload>({
      query: (data) => ({
        url: "/admin/register",
        method: "POST",
        body: data,
      }),
    }),

    adminLogin: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: "/admin/login",
        method: "POST",
        body,
      }),
    }),
    getProfile: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
    }),

    getSuperAdminProfile: builder.query<GetAdminsResponse, void>({
      query: () => ({
        url: "/SuperAdmin/users",
        method: "GET",
      }),
    }),


    getUserById: builder.query({
      query: (id) => `/SuperAdmin/users/${id}`,
    }),




    updateAdmin: builder.mutation<AuthResponse, { id: string; body: Partial<UpdatePayload> }>({
      query: ({ id, body }) => ({
        url: `/admin/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

  }),
});

export const {
  useAdminRegisterMutation,
  useAdminLoginMutation,
  useGetProfileQuery,
  useGetSuperAdminProfileQuery,
  useGetUserByIdQuery,
  useUpdateAdminMutation,

} = adminAuthApi;