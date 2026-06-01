import { configureStore } from "@reduxjs/toolkit"
import  authReducer   from "../api/fechingapi"
import { authApi } from "../api/userapi"
import { ProductApi } from "../api/product"
import { orderApi } from "../api/orderApi"

import {adminAuthApi} from "../api/adminAuthApi ";


export const store = configureStore({
    reducer: {
        
       auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,

    },
    middleware: (getDefaulMiddleware) =>
        getDefaulMiddleware().concat(
            // apiSlice.middleware,
            authApi.middleware,
            ProductApi.middleware,
            orderApi.middleware,
            adminAuthApi.middleware,
        )
})

