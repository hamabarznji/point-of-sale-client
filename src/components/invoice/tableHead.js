import { TableCell, TableRow, Typography } from "@mui/material";

export default function tableHead({ date, invoiceNumber, phone, address }) {
    return (
        <>
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h6" color="#7367F0">
                        {" "}
                        Chalishkan Company
                    </Typography>
                </TableCell>
            </TableRow>{" "}
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h7" color="#7367F0">
                        {" "}
                        Phone Number: {phone}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h7" color="#7367F0">
                        {" "}
                        Address: {address}
                    </Typography>{" "}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h7" color="#7367F0">
                        {" "}
                        Invoice : {invoiceNumber}
                    </Typography>{" "}
                </TableCell>
            </TableRow>{" "}
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h7" color="#7367F0">
                        {" "}
                        Date: {date}
                    </Typography>{" "}
                </TableCell>
            </TableRow>
        </>
    );
}
