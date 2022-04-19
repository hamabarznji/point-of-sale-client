import React from "react";
import { useParams } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import Card from "./Card";
import { Grid } from "@mui/material";
import ReactTable from "../ReactTabel";
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
    const [customer, setCustomer] = React.useState();
    const [orderInfo, setOrderInfo] = React.useState();

    const getCustomer = async () => {
        try {
            const data = await CustomerService.getCustomerReport(id);
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

            totalAmount: `$${order?.total}`,
            paidAmount: `$${order?.paidAmount}`,
            dueAmount: `$${order?.dueAmount}`,
            action: !order?.dueAmount == 0 && (
                <AddPayment
                    id={order?.orderId}
                    getAll={getCustomer}
                    dueAmount={order.dueAmount}
                />
            ),
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
                    <ReactTable columns={columns} rows={rows ? rows : []} />
                </Grid>
            </Grid>
        </>
    );
}
