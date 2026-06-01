


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Api = import.meta.env.VITE_API_URL;

export interface OrderPayloadItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderPayloadItem[];
  paymentMethod: "COD" | "ONLINE";
}




export interface Order {
  _id: string;
  orderId?: string;
  transactionId?: string;

  orderStatus: string;
  paymentStatus: string;

  totalAmount?: number;
  paymentMethod?: "COD" | "ONLINE";
  createdAt?: string;
  updatedAt?: string;
  deliveredAt?: string;

  userInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: {
      line1?: string;
      city?: string;
      state?: string;
      pincode?: string;
      country?: string;
    };
  };

  items?: {
    productId?: string;
    title?: string;
    price?: number;
    discountPrice?: number;
    quantity?: number;
    image?: string;
    category?: string;
  }[];
}




export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Api}/api`,
    credentials: "include",
    prepareHeaders: (headers, ) => {
       const token = localStorage.getItem("token");

      // const token = (getState() as any)?.auth?.token;



      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Orders"],


  endpoints: (builder) => ({
    // working code
    createOrder: builder.mutation({
      query: (data: CreateOrderPayload) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),




    // working code
    updateOrderStatus: builder.mutation({
      query: ({ id, orderStatus, paymentStatus }) => ({
        url: `/order/update-status/${id}`,
        method: "PUT",
        body: { orderStatus, paymentStatus },
      }),
      invalidatesTags: ["Orders"],
    }),


    // getMyOrders: builder.query<{ success: boolean; orders: Order[] }, void>({
    //   query: () => "/my-orders",
    //   providesTags: ["Orders"],
    // }),


    getMyOrders: builder.query<{ success: boolean; orders: Order[] }, void>({
      query: () => ({
        url: "/my-orders",
        method: "GET",
      }),
    }),


  }),
});




export const {
  useCreateOrderMutation,
 useGetMyOrdersQuery,
  useUpdateOrderStatusMutation
} = orderApi;







