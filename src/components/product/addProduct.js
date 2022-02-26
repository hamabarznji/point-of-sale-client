import * as React from "react";
import ProdcutService from "../../services/product";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";

export default function AddProduct({ getAll }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Code is required"),
        name: yup.string().required("Name is required"),
        supplier_id: yup.number().required("Supplier id is required"),
        category_id: yup.number().required("Category id is required"),
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

    const addProductHandler = async (data) => {
        try {
            await ProdcutService.addProduct(data);
            getAll();
            enqueueSnackbar("Product added successfully", {
                variant: "success",
            });
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Product is not added! something went wrong.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Product"
            title="Add Product"
            handleSubmit={handleSubmit(addProductHandler)}
        >
            <InputField
                name="id"
                label="Code"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="name"
                label="Name"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="supplier_id"
                label="Supplier id"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="category_id"
                label="Category id"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="price"
                label="Price"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="qty"
                label="Quantity"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="size"
                label="Size"
                control={control}
                register={register}
                errors={errors}
                defaultValue={0}
            />
            <InputField
                name="color"
                label="Color"
                control={control}
                register={register}
                errors={errors}
            />
            <InputField
                name="weight"
                label="Weight"
                control={control}
                register={register}
                errors={errors}
                defaultValue={0}
            />
            <InputField
                name="date"
                label="Date"
                control={control}
                register={register}
                errors={errors}
                type="date"
            />
        </FormDialog>
    );
}
