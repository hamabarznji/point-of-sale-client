import { TableCell, TableRow, Typography } from "@mui/material";

export default function tableHead({
    date,
    invoiceNumber,
    phone,
    address,
    customer,
}) {
    return (
        <>
            <TableRow>
                <TableCell align="left" colSpan={2} style={{ border: "none" }}>
                    <Typography variant="h5"> Chalishkan Company</Typography>
                </TableCell>
                <TableCell align="right" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5">
                        {" "}
                        Invoice : {invoiceNumber}
                    </Typography>
                </TableCell>
            </TableRow>{" "}
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h5">Address: {address}</Typography>
                </TableCell>
                <TableCell align="right" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5"> Date: {date}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5">Phone: {phone}</Typography>
                </TableCell>
                <TableCell align="right" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h5"> Customer: {customer}</Typography>
                </TableCell>
            </TableRow>
        </>
    );
}
