import { configureStore } from "@reduxjs/toolkit";
import ipReducer from "./feature/ip/ipSlice";
// import {toggleReducer} from "./feature/toggle/toggleSlice"
import loginReducer from "./feature/login/loginSlice";
import toggleReducer from "./feature/toggle/toggleSlice";
import signupReducer from "./feature/auth/signup/signupSlice";
import businessCategoryReducer from "./feature/business-category/businessCategorySlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            ip: ipReducer ,
            toggle: toggleReducer,
            signup: signupReducer,
            businessCategory: businessCategoryReducer,
            login:loginReducer,
        },
    });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']