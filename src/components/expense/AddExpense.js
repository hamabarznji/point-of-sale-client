import * as React from "react";
import ExpenseService from "../../services/ExpenseService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDialog from "../FormDialog";
import * as yup from "yup";
import InputField from "../InputField";
import { useSnackbar } from "notistack";

export default function AddEmployee({ getAll, items }) {
    const { enqueueSnackbar } = useSnackbar();

    const schema = yup.object().shape({
        description: yup.string().required("Description is required"),
        amount: yup.number().required("Amount id is required"),
        date: yup.date().required("Date id is required"),
    });
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const addExpenseHandler = async (data) => {
        try {
            await ExpenseService.addExpense({
                store_id: localStorage.getItem("storeId"),
                description: data.description,
                amount: data.amount,
                date: data.date,
            });
            enqueueSnackbar("Expense added successfully.", {
                variant: "success",
            });
            getAll();
            return Promise.resolve("Done");
        } catch (err) {
            enqueueSnackbar("Could not add expense! Please try again.", {
                variant: "error",
            });

            return Promise.reject("Error", err);
        }
    };
    return (
        <FormDialog
            buttonTitle="Add Expense"
            title="Add Expense"
            handleSubmit={handleSubmit(addExpenseHandler)}
            variant="contained"
        >
            <InputField
                control={control}
                errors={errors}
                name="description"
                defaultValue=""
                variant="standard"
                label="Description"
                register={register}
                error={errors.hasOwnProperty("description")}
                helperText={errors.description?.message}
            />
            <InputField
                control={control}
                errors={errors}
                name="amount"
                defaultValue=""
                variant="standard"
                label="Amount"
                register={register}
                error={errors.hasOwnProperty("amount")}
                helperText={errors.amount?.message}
            />
            <InputField
                control={control}
                errors={errors}
                name="date"
                defaultValue=""
                variant="standard"
                label="Date"
                register={register}
                error={errors.hasOwnProperty("date")}
                helperText={errors.date?.message}
            />
        </FormDialog>
    );
}
