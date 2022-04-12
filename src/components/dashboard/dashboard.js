import Grid from "@mui/material/Grid";
import orderIcon from "../../assets/order.png";
import saleIcon from "../../assets/sales.png";
import debtIcon from "../../assets/debt.png";
import customerIcon from "../../assets/customer.png";
import productIcon from "../../assets/cubes.png";
import transferIcon from "../../assets/transfer.png";
import DashboardService from "../../services/DashboardService";
import Card from "./CardComponent";
import React from "react";
export default function Dashboard() {
    const [dashboard, setDashboard] = React.useState([]);

    const getDashboard = async () => {
        try {
            const res = await DashboardService.getDashboard();
            setDashboard(res);
            return Promise.resolve(res);
        } catch (e) {
            return Promise.reject(e);
        }
    };
    React.useEffect(() => {
        getDashboard();
    }, []);

    const CardRender = () => {
        return (
            <>
                <Grid item>
                    <Card
                        title="Prodcuts"
                        icon={productIcon}
                        content={dashboard?.numberofProducts}
                    />
                </Grid>
                <Grid item>
                    <Card
                        icon={transferIcon}
                        title="Transfareed Products"
                        content={dashboard?.numberofTransfareedProducts}
                    />
                </Grid>
                <Grid item>
                    <Card
                        icon={customerIcon}
                        title="Customers"
                        content={dashboard?.numberofCustomers}
                    />
                </Grid>
                <Grid item>
                    <Card
                        icon={orderIcon}
                        title="Orders"
                        content={dashboard?.numberofOrders}
                    />
                </Grid>
                <Grid item>
                    <Card
                        icon={saleIcon}
                        title="Sales"
                        content={`$${dashboard?.sales}`}
                    />
                </Grid>
                <Grid item>
                    <Card
                        icon={debtIcon}
                        title="Debts"
                        content={`$${dashboard?.totalDebtsAmount}`}
                    />
                </Grid>
            </>
        );
    };

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                marginTop="1rem"
                xs={12}
            >
                {<CardRender />}
            </Grid>
        </>
    );
}
