import { TableCell, TableRow } from "@mui/material";

const columns = [
    { id: "#", label: "#", minWidth: 100, align: "center" },
    { id: "product", label: "Product", minWidth: 170, align: "center" },
    { id: "price", label: "Price", minWidth: 170, align: "center" },
    { id: "weight", label: "Weight", minWidth: 170, align: "center" },
    { id: "qty", label: "Qty", minWidth: 170, align: "center" },
    { id: "total", label: "Total", minWidth: 170, align: "center" },
    { id: "action", label: "", minWidth: 170, align: "center" },
];
export default function columnNames() {
    return (
        <>
            <TableRow
                style={{
                    background: "black",
                }}
            >
                {columns.map((column, index) => {
                    return (
                        <TableCell
                            align="center"
                            style={{ color: "white" }}
                            key={index}
                        >
                            {column.label}
                        </TableCell>
                    );
                })}
            </TableRow>
        </>
    );
}
