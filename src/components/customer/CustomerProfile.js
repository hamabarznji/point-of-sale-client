import React from "react";
import { useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";
import Tab from "./Tab";
import Card from "./Card";
import { Grid } from "@mui/material";
export default function CustomerProfile() {
    const { id } = useParams();

    const [customer, setCustomer] = React.useState();

    const getCustomer = async () => {
        try {
            const data = await OrderService.gerOrdersByCustomerPhone(id);
            setCustomer(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    React.useEffect(() => {
        getCustomer();
    }, []);
    return (
        <>
            <Grid
                container
                marginLeft={"5rem"}
                justifyContent="flex-start"
                alignItems="center"
                direction="row"
            ></Grid>
        </>
    );
}
/*        <Grid item lg={3}>
                    <Card labelValue={customer[0].customerName} />
                </Grid>{" "}
                <Grid item lg={3}>
                    <Card labelValue={customer[0].customerPhone} />
                </Grid>{" "}
                <Grid item container>
                    {" "}
                </Grid> */
