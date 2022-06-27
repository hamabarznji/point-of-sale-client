import { render, fireEvent, screen } from "@testing-library/react";
import Dahsboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Store from "./pages/Store";
import Customer from "./pages/Customer";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";

test("Login Page", () => {
    render(
        <Provider store={store}>
            <SnackbarProvider maxSnack={3} autoHideDuration={4500}>
                <Router>
                    <Login />
                </Router>
            </SnackbarProvider>
        </Provider>
    );
});
test("Dashboard Page", () => {
    render(<Dahsboard />);
    const x = screen.getByText("Prodcuts");
    expect(x).toBeInTheDocument();
});
test("Customer Page", () => {
    const queryClient = new QueryClient();

    render(
        <QueryClientProvider client={queryClient}>
            <Router>
                <Customer />
            </Router>
        </QueryClientProvider>
    );
});
