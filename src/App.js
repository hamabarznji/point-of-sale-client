import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import Store from "./pages/Store";
import "./App.css";
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
import Report from "./pages/Report";
import PurchaseReport from "./components/report/Purchase";
import SaleReport from "./components/report/Sale";
import axios from "axios";
import UserService from "./services/UserService";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const mainMargin = location.pathname === "/" ? "0" : "12.5%";
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const navigate = useNavigate();

    /*     const isAuthenticated = useSelector(
        (state) => state.posRedux.isAuthenticated
    ); */
    /*
    location.pathname === "/"
        ? console.log(mainMargin, " in the login page")
        : console.log(mainMargin, " in the dashboard page"); */
    const userRole = useSelector((state) => state.posRedux.userRole);
    const reduxAuth = useSelector((state) => state.posRedux.isAuthenticated);

    async function authFunc() {
        const res = await axios.get(`http://localhost:3002/login/auth`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("posToken"),
            },
        });
        setIsAuthenticated(res.data);
        return res.data;
    }

    React.useEffect(() => {
        authFunc();
        dispatch(posActions.setRole());
        dispatch(posActions.setStore());
        dispatch(posActions.setAuth(isAuthenticated));
        if (reduxAuth && location.pathname === "/") {
            navigate("/dashboard");
        }
        if (!reduxAuth && location.pathname.includes("/dashboard")) {
            navigate("/");
        }
        if (localStorage.getItem("posToken") === null) {
            navigate("/");
        }
    }, [isAuthenticated, dispatch, location, reduxAuth, navigate]);
    console.log(localStorage.getItem("storeId"));
    return (
        <SnackbarProvider maxSnack={3} autoHideDuration={4500}>
            <div>
                <header>
                    {location.pathname === "/" ? null : (
                        <>
                            <Drawer />
                        </>
                    )}
                </header>
                <main style={{ marginLeft: mainMargin }}>
                    <Routes>
                        {!reduxAuth && <Route path="/" element={<Login />} />}
                        {reduxAuth && (
                            <>
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
                                <Route
                                    path="/dashboard/reports"
                                    element={<Report />}
                                />
                                <Route
                                    path="/dashboard/reports/purchase"
                                    element={<PurchaseReport />}
                                />{" "}
                                <Route
                                    path="/dashboard/reports/sale"
                                    element={<SaleReport />}
                                />
                            </>
                        )}
                    </Routes>
                </main>
            </div>
        </SnackbarProvider>
    );
}

export default App;
