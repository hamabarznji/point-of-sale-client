import { createSlice } from "@reduxjs/toolkit";
import TransfareedProductService from "../services/TransfareedProductService";
import ProductService from "../services/ProductService";

let posRedux = createSlice({
    name: "posRedux",
    initialState: {
        isAuthenticated: false,
        userRole: "",
        storeId: "",
        badgeContent: 0,
        notifications: [],
        isLoggedOut: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setRole: (state) => {
            state.userRole = localStorage.getItem("userRole");
        },
        setStore: (state) => {
            state.storeId = localStorage.getItem("storeId");
        },
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        setBadgeContent: (state, action) => {
            state.badgeContent = action.payload;
        },
        setLogout: (state, action) => {
            state.isLoggedOut = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("posToken");
            state.isAuthenticated = false;
            state.isLoggedOut = true;
        },
        /* login: (state, action) => {
            const { id, token, role, store_id } = action.payload;

            localStorage.setItem("userId", id);

            localStorage.setItem("posToken", token);
            localStorage.setItem("userRole", role);
             localStorage.setItem("storeId", store_id);
            state.isAuthenticated = true;
            state.isLoggedOut = false;
        },
 */
        tokenSet: (state, action) => {
            if (!action.payload) {
                localStorage.removeItem("posToken", action.payload);
                return;
            }
            localStorage.setItem("posToken", action.payload);
        },
    },
});

export const posActions = posRedux.actions;
export const { setBadgeContent, setNotifications } = posRedux.actions;

export default posRedux;

export const clearAuth = () => (dispatch) => {
    const token = localStorage.getItem("posActions");
    if (!token) {
        return Promise.reject("NO_STORAGE_TOKEN");
    }
    dispatch(posActions.setAuth(false));
    dispatch(posActions.tokenSet(null));
    return Promise.resolve("Auth is Cleared");
};
export const getNotifications = () => async (dispatch, useSelector) => {
    const notifications = useSelector((state) => state.posRedux.notifications);
    const badgeContent = useSelector((state) => state.posRedux.badgeContent);

    if (localStorage.getItem("userRole") === "accountant") {
        try {
            const res =
                await TransfareedProductService.getTransfareedProductsNotifications();
            dispatch(setNotifications(res.data));
            dispatch(setBadgeContent(res.badgeContent));
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    } else if (localStorage.getItem("userRole") === "warehouse") {
        try {
            const res = await ProductService.getProductsNotifications();
            dispatch(setNotifications(res.data));
            dispatch(setBadgeContent(res.badgeContent));
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    } else {
        try {
            const product = await ProductService.getProductsNotifications();
            const transfaree =
                await TransfareedProductService.getTransfareedProductsNotifications();
            const notis = product.data.concat(transfaree.data);
            dispatch(setNotifications(notis));
            dispatch(
                setBadgeContent(product.badgeContent + transfaree.badgeContent)
            );

            return Promise.resolve(notifications);
        } catch (err) {
            return Promise.reject(err);
        }
    }
};
