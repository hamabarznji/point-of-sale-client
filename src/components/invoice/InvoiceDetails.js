import { useLocation } from "react-router-dom";
import Print from "../print/Print";
import EditInvoiceTable from "./components/EditInvoiceTable";
import OrderedProductService from "../../services/OrderedProductService";
import React from "react";
import moment from "moment";
import { Button } from "@mui/material";
export default function InvoiceDetails() {
    const id = useLocation().pathname.split("/")[3];

    const [orderInfo, setOrderInfo] = React.useState({});
    const [orderedproducts, setOrderedproducts] = React.useState([]);
    const [listOfUpdatedproducts, setListOfUpdatedproducts] = React.useState(
        []
    );

    const getOrderedProducts = async () => {
        try {
            const res = await OrderedProductService.getOrderedProducts(id);
            setOrderedproducts(res.orderedProducts);
            setOrderInfo({
                orderId: res.orderId,
                customerPhone: res.customerPhone,
                customerName: res.customerName,
                date: moment(res.date).format("YYYY-MM-DD"),
                userId: res.userId,
                storeId: res.storeId,
                totalAmount: `$${res.totalAmount ? res.totalAmount : 0}`,
                paidAmount: `$${res.totalPayments ? res.totalPayments : 0}`,
                dueAmount: res.dueAmount,
            });
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject("Error", err);
        }
    };

    React.useEffect(() => {
        getOrderedProducts();
    }, []);

    const rows = orderedproducts.map((product) => {
        return {
            productName: product.productName,
            weight: product.weight,
            qty: product.qty,
            price: `$${product.price}`,
            totalAmount: `$${product.totalAmount.toFixed(2)}`,
            action: "edit",
        };
    });
    return (
        <>
            <Print
                Table={
                    <EditInvoiceTable
                        rows={rows}
                        totalAmount={orderInfo?.totalAmount.toFixed(2)}
                        paidAmount={orderInfo?.paidAmount.toFixed(2)}
                        customer={
                            orderInfo.customerName
                                ? orderInfo.customerName
                                : "Unknown"
                        }
                        orderNumber={orderInfo?.orderId}
                    />
                }
                onSubmit={() => {
                    console.log("here");
                }}
                documentTitle={"hey"}
            />
        </>
    );
}
