import React, { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { Button } from "@mui/material";

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
    const ref = useRef();

    return (
        <div>
            <ReactToPrint content={() => ref.current}>
                <PrintContextConsumer>
                    {({ handlePrint }) => (
                        <Button onClick={handlePrint} variant="contained">
                            Print this out!
                        </Button>
                    )}
                </PrintContextConsumer>
            </ReactToPrint>
            <ComponentToPrint
                ref={ref}
                rows={props.rows}
                totalAmount={props.totalAmount}
                paidAmount={props.paidAmount}
                customer={props.customer}
                orderNumber={props.orderNumber}
            />
        </div>
    );
}
