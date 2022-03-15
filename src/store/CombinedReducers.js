import { combineReducers } from "@reduxjs/toolkit";
import UserAuthReducer from "./UserAuth";

export default combineReducers({
    UserAuth: UserAuthReducer,
});
