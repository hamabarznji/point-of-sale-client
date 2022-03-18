import { Button, Grid, TableCell, TableRow, Typography } from "@mui/material";
import InputField from "../../InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export default function Footer({
    setOrderedProducts,
    totalAmount,
    checkOutHandler,
    isInvoice,
}) {
    const schema = yup.object().shape({
        paidAmount: yup.number().required("Customer name is required"),
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
        isInvoice && (
            <form onSubmit={handleSubmit(checkOutHandler)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Grid item align="center">
                        <Typography variant="h5">
                            Total Amount: ${totalAmount}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <InputField
                            control={control}
                            errors={errors}
                            name="paidAmount"
                            defaultValue=""
                            label="Paid Amount"
                            register={register}
                            error={errors.hasOwnProperty("paidAmount")}
                            helperText={errors.paidAmount?.message}
                            variant=""
                        />
                    </Grid>
                    <Grid item align="center">
                        <Button type="submit">Checkout</Button>
                    </Grid>
                </Grid>
            </form>
        )
    );
}
/*  <TableRow
                        style={{ background: "#EDE6D9" }}
                        setOrderedProducts={setOrderedProducts}
                    ></TableRow> */
