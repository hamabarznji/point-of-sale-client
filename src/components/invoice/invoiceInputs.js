import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TableCell, TableRow } from "@mui/material";
import { useForm } from "react-hook-form";
import InputField from "../inputField";
import * as yup from "yup";

export default function InvoiceInputs() {
    const schema = yup.object().shape({
        product: yup.string().required("Product name is required"),
        color: yup.string().required("Color  is required"),
        price: yup.number().required("Price is required"),
        weight: yup.number().required("Weight is required"),
        qty: yup.number().required("Quantity id is required"),
        size: yup.number().required("Size id is required"),
    });
    const {
        register,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <>
            {" "}
            <TableRow>
                <TableCell align="center">
                    <InputField
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
                    />
                </TableCell>{" "}
                <TableCell align="center">
                    <InputField
                        control={control}
                        errors={errors}
                        name="size"
                        defaultValue=""
                        variant="outlined"
                        label="Size"
                        register={register}
                        error={errors.hasOwnProperty("size")}
                        helperText={errors.size?.message}
                    />
                </TableCell>
                <TableCell align="center">
                    {<Button type="submit">Add</Button>}
                </TableCell>
            </TableRow>
        </>
    );
}
