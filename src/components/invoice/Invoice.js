import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "../ReactTabel";
import OrderService from "../../services/OrderService";
import React from "react";
import moment from "moment";
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
];

export default function Invoice() {
    const history = useNavigate();

    const [orders, setOrders] = React.useState([]);

    const rows = orders.map((order) => {
        return {
            orderId: order.id,
            customerName: order.customerName,
            totalAmount: 20000,
            paidAmount: 20000,
            dueAmount: 0,
            date: moment(order.date).format("DD-MM-YYYY"),
        };
    });

    const getOrders = async () => {
        try {
            const res = await OrderService.gerOrders();
            console.log(res);
            setOrders(res);
            return Promise.resolve(res);
        } catch (err) {
            console.log(err);
            return Promise.reject("Error", err);
        }
    };
    React.useEffect(() => {
        getOrders();
    }, []);
    console.log(orders);
    return (
        <>
            <Button
                variant="outlined"
                onClick={() => history("/dashboard/invoices/createinvoice")}
                style={{ marginLeft: "5rem" }}
            >
                Add Invoice
            </Button>
            <InvoiceTable columns={columns} rows={rows} />
        </>
    );
}
