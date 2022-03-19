import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactTabel from "../ReactTabel";
import OrderService from "../../services/OrderService";
import React from "react";
import moment from "moment";
import AddPayment from "./AddPayment";
const columns = [
    { id: "orderId", label: "Order Id", minWidth: 100, align: "center" },
    {
        id: "customerName",
        label: "Customer Name",
        minWidth: 170,
        align: "center",
    },
    {
        id: "totalAmount",
        label: "Total Amount",
        minWidth: 170,
        align: "center",
    },
    { id: "paidAmount", label: "Paid Amount", minWidth: 170, align: "center" },
    { id: "dueAmount", label: "Due Amount", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 120, align: "center" },
    { id: "action", label: "Action", minWidth: 120, align: "center" },
];
/*     Header: "model.attributes.project.name",
                accessor: (value) => value,
                minWidth: 50,
                width: 200,
                disableSortBy: true,
                disableFilters: true,
                isLink: true,
                path: (id) => `/dashboard/projects/${id}`, */
export default function Invoice() {
    const history = useNavigate();

    const [orders, setOrders] = React.useState([]);

    const getOrders = async () => {
        try {
            const res = await OrderService.gerOrders();
            setOrders(res);
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject("Error", err);
        }
    };
    const rows = orders.map((order) => {
        return {
            orderId: order.orderId,
            customerName: order.customerName,
            totalAmount: order.totalAmount,
            paidAmount: order.totalPaidAmount,
            dueAmount: order.totalAmount - order.totalPaidAmount,
            date: moment(order.date).format("DD-MM-YYYY"),
            action: <AddPayment orderId={order.orderId} getAll={getOrders} />,
            path: `orders/${order.orderId}`,
        };
    });

    React.useEffect(() => {
        getOrders();
    }, []);
    return (
        <>
            <Button
                variant="outlined"
                onClick={() => history("/dashboard/invoices/createinvoice")}
                style={{ marginLeft: "5rem" }}
            >
                Add Invoice
            </Button>
            <ReactTabel columns={columns} rows={rows} isPath={true} />
        </>
    );
}
