import { configureStore } from "@reduxjs/toolkit";
import loginSlicer from "./loginAuth";
import StoreInfo from "./StoreInfo";

const store = configureStore({
    reducer: {
        login: loginSlicer.reducer,
        StoreInfo: StoreInfo.reducer,
    },
});
export default store;
