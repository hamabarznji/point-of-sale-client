import { configureStore } from "@reduxjs/toolkit";
import UserAuth from "./UserAuth";

const store = configureStore({
    reducer: {
        UserAuth: UserAuth.reducer,
    },
});
export default store;
