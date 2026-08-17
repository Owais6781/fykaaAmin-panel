import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../api/fechingapi"
import { authApi } from "../api/userapi"
import { ProductApi } from "../api/product"
import { orderApi } from "../api/orderApi"
import { reviewApi } from "../api/review"
import { adminAuthApi } from "../api/adminAuthApi";
import { customerApi } from "../api/customerApi"
import { bannerApi } from "../api/Banner"
import {contactApi} from "../api/contact"
import {categoryApi} from "../api/category"
 import {couponApi} from "../api/coupon"

export const store = configureStore({
    reducer: {

        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [couponApi.reducerPath]: couponApi.reducer,

    },
    middleware: (getDefaulMiddleware) =>
        getDefaulMiddleware().concat(

            authApi.middleware,
            ProductApi.middleware,
            orderApi.middleware,
            reviewApi.middleware,
            adminAuthApi.middleware,
            customerApi.middleware,
            bannerApi.middleware,
            contactApi.middleware,
            categoryApi.middleware,
            couponApi.middleware,
        )
})

