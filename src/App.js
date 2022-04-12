import { Route, Routes, useLocation } from "react-router-dom";
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
import CreateInvoice from "./pages/CreateInvoice";
import TransfareedProduct from "./pages/TransfareedProduct";
import CheckOut from "./components/invoice/checkOut/Checkout";
import CustomerProfile from "./components/customer/CustomerProfile";
import { posActions } from "../src/store/PosRedux";
import Report from "./pages/Report";
import ExpenseReport from "./components/report/Expense";
import StoreReport from "./components/report/Store";
import DebtReport from "./components/report/Debt";
import WarehouseReport from "./components/report/Warehouse";
import PurchaseReport from "./components/report/Purchase";
import SaleReport from "./components/report/Sale";
function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const mainMargin = location.pathname === "/" ? "0" : "12.5%";
    /*     const isAuthenticated = useSelector(
        (state) => state.posRedux.isAuthenticated
    ); */
    const userRole = useSelector((state) => state.posRedux.userRole);

    /*
    location.pathname === "/"
        ? console.log(mainMargin, " in the login page")
        : console.log(mainMargin, " in the dashboard page"); */

    React.useEffect(() => {
        dispatch(posActions.setRole());
    });
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
                        <Route path="/dashboard/users" element={<User />} />
                        <Route
                            path="/dashboard/expenses"
                            element={<Expense />}
                        />
                        <Route path="/dashboard/stores" element={<Store />} />
                        <Route
                            path="/dashboard/invoices"
                            element={<Invoice />}
                        />
                        <Route
                            path="/dashboard/invoices/createinvoice"
                            element={<CreateInvoice />}
                        />
                        <Route
                            path="/dashboard/transfareedproducts"
                            element={<TransfareedProduct />}
                        />
                        <Route
                            path="/dashboard/invoices/checkout"
                            element={<CheckOut />}
                        />
                        <Route path="/dashboard/reports" element={<Report />} />
                        <Route
                            path="/dashboard/reports/expense"
                            element={<ExpenseReport />}
                        />{" "}
                        <Route
                            path="/dashboard/reports/store"
                            element={<StoreReport />}
                        />{" "}
                        <Route
                            path="/dashboard/reports/debt"
                            element={<DebtReport />}
                        />
                        <Route
                            path="/dashboard/reports/warehouse"
                            element={<WarehouseReport />}
                        />{" "}
                        <Route
                            path="/dashboard/reports/purchase"
                            element={<PurchaseReport />}
                        />{" "}
                        <Route
                            path="/dashboard/reports/sale"
                            element={<SaleReport />}
                        />
                    </Routes>
                </main>
            </div>
        </SnackbarProvider>
    );
}

export default App;
