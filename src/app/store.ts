import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../api/fechingapi"
import { authApi } from "../api/userapi"
import { ProductApi } from "../api/product"
import { orderApi } from "../api/orderApi"

import { adminAuthApi } from "../api/adminAuthApi ";
import { customerApi } from "../api/customerApi"


export const store = configureStore({
    reducer: {

        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [adminAuthApi.reducerPath]: adminAuthApi.reducer,

    },
    middleware: (getDefaulMiddleware) =>
        getDefaulMiddleware().concat(
         
            authApi.middleware,
            ProductApi.middleware,
            orderApi.middleware,
            customerApi.middleware,
            adminAuthApi.middleware,
        )
})

