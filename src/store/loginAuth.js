import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    error: false,
};
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.initialState.isAuth = true;
            state.initialState.error = "";
        },
        // a function to logout user
        logout: (state, { payload }) => {
            localStorage.removeItem("posToken");
            state.initialState.isAuth = false;
            state.initialState.error = "";
        },
    },
});

// if jwt is valid, set isAuth to true
// if jwt is invalid, set isAuth to false
// if jwt is not present, set isAuth to false
// if jwt is expired, set isAuth to false
// if jwt is present but expired, set isAuth to false
// if jwt is present but invalid, set isAuth to false
// if jwt is present but not expired, set isAuth to true

const { reducer, actions } = loginSlice;

export default reducer;
export const { login, logout } = actions;

export const getIsAuth = (state) => state.login.isAuth;
export const getError = (state) => state.error;
