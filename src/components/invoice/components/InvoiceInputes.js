import { Button, TableCell, TableRow } from "@mui/material";
import InputField from "../../InputField";
import * as React from "react";

export default function Inputs({
    register,
    control,
    errors,
    color,
    product,
    price,
    weight,
    qty,
    transfareedProducts,
    items,
}) {
    return (
        <>
            <TableRow>
                <TableCell align="center">
                    <InputField
                        fullWidth
                        control={control}
                        errors={errors}
                        name="transfareedProductId"
                        defaultValue=""
                        variant="outlined"
                        label="Product Name"
                        register={register}
                        error={errors.hasOwnProperty("transfareedProductId")}
                        helperText={errors.product?.message}
                        select
                        items={items}
                    />
                </TableCell>
                <TableCell align="center">
                    <InputField
                        control={control}
                        errors={errors}
                        name="price"
                        defaultValue=""
                        variant="outlined"
                        label="Price"
                        register={register}
                        error={errors.hasOwnProperty("price")}
                        helperText={errors.price?.message}
                        width={90}
                    />
                </TableCell>
                <TableCell align="center">
                    <InputField
                        control={control}
                        errors={errors}
                        name="weight"
                        defaultValue=""
                        variant="outlined"
                        label="Weight"
                        register={register}
                        error={errors.hasOwnProperty("weight")}
                        helperText={errors.weight?.message}
                        width={95}
                    />
                </TableCell>
                <TableCell align="center">
                    <InputField
                        control={control}
                        errors={errors}
                        name="qty"
                        defaultValue=""
                        variant="outlined"
                        label="Quantity"
                        register={register}
                        error={errors.hasOwnProperty("qty")}
                        helperText={errors.qty?.message}
                        width={95}
                    />
                </TableCell>

                <TableCell align="center">
                    {<Button type="submit">Add</Button>}
                </TableCell>
            </TableRow>
        </>
    );
}
