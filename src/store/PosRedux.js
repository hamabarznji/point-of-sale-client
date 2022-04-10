import { createSlice } from "@reduxjs/toolkit";

const posRedux = createSlice({
    name: "posRedux",
    initialState: {
        isAuthenticated: false,
        userRole: "",
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setRole: (state, action) => {
            state.userRole = localStorage.getItem("userRole");
        },
    },
});

export const posActions = posRedux.actions;
export default posRedux;
