import { configureStore } from "@reduxjs/toolkit";
import loginSlicer from "./loginAuth";

const store = configureStore({
    reducer: {
        login: loginSlicer.reducer,
    },
});
export default store;
