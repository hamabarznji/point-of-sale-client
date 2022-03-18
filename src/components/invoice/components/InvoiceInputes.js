import { Button, TableCell, TableRow } from "@mui/material";
import InputField from "../../InputField";
import * as React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
}) {
    return (
        <>
            {" "}
            <TableRow>
                <TableCell align="center">
                    <InputField
                        fullWidth
                        control={control}
                        errors={errors}
                        name="product"
                        defaultValue=""
                        variant="outlined"
                        label="Product Name"
                        register={register}
                        error={errors.hasOwnProperty("product")}
                        helperText={errors.product?.message}
                    />
                </TableCell>{" "}
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
                    />
                </TableCell>{" "}
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
                    />
                </TableCell>{" "}
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
                    />
                </TableCell>{" "}
                <TableCell align="center">
                    <InputField
                        control={control}
                        errors={errors}
                        name="color"
                        defaultValue=""
                        variant="outlined"
                        label="Color"
                        register={register}
                        error={errors.hasOwnProperty("color")}
                        helperText={errors.color?.message}
                        select
                        items={[
                            { id: "Black", name: "Black" },
                            { id: "White", name: "White" },
                            { id: "Creamy", name: "Cremy" },
                        ]}
                        fullWidth
                    />
                </TableCell>{" "}
                <TableCell align="center">
                    {<Button type="submit">Add</Button>}
                </TableCell>
            </TableRow>
        </>
    );
}
