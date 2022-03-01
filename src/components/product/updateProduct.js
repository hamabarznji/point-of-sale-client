import * as React from "react";
import ProdcutService from "../../services/productService";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function UpdateProduct({ product, getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Code is required"),
        name: yup.string().required("Name is required"),
        supplier_id: yup.number().required("Supplier is required"),
        category_id: yup.number().required("Category is required"),
        price: yup.string().required("Price is required"),
        qty: yup.number(),
        size: yup.number(),
        color: yup.string(),
        weight: yup.number(),
        date: yup.date().required("Date is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const editProductHandler = async (data) => {
        try {
            await ProdcutService.updateProduct(data, data.id);

            enqueueSnackbar("Product updated successfully", {
                variant: "success",
            });
            getAll();
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
                title="Update Product"
                handleSubmit={handleSubmit(editProductHandler)}
                buttonTitle="Update"
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
                />
                <InputField
                    name="supplier_id"
                    label="Supplier"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.supplier_id}
                    error={errors.hasOwnProperty("supplier_id")}
                    helperText={errors.supplier_id?.message}
                    select
                    items={items[1]}
                />
                <InputField
                    name="category_id"
                    label="Category"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.category_id}
                    error={errors.hasOwnProperty("category_id")}
                    helperText={errors.category_id?.message}
                    select
                    items={items[0]}
                />
                <InputField
                    name="price"
                    label="Price"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.price}
                    error={errors.hasOwnProperty("price")}
                    helperText={errors.price?.message}
                />
                <InputField
                    name="qty"
                    label="Quantity"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.qty}
                    error={errors.hasOwnProperty("qty")}
                    helperText={errors.qty?.message}
                />
                <InputField
                    name="size"
                    label="Size"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.size}
                    error={errors.hasOwnProperty("size")}
                    helperText={errors.size?.message}
                />
                <InputField
                    name="color"
                    label="Color"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.color}
                    error={errors.hasOwnProperty("color")}
                    helperText={errors.color?.message}
                />
                <InputField
                    name="weight"
                    label="Weight"
                    control={control}
                    register={register}
                    errors={errors}
                    defaultValue={product.weight}
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
                    defaultValue={product.date}
                    error={errors.hasOwnProperty("date")}
                    helperText={errors.date?.message}
                />
            </FormDialog>
        </>
    );
}
