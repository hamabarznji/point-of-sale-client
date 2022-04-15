import React, { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/LocalPrintshopRounded";
import CheckOutTable from "../invoice/checkOut/CheckoutTable";
const ComponentToPrint = forwardRef(
    ({ Table, rows, totalAmount, customer, orderNumber, paidAmount }, ref) => {
        return <div ref={ref}>{Table}</div>;
    }
);
/* const ComponentToPrint = forwardRef(
    ({ rows, totalAmount, customer, orderNumber, paidAmount }, ref) => {
        return (
            <div ref={ref}>
                <CheckOutTable
                    rows={rows}
                    totalAmount={totalAmount}
                    paidAmount={paidAmount}
                    customer={customer}
                    orderNumber={orderNumber}
                />
            </div>
        );
    }
); */
export default function Print({ documentTitle, onSubmit, Table }) {
    const history = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const ref = useRef();

    return (
        <div container>
            <ComponentToPrint ref={ref} Table={Table} />
            <ReactToPrint
                content={() => ref.current}
                documentTitle={documentTitle}
                onPrintError={(err) =>
                    enqueueSnackbar(err.message, {
                        variant: "error",
                    })
                }
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
                            <IconButton
                                onClick={() => {
                                    handlePrint();
                                    onSubmit();
                                }}
                                variant="contained"
                            >
                                <PrintIcon
                                    color="primary"
                                    sx={{ fontSize: 35 }}
                                />
                            </IconButton>
                        </>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>
        </div>
    );
}
