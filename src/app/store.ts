import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "../api/fechingapi"
import { authApi } from "../api/userapi"

 export const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        [authApi.reducerPath]:authApi.reducer,

    },
    middleware:(getDefaulMiddleware)=>
        getDefaulMiddleware().concat(
            apiSlice.middleware,
            authApi.middleware,
        )
 })

 