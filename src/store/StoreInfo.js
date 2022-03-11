import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: "",
    store: "",
};
const StoreInfoSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setRole: (state, { payload }) => {
            state.initialState.role = localStorage.getItem("userRole");
        },
        setStore: (state, { payload }) => {
            state.initialState.store = localStorage.getItem("storeId");
        },
    },
});

const { reducer, actions } = StoreInfoSlice;

export default reducer;
export const { setStore, setRole } = actions;

export const getRole = (state) => state.login.role;
export const getStore = (state) => state.login.store;
