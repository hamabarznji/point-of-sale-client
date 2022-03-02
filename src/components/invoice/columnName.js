import { TableCell, TableRow } from "@mui/material";

export default function columnNames({ invoices, setTotalAmount }) {
    return (
        <>
            {" "}
            <TableRow
                style={{
                    background: "black",
                }}
            >
                <TableCell align="center" style={{ color: "white" }}>
                    #
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                    Product Name
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                    Price
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                    Weight
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                    Quantity
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                    Color
                </TableCell>

                <TableCell align="center" style={{ color: "white" }}>
                    Total
                </TableCell>
                <TableCell
                    align="center"
                    style={{ color: "white" }}
                ></TableCell>
            </TableRow>
        </>
    );
}
