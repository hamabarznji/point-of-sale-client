import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckoutTableFooter from "../checkOut/CheckoutTableFooter";
import CheckoutTableHeader from "../checkOut/CheckoutTableHeader";

const columns = [
    {
        id: "productName",
        label: "Product Name",
        minWidth: 170,
        align: "center",
    },
    { id: "weight", label: "Weight", minWidth: 170, align: "center" },
    { id: "qty", label: "Qty", minWidth: 170, align: "center" },
    { id: "price", label: "Price", minWidth: 170, align: "center" },
    { id: "totalAmount", label: "Total", minWidth: 170, align: "center" },
    { id: "action", label: "Action", maxWidth: 170, align: "center" },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
export default function CheckoutTable({
    rows,
    totalAmount,
    paidAmount,
    name,
    customer,
    date,
    phone,
    address,
    orderNumber,
    isEditable,
}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <CheckoutTableHeader
                        customer={customer ? customer : null}
                        orderNumber={orderNumber ? orderNumber : null}
                    />
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow
                            key={index}
                            onClick={() => console.log(row, index)}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row?.productName}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row?.weight}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row?.qty}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                {row?.price}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row?.totalAmount}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <CheckoutTableFooter
                    paidAmount={paidAmount ? paidAmount : null}
                    totalAmount={totalAmount ? totalAmount : null}
                />
            </Table>
        </TableContainer>
    );
}
