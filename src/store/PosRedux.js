import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const posRedux = createSlice({
    name: "posRedux",
    initialState: {
        isAuthenticated: false,
        userRole: "",
        storeId: "",
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setRole: (state, action) => {
            state.userRole = localStorage.getItem("userRole");
        },
        setStore: (state, action) => {
            state.storeId = localStorage.getItem("storeId");
        },
    },
});

export const posActions = posRedux.actions;
export default posRedux;
