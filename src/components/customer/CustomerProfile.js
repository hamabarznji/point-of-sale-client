import React from "react";
import { useParams } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import Tab from "./Tab";
import Card from "./Card";
import { Button, Grid } from "@mui/material";
import ReactTale from "../ReactTabel";
import AddPayment from "./AddPayment";

const columns = [
    { id: "id", label: "Order Id", minWidth: 170, align: "center" },
    {
        id: "totalAmount",
        label: "Total Amount",
        minWidth: 170,
        align: "center",
    },
    {
        id: "paidAmount",
        label: "Paid Amount",
        minWidth: 170,
        align: "center",
    },
    {
        id: "dueAmount",
        label: "Due Amount",
        minWidth: 170,
        align: "center",
    },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];

export default function CustomerProfile() {
    const { id } = useParams();
    console.log(id);
    const [customer, setCustomer] = React.useState();
    const [orderInfo, setOrderInfo] = React.useState();

    const getCustomer = async () => {
        try {
            const data = await CustomerService.getCustomerReport(id);
            console.log(data);
            setOrderInfo(data.debtsInfo);
            setCustomer(data.customerInfo);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    React.useEffect(() => {
        getCustomer();
    }, []);

    const rows = orderInfo?.map((order) => {
        return {
            id: order?.orderId,
            totalAmount: order?.total?.toFixed(2),
            paidAmount: order?.paidAmount,
            dueAmount: order?.dueAmount,
            action: <AddPayment id={order?.orderId} getAll={getCustomer} />,
        };
    });
    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
                spacing={2}
                xs={12}
            >
                <Grid item xs={10}>
                    <Card
                        name={customer?.name}
                        address={customer?.address}
                        phone={customer?.phone}
                        debt={`$${customer?.totalDebtsAmount}`}
                        orders={customer?.numberOfOrders}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ReactTale columns={columns} rows={rows ? rows : []} />
                </Grid>
            </Grid>
        </>
    );
}
