/* import { TableCell, TableRow, Typography } from "@mui/material";
import InputField from "../../InputField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export default function tableHead({ date, invoiceNumber, phone, address }) {
    const schema = yup.object().shape({
        customer: yup.string().required("Customer name is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

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
                    <InputField
                        control={control}
                        errors={errors}
                        name="customer"
                        defaultValue=""
                        variant="outlined"
                        label="Customer Name"
                        register={register}
                        error={errors.hasOwnProperty("customer")}
                        helperText={errors.customer?.message}
                    />{" "}
                </TableCell>
            </TableRow>
        </>
    );
}
 */
