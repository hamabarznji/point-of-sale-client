import { TableCell, TableRow } from "@mui/material";

export default function CheckoutTableFooter({ totalAmount, paidAmount }) {
    return (
        <>
            {" "}
            <TableRow style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                <TableCell rowSpan={3} />
                <TableCell
                    colSpan={2}
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                    Total Amount
                </TableCell>
                <TableCell
                    align="right"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                    {totalAmount}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    colSpan={2}
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                    Paid Amount
                </TableCell>
                <TableCell
                    align="right"
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                >
                    {paidAmount}
                </TableCell>
            </TableRow>
        </>
    );
}
