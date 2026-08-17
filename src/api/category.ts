import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = import.meta.env.VITE_API_URL;

export interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryResponse {
  success: boolean;
  message?: string;
  count?: number;
  data: Category[];
}

export interface SingleCategoryResponse {
  success: boolean;
  message?: string;
  data: Category;
}

export const categoryApi = createApi({
  reducerPath: "categoryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/api`,
  }),

  tagTypes: ["Category"],

  endpoints: (builder) => ({
    // Get All Categories
    getCategories: builder.query<CategoryResponse, void>({
      query: () => "/category",
      providesTags: ["Category"],
    }),

    // Get Single Category
    getCategory: builder.query<SingleCategoryResponse, string>({
      query: (id) => `/category/${id}`,
      providesTags: ["Category"],
    }),

    // Create Category
    addCategory: builder.mutation<
      SingleCategoryResponse,
      {
        name: string;
        isActive: boolean;
      }
    >({
      query: (body) => ({
        url: "/category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update Category
    updateCategory: builder.mutation<
      SingleCategoryResponse,
      {
        id: string;
        name: string;
        isActive: boolean;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete Category
    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;