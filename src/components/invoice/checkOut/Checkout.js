import { Button, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import OrderedProductService from "../../../services/OrderedProductService";
import CheckoutTable from "./CheckoutTable";
import CustomerService from "../../../services/CustomerService";
export default function CheckOout() {
    const [customerName, setCustomerName] = React.useState("");
    const location = useLocation();
    const orderedproducts = location.state.invoice[0].ordredProducts;
    const orderInformation = location.state.invoice[0].orderInformation;
    console.log(orderInformation, "orderInformation");
    console.log(orderedproducts, "orderedproducts");
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

    React.useEffect(() => {
        getCustomer();
    }, []);
    const addOrderedProduct = async () => {
        try {
            const orderInfo = {
                store_id: orderInformation.store_id,
                customer_phone: orderInformation.customer_id,
                user_id: orderInformation.user_id,
                date: orderInformation.date,
            };
            const paymentInfo = {
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
                orderInfo,
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
            style={{ width: "90%", height: "100%", marginLeft: "5rem" }}
        >
            <Grid item lg={12}>
                <CheckoutTable
                    rows={orderedproducts}
                    totalAmount={orderInformation?.totalAmount}
                    paidAmount={orderInformation?.paidAmount}
                    customer={customerName ? customerName : "Unknown"}
                />
            </Grid>
            <Button onClick={addOrderedProduct} variant="contained">
                Add Order
            </Button>
        </Grid>
    );
}
