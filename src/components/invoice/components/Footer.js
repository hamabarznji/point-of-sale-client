import { Button, TableCell, TableRow, Typography } from "@mui/material";

export default function Footer({
    setOrderedProducts,
    totalAmount,
    checkOutHandler,
    isInvoice,
}) {
    return (
        isInvoice && (
            <TableRow
                style={{ background: "#EDE6D9" }}
                setOrderedProducts={setOrderedProducts}
            >
                <TableCell>
                    {" "}
                    <Typography variant="h5">Total:</Typography>{" "}
                </TableCell>
                <TableCell align="center">
                    <Typography variant="h5">${totalAmount}</Typography>
                </TableCell>
                <TableCell align="center">
                    <Button onClick={checkOutHandler}>Checkout</Button>
                </TableCell>
            </TableRow>
        )
    );
}
