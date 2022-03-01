import { Button, TableCell, TableRow } from "@mui/material";

export default function renderInvoices({ invoices }) {
    const calculateTotalProductPrice = (price, weight, qty, size) => {
        if (weight !== 0) {
            return weight * (price / 1000);
        } else if (qty !== 0) {
            return qty * price;
        } else if (size !== 0) {
            return size * price;
        }
    };

    return invoices.map((invoice, index) => {
        return (
            <>
                <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{invoice.product}</TableCell>
                    <TableCell align="center">{`${invoice.price}$`}</TableCell>
                    <TableCell align="center">{`${invoice.weight}kg`}</TableCell>
                    <TableCell align="center">{invoice.quantity}</TableCell>
                    <TableCell align="center">{invoice.color}</TableCell>
                    <TableCell align="center">{invoice.size}</TableCell>
                    <TableCell align="center">
                        {`${calculateTotalProductPrice(
                            invoice.price,
                            invoice.weight,
                            invoice.qty,
                            invoice.size
                        )}$`}
                    </TableCell>
                    <TableCell align="center">
                        {
                            <Button
                                onClick={() => {
                                    invoices.splice(index, 1);
                                }}
                            >
                                X
                            </Button>
                        }
                    </TableCell>
                </TableRow>
            </>
        );
    });
}
