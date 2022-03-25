import { Button, TableCell, TableRow } from "@mui/material";
import totalPriceCalculator from "../../helper/totalPriceCalculator";
export default function renderInvoices({ ordredProducts, setTotalAmount }) {
    const calculateTotalAmount = (invoices) => {
        let total = 0;
        ordredProducts.map((ordredProduct) => {
            return (total += totalPriceCalculator(
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
                        {ordredProduct.productName}
                    </TableCell>
                    <TableCell align="center">{ordredProduct.price}</TableCell>
                    <TableCell align="center">{ordredProduct.weight}</TableCell>
                    <TableCell align="center">{ordredProduct.qty}</TableCell>
                    <TableCell align="center">{ordredProduct.color}</TableCell>
                    <TableCell align="center">
                        {totalPriceCalculator(
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
