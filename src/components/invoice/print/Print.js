import React, { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import CheckOutTable from "../checkOut/CheckoutTable";
const ComponentToPrint = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <CheckOutTable
                rows={props.rows}
                totalAmount={props.totalAmount}
                paidAmount={props.paidAmount}
                customer={props.customer}
                orderNumber={props.orderNumber}
            />
        </div>
    );
});

export default function App(props) {
    const history = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const ref = useRef();

    return (
        <div container>
            {" "}
            <ComponentToPrint
                ref={ref}
                rows={props.rows}
                totalAmount={props.totalAmount}
                paidAmount={props.paidAmount}
                customer={props.customer}
                orderNumber={props.orderNumber}
            />
            <ReactToPrint
                content={() => ref.current}
                documentTitle={`${props.customer}-${props.orderNumber}`}
                onBeforePrint={() => {
                    enqueueSnackbar(
                        "Please note that after saveing the invoice, the order will be stored and you will be redirected to invoices page.",
                        {
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "center",
                            },
                            variant: "warning",
                        }
                    );
                }}
                onAfterPrint={() => history("/dashboard/invoices")}
            >
                <br />
                <PrintContextConsumer>
                    {({ handlePrint }) => (
                        <>
                            {" "}
                            <Button
                                onClick={() => {
                                    handlePrint();
                                    props.addOreder();
                                }}
                                variant="contained"
                            >
                                Print!
                            </Button>
                        </>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>
        </div>
    );
}
