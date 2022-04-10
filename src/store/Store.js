import { configureStore } from "@reduxjs/toolkit";
import posSlice from "./PosRedux";

const store = configureStore({
    reducer: {
        posRedux: posSlice.reducer,
    },
});

export default store;
