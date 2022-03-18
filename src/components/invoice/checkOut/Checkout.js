import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import OrderedProductService from "../../../services/OrderedProductService";
import ReactTabel from "../../ReactTabel";
import CheckoutTable from "./CheckoutTable";
import PaymentService from "../../../services/PaymentService";
export default function CheckOout() {
    const location = useLocation();
    const orderedproducts = location.state.invoice[0].ordredProducts;
    const orderInformation = location.state.invoice[0].orderInformation;
    const addOrder = async () => {
        try {
            const res = await OrderService.addOrder({
                store_id: orderInformation.store_id,
                customer_phone: orderInformation.customer_id,
                user_id: orderInformation.user_id,
                date: orderInformation.date,
            });

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const addOrderedProduct = async () => {
        try {
            const order = await addOrder();

            const op = orderedproducts.map((item) => {
                return {
                    order_id: order.id,
                    transfareedProduct_id: 1,
                    qty: item.qty,
                    weight: item.weight,
                    price: item.price,
                };
            });
            const res = await OrderedProductService.addOrder(op);
            await PaymentService.addPayment({
                order_id: 1,
                amount: orderInformation.paidAmount,
                paid_date: orderInformation.date,
            });

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return (
        <Grid
            container
            style={{ width: "90%", height: "100%", marginLeft: "5rem" }}
        >
            <Grid item lg={12}>
                <CheckoutTable
                    rows={orderedproducts}
                    totalAmount={orderInformation?.totalAmount}
                    paidAmount={orderInformation?.paidAmount}
                />
            </Grid>
            <Button onClick={addOrderedProduct} variant="contained">
                Add Order
            </Button>
        </Grid>
    );
}

/*     <Grid
                item
                container
                style={{ width: "90%", height: "100%", marginLeft: "5rem" }}
                direction="column"
                spacing={0}
            >
                <Grid>
                    <Typography variant="h4">Chalishkan</Typography>
                </Grid>
                <Grid>
                    <Typography variant="h4">0750xxxxxx</Typography>
                </Grid>
                <Grid>
                    <Typography variant="h4">Koya Road</Typography>
                </Grid>
            </Grid>
 */
