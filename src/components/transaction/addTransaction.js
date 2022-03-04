import * as React from "react";
import TransactionService from "../../services/transactionService";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";
import moment from "moment";

export default function AddProduct({ getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        store_id: yup.number().required("Store name is required"),
        product_id: yup.number().required("Product name is required"),
        qty: yup.string().required("Quantity is required"),
        weight: yup.number().required("Weight is required"),
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

    const transfareProductHandler = async (data) => {
        try {
            await TransactionService.addTransaction(data);
            //getAll();
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
            buttonTitle="Product Transaction"
            title="Product Transaction"
            handleSubmit={handleSubmit(transfareProductHandler)}
        >
            <InputField
                name="store_id"
                label="Store Name"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("store_id")}
                helperText={errors.store_id?.message}
                select
                items={items[0]}
            />
            <InputField
                name="product_id"
                label="Product Name"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("product_id")}
                helperText={errors.product_id?.message}
                select
                items={items[1]}
            />
            <InputField
                name="weight"
                label="Weight"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("weight")}
                helperText={errors.weight?.message}
            />

            <InputField
                name="qty"
                label="Quantity"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("qty")}
                helperText={errors.qty?.message}
            />
            <InputField
                name="date"
                label="Date"
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("date")}
                helperText={errors.date?.message}
                //defaultValue={moment()}
            />
        </FormDialog>
    );
}
