import { Button, TableCell, TableRow } from "@mui/material";

export default function renderInvoices({ ordredProducts, setTotalAmount }) {
    const calculateTotalProductPrice = (price, weight, qty) => {
        if (weight !== 0) {
            return weight * price;
        } else if (qty !== 0) {
            return qty * price;
        }
    };
    const calculateTotalAmount = (invoices) => {
        let total = 0;
        ordredProducts.map((ordredProduct) => {
            return (total += calculateTotalProductPrice(
                ordredProduct.price,
                ordredProduct.weight,
                ordredProduct.qty
            ));
        });
        setTotalAmount(total);
    };
    calculateTotalAmount(ordredProducts);
    const Rows = () => {
        return ordredProducts.map((ordredProduct, index) => {
            return (
                <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                        {ordredProduct.product}
                    </TableCell>
                    <TableCell align="center">{ordredProduct.price}</TableCell>
                    <TableCell align="center">{ordredProduct.weight}</TableCell>
                    <TableCell align="center">{ordredProduct.qty}</TableCell>
                    <TableCell align="center">{ordredProduct.color}</TableCell>
                    <TableCell align="center">
                        {calculateTotalProductPrice(
                            ordredProduct.price,
                            ordredProduct.weight,
                            ordredProduct.qty
                        )}
                    </TableCell>
                    <TableCell align="center">
                        <Button
                            color="secondary"
                            onClick={() => {
                                ordredProducts.splice(index, 1);
                                calculateTotalAmount(ordredProducts);
                            }}
                        >
                            X
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
    };
    return <Rows />;
}
