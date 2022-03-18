import { TableCell, TableRow, Typography } from "@mui/material";
import InputField from "../../InputField";

export default function TableHead({
    control,
    errors,
    register,
    customer,
    customers,
    date,
    address,
    phone,
}) {
    return (
        <>
            {" "}
            <TableRow>
                <TableCell align="left" colSpan={2} style={{ border: "none" }}>
                    <Typography variant="h5"> Chalishkan Company</Typography>
                </TableCell>
                <TableCell align="right" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5"> Date: {date}</Typography>{" "}
                </TableCell>
            </TableRow>{" "}
            <TableRow>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <Typography variant="h5">Address: {address} </Typography>
                </TableCell>
                <TableCell align="left" colSpan={3} style={{ border: "none" }}>
                    <InputField
                        control={control}
                        errors={errors}
                        name="customer"
                        defaultValue=""
                        label="Customer Name"
                        register={register}
                        error={errors.hasOwnProperty("customer")}
                        helperText={errors.customer?.message}
                        select
                        items={customers}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="left" colSpan={4} style={{ border: "none" }}>
                    <Typography variant="h5">Phone: {phone}</Typography>
                </TableCell>
            </TableRow>
        </>
    );
}
