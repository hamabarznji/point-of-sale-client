import * as React from "react";
import ProdcutService from "../../services/ProductService";
import FormDialog from "../FormDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";
import moment from "moment";
const colors = [
    { id: "White", name: "White" },
    { id: "Black", name: "Black" },
    { id: "Cremy", name: "Cremy" },
];
export default function AddProduct({ getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Code is required"),
        name: yup.string().required("Name is required"),
        supplier_id: yup.number().required("Supplier is required"),
        category_id: yup.number().required("Category is required"),
        price: yup.string().required("Price is required"),
        qty: yup.number(),
        color: yup.string(),
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
            await ProdcutService.addProduct(data);
            getAll();
            reset();
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
            buttonTitle="Add New Product"
            title="Add New Product"
            handleSubmit={handleSubmit(addProductHandler)}
            variant="contained"
        >
            <InputField
                name="id"
                label="Code"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("id")}
                helperText={errors.id?.message}
            />
            <InputField
                name="name"
                label="Name"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("name")}
                helperText={errors.name?.message}
            />
            <InputField
                name="supplier_id"
                label="Supplier"
                control={control}
                register={register}
                errors={errors}
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
                error={errors.hasOwnProperty("price")}
                helperText={errors.price?.message}
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
                name="color"
                label="Color"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("color")}
                helperText={errors.color?.message}
                select
                items={colors}
            />
            <InputField
                name="date"
                label="Date"
                defaultValue={moment().format("YYYY-MM-DD")}
                control={control}
                register={register}
                errors={errors}
                type="date"
                error={errors.hasOwnProperty("date")}
                helperText={errors.date?.message}
            />
        </FormDialog>
    );
}
