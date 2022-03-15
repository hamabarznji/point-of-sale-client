import * as React from "react";
import ProdcutService from "../../services/ProductService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
import moment from "moment";
export default function EditProduct({ product, getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Code is required"),
        name: yup.string().required("Name is required"),
        price: yup.string().required("Price is required"),
        qty: yup.number(),
        weight: yup.number(),
        date: yup.date().required("Date is required"),
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
    const addProductHandler = async (data) => {
        try {
            await ProdcutService.updateProduct({
                id: data.id,
                price: data.price,
                qty: data.qty,
                weight: data.weight,
                isNew: true,
            });

            enqueueSnackbar("Product updated successfully", {
                variant: "success",
            });
            getAll();
            reset();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Product is not updated! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };

    return (
        <>
            <FormDialog
                title="Add Product"
                handleSubmit={handleSubmit(addProductHandler)}
                buttonTitle="Add"
                color="secondary"
                variant="contained"
            >
                <InputField
                    name="id"
                    label="Code"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.id}
                    error={errors.hasOwnProperty("id")}
                    helperText={errors.id?.message}
                    disabled
                />{" "}
                <InputField
                    name="name"
                    label="Name"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.name}
                    error={errors.hasOwnProperty("name")}
                    helperText={errors.name?.message}
                    disabled
                />
                <InputField
                    name="price"
                    label="Price"
                    control={control}
                    register={register}
                    errors={errors}
                    error={errors.hasOwnProperty("price")}
                    helperText={errors.price?.message}
                />
                <InputField
                    name="qty"
                    label="Quantity"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={0}
                    error={errors.hasOwnProperty("qty")}
                    helperText={errors.qty?.message}
                />
                <InputField
                    name="weight"
                    label="Weight"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={0}
                    error={errors.hasOwnProperty("weight")}
                    helperText={errors.weight?.message}
                />
                <InputField
                    name="date"
                    label="Date"
                    control={control}
                    register={register}
                    errors={errors}
                    type="date"
                    defaultValue={moment(product.date).format("YYYY-MM-DD")}
                    error={errors.hasOwnProperty("date")}
                    helperText={errors.date?.message}
                />
            </FormDialog>
        </>
    );
}
