import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import "./App.css";
import Drawer from "./layout/Drawer";
import { SnackbarProvider } from "notistack";
function App() {
    const location = useLocation();

    const mainMargin = location.pathname === "/" ? "0" : "240px";
    /* 
    location.pathname === "/"
        ? console.log(mainMargin, " in the login page")
        : console.log(mainMargin, " in the dashboard page"); */

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
                        />
                        <Route
                            path="/dashboard/employees"
                            element={<Employee />}
                        />
                    </Routes>
                </main>
            </div>
        </SnackbarProvider>
    );
}

export default App;
