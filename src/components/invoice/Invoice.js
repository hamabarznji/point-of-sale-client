import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "../ReactTabel";

const columns = [
    { id: "order_id", label: "Order Id", minWidth: 100, align: "center" },
    {
        id: "customerName",
        label: "Customer Name",
        minWidth: 170,
        align: "center",
    },
    { id: "store", label: "Store", minWidth: 170, align: "center" },
    { id: "date", label: "Date", minWidth: 120, align: "center" },
];

const rows = [
    {
        id: "1",
        order_id: "1",
        customerName: "John Doe",
        store: "Store 1",
        date: "2020-01-01",
    },
    {
        id: "2",
        order_id: "2",
        customerName: "John Doe",
        store: "Store 1",
        date: "2020-01-01",
    },
    {
        id: "3",
        order_id: "3",
        customerName: "John Doe",
        store: "Store 1",
        date: "2020-01-01",
    },
    {},
];
export default function Invoice() {
    const history = useNavigate();
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
