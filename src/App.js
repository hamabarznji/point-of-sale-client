import "./App.css";
import {
    Route,
    Routes,
    useLocation,
    useNavigate,
    Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import Store from "./pages/Store";
import Drawer from "./layout/Drawer";
import { SnackbarProvider } from "notistack";
import User from "./pages/User";
import Expense from "./pages/Expense";
import Invoice from "./pages/Invoice";
import InvoiceDetails from "./components/invoice/InvoiceDetails";
import CreateInvoice from "./pages/CreateInvoice";
import TransfareedProduct from "./pages/TransfareedProduct";
import CheckOut from "./components/invoice/checkOut/Checkout";
import CustomerProfile from "./components/customer/CustomerProfile";
import { posActions } from "../src/store/PosRedux";

import axios from "axios";
import { getNotifications } from "./store/PosRedux";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const mainMargin = location.pathname === "/" ? "0" : "12.5%";
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const navigate = useNavigate();
    const queryClient = new QueryClient();

    /*     const isAuthenticated = useSelector(
        (state) => state.posRedux.isAuthenticated
    ); */
    /*
    location.pathname === "/"
        ? console.log(mainMargin, " in the login page")
        : console.log(mainMargin, " in the dashboard page"); */
    const reduxAuth = useSelector((state) => state.posRedux.isAuthenticated);
    const isLoggedOut = useSelector((state) => state.posRedux.isLoggedOut);

    async function authFunc() {
        try {
            const res = await axios.get(`http://localhost:3002/login/auth`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("posToken"),
                },
            });
            setIsAuthenticated(res.data);

            return res.data;
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        authFunc();
        if (isAuthenticated) {
            dispatch(getNotifications());
            dispatch(posActions.setRole());
            dispatch(posActions.setStore());
        }
        dispatch(posActions.setAuth(isAuthenticated));
    }, [isAuthenticated, dispatch, location, reduxAuth, navigate]);

    React.useEffect(() => {
        // check if user is authenticated and redirect to dashboard
        if (isAuthenticated && location.pathname === "/") {
            navigate("/dashboard");
        }
        if (!isAuthenticated && location.pathname !== "/") {
            navigate("/");
        }
        if (isLoggedOut) {
            navigate("/");
        }
    });
    return (
        <QueryClientProvider client={queryClient}>
            <SnackbarProvider maxSnack={3} autoHideDuration={4500}>
                <div>
                    <header>
                        {location.pathname === "/" ? null : <Drawer />}
                    </header>
                    <main style={{ marginLeft: mainMargin }}>
                        <Routes>
                            <>
                                <Route path="/" element={<Login />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                    exact
                                />
                                <Route
                                    path="/dashboard/products"
                                    element={<Product />}
                                />
                                <Route
                                    path="/dashboard/customers"
                                    element={<Customer />}
                                />{" "}
                                <Route
                                    path="/dashboard/customers/:id"
                                    element={<CustomerProfile />}
                                />
                                <Route
                                    path="/dashboard/employees"
                                    element={<Employee />}
                                />{" "}
                                <Route
                                    path="/dashboard/users"
                                    element={<User />}
                                />
                                <Route
                                    path="/dashboard/expenses"
                                    element={<Expense />}
                                />
                                <Route
                                    path="/dashboard/stores"
                                    element={<Store />}
                                />
                                <Route
                                    path="/dashboard/invoices"
                                    element={<Invoice />}
                                />
                                <Route
                                    path="/dashboard/invoices/createinvoice"
                                    element={<CreateInvoice />}
                                />{" "}
                                <Route
                                    path="/dashboard/invoices/:id"
                                    element={<InvoiceDetails />}
                                />
                                <Route
                                    path="/dashboard/transfareedproducts"
                                    element={<TransfareedProduct />}
                                />
                                <Route
                                    path="/dashboard/invoices/checkout"
                                    element={<CheckOut />}
                                />
                            </>
                        </Routes>
                    </main>
                </div>
            </SnackbarProvider>
        </QueryClientProvider>
    );
}

export default App;
