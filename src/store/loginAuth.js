import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: false,
    error: false,
};
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginPending: (state, action) => {
            state.initialState.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.initialState.isAuth = true;
            state.initialState.error = "";
        },
    },
    loginFail: (state, { payload }) => {
        state.initialState.isLoading = false;

        state.initialState.error = payload;
    },
});

const { reducer, actions } = loginSlice;

export default reducer;
export const { loginPending, loginSuccess, loginFail } = actions;
