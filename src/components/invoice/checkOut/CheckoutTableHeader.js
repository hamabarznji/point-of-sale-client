import { TableCell, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import StoreService from "../../../services/StoreService";

export default function CheckoutTableHeader({ customer }) {
    const [store, setStore] = useState();

    useEffect(() => {
        getStore();
    }, []);
    const getStore = async () => {
        try {
            const data = await StoreService.getStore(
                localStorage.getItem("storeId")
            );
            setStore(data);
            return Promise.resolve(data);
        } catch (err) {
            return Promise.reject(err);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell align="left" colSpan={2} style={{ border: "none" }}>
                    <Typography variant="h5"> Chalishkan Company</Typography>
                </TableCell>
                <TableCell align="right" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5">
                        {moment().format("YYYY-MM-DD")}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left" colSpan={2} style={{ border: "none" }}>
                    <Typography variant="h5"> {store?.location}</Typography>
                </TableCell>
                <TableCell align="right" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5"> {customer}</Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left" colSpan={2} style={{ border: "none" }}>
                    <Typography variant="h5"> {store?.phone}</Typography>
                </TableCell>
            </TableRow>
        </>
    );
}
