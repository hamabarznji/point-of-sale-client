import * as React from "react";
import TransactionService from "../../services/transactionService";
import FormDialog from "../formDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../inputField";
import { useSnackbar } from "notistack";
import moment from "moment";

export default function UpdateTransaction({ getAll, items, transaction }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        id: yup.number().required("Id is required"),

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

    const transactionHandler = async (data) => {
        try {
            await TransactionService.updateTransaction(data);
            getAll();
            enqueueSnackbar("Transaction updated successfully", {
                variant: "success",
            });
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar(
                "Transaction is not updated! something went wrong.",
                {
                    variant: "error",
                }
            );

            return Promise.reject("Error", err);
        }
    };

    return (
        <FormDialog
            buttonTitle="Update"
            title="Update Transaction"
            handleSubmit={handleSubmit(transactionHandler)}
        >
            <InputField
                name="id"
                label="Id"
                defaultValue={transaction.id}
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("id")}
                helperText={errors.id?.message}
                disabled
            />{" "}
            <InputField
                name="store_id"
                label="Store Name"
                defaultValue={transaction.store_id}
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
                defaultValue={transaction.product_id}
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
                defaultValue={transaction.weight}
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
                defaultValue={transaction.qty}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("qty")}
                helperText={errors.qty?.message}
            />
            <InputField
                name="date"
                label="Date"
                defaultValue={moment(transaction.date).format("YYYY-MM-DD")}
                control={control}
                register={register}
                errors={errors}
                error={errors.hasOwnProperty("date")}
                helperText={errors.date?.message}
            />
        </FormDialog>
    );
}
