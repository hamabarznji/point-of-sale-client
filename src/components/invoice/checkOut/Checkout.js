import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import OrderedProductService from "../../../services/OrderedProductService";
import CustomerService from "../../../services/CustomerService";
import OrderService from "../../../services/OrderService";
import Print from "../../print/Print";
import CheckoutTable from "./CheckoutTable";

export default function CheckOout() {
    const [customerName, setCustomerName] = React.useState("");
    const [orderDetails, setOrderDetails] = React.useState();
    const location = useLocation();
    const orderedproducts = location.state.invoice[0].ordredProducts;
    const orderInformation = location.state.invoice[0].orderInformation;
    const getCustomer = async () => {
        try {
            const customer = await CustomerService.getCustomer(
                orderInformation.customer_id
            );
            setCustomerName(customer.name);
            return Promise.resolve(customer);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    const addOrder = async () => {
        try {
            const order = await OrderService.addOrder({
                store_id: orderInformation.store_id,
                customer_phone: orderInformation.customer_id,
                user_id: orderInformation.user_id,
                date: orderInformation.date,
            });

            setOrderDetails(order);
            return Promise.resolve(order);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    React.useEffect(() => {
        getCustomer();
        addOrder();
    }, []);
    const addOrderedProduct = async () => {
        try {
            const paymentInfo = {
                order_id: orderDetails?.id,
                amount: orderInformation.paidAmount,
                paid_date: orderInformation.date,
            };
            const ops = orderedproducts.map((item) => {
                return {
                    transfareedProduct_id: item.transfareedProductId,
                    qty: item.qty,
                    weight: item.weight,
                    price: item.price,
                };
            });

            const res = await OrderedProductService.addOrder({
                orderDetails,
                paymentInfo,
                ops,
            });

            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    };
    return (
        <Grid
            container
            style={{
                width: "90%",
                height: "100%",
                marginLeft: "5rem",
                top: "0%",
            }}
            spacing={1}
            justifyContent="flex-start"
            direction="column"
        >
            <Grid item>
                <Print
                    Table={
                        <CheckoutTable
                            rows={orderedproducts}
                            totalAmount={orderInformation?.totalAmount}
                            paidAmount={orderInformation?.paidAmount}
                            customer={customerName ? customerName : "Unknown"}
                            orderNumber={orderDetails?.id}
                        />
                    }
                    onSubmit={addOrderedProduct}
                    documentTitle={`${customerName}-${orderDetails?.id}`}
                />
            </Grid>
            <Grid item></Grid>
        </Grid>
    );
}
