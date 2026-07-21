import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  productId: string;
  userId: string;
  createdAt: string;
}

export interface GetAllReviewsResponse {
  success: boolean;
  reviewCount: number;
  reviews: Review[];
}



const Api = import.meta.env.VITE_API_URL


export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${Api}/api`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }

            return headers
        }


    }),
    tagTypes: ["Review", "Product"],
    endpoints: (builder) => ({
        addReview: builder.mutation({
            query: (body) => ({
                url: "/review/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Review", "Product"],
        }),

        getReviews: builder.query({
            query: (productId) => `/review/${productId}`,
            providesTags: ["Review"],
        }),


          getAllReviews: builder.query<GetAllReviewsResponse,void>({
            query: () => `/reviews`,
            providesTags: ["Review"],
        }),
    }),
});

export const {
    useAddReviewMutation,
    useGetReviewsQuery,
    useGetAllReviewsQuery,
} = reviewApi;