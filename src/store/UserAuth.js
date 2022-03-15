import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
    name: "UserAuth",
    initialState: {
        isAuth: false,
        error: false,
        useRole: "",
        storeId: "",
    },

    reducers: {
        login: (state, action) => {
            state.initialState.isAuth = true;
            state.initialState.error = "";
        },
        // a function to logout user
        logout: (state, action) => {
            localStorage.removeItem("posToken");
            state.initialState.isAuth = false;
            state.initialState.error = "";
        },
        setUserInfo: (state, action) => {
            state.initialState.userRole = action.payload.userRole;
            state.initialState.storeId = action.payload.storeId;
        },
    },
});

export const { login, logout, setUserInfo } = slice.actions;

export default slice.reducer;

export const getIsAuth = (state) => state.login.isAuth;
export const getError = (state) => state.error;
export const getUserRole = (state) => state.useRole;
